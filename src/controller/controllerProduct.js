const path = require("path")
const fs=require('fs');
const db = require("../database/models");
const controllerImage = require("./controllerImage");
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//LLAMAMOS A LOS MODELOS
const Product = db.Product;
const Cat = db.Cat;
const Size = db.Size;
const Discount = db.Discount;
const Image = db.Image;
const Visited = db.Visited;


const controllerProduct={
    productos:(req, res) =>{
        let consultCategory = Cat.findAll()
        let consultProduct = Product.findAll({
            order: [['createdAt','DESC']],
            include: ["images","discounts"],
            where: {visibility:1}
        })
        Promise.all([consultProduct,consultCategory])
        .then(([products,category]) =>{
            res.render('pages/productos.ejs',{db:products,category})
        })
    },
    create:(req,res)=>{
        let discountConsult = Discount.findAll();
        let categoryConsult = Cat.findAll();
        let sizeConsult = Size.findAll();
        Promise.all([discountConsult,categoryConsult,sizeConsult])
        .then(([discount,category,size])=>{
            res.render('admin/product/addProduct.ejs',{discount,category,size})
        })
    },

    crearAccion: async(req,res)=>{
        let body = req.body;
        let productCreate = await Product.create({
            name: req.body.name,
            price_inv: req.body.price_inv,
            price_who: req.body.price_who,
            stock: req.body.stock,
            stock_min: req.body.stock_min,
            stock_max: req.body.stock_max,
            cat_id: req.body.category,
            size_id: req.body.size,
            discount_id: req.body.discount,
            description: req.body.description,
            visibility: req.body.visibility
        })
        await Image.create({
            image: req.file.filename,
            id_products: productCreate.id
        })
        res.redirect('/products');
    },
    edit:(req,res)=>{
        let productConsult = Product.findByPk(req.params.id);
        let sizeConsult = Size.findAll();
        let categoryConsult = Cat.findAll();
        let discountConsult = Discount.findAll();
        let imageConsult = Image.findOne({where:{id_products:req.params.id}});

        Promise.all([productConsult,sizeConsult,categoryConsult,discountConsult,imageConsult])
         .then(([product,size,category,discount,image])=>{
             res.render('admin/product/editProduct.ejs',({productoEncontrado:product, size,category,discount,image,selected:"selected"}));
         })
    },
    update: async(req,res)=>{
        let id = req.params.id;
        let imageUpdate = await Image.findOne({where:{id_products:id}})
        let productUpdate = await Product.update({
            name: req.body.name,
            price_inv: req.body.price_inv,
            price_who: req.body.price_who,
            stock: req.body.stock,
            stock_min: req.body.stock_min,
            stock_max: req.body.stock_max,
            cat_id: req.body.category,
            size_id: req.body.size,
            discount_id: req.body.discount,
            description: req.body.description,
            visibility: req.body.visibility
        },{
            where: {id: id}
        });
        if(req.file && req.file.filename !== undefined){
            if(imageUpdate.image == "default.jpg"){
                await Image.update({
                    image: req.file.filename
                },{where: {id_products: req.params.id}})
            }else{
                await Image.update({
                    image: req.file.filename
                },{where: {id_products: req.params.id}})
                //solo funciona en local
                //fs.unlinkSync(path.resolve(__dirname,`../../public/img/products/${imageUpdate.image}`))                
            }
        }
        res.redirect(`/products/detail/${req.params.id}`)
    },
    productDelete:(req,res)=>{
        let imgArchive = Image.findOne({where:{id_products:req.params.id}})
        let imageDelete = Image.destroy({where:{ id_products: req.params.id}});
        let productDelete = Product.destroy({where:{ id: req.params.id}});
        Promise.all([imgArchive,productDelete,imageDelete])
        .then(([archive,product,image])=>{
            //borrado de archivo, solo funciona en local
            // fs.unlinkSync(path.resolve(__dirname,`../../public/img/products/${archive.image}`))
            res.redirect('/products')
        })
    },
    productDetail: async(req, res) =>{
        let visitedConsult;
        if(req.session.user){
            visitedConsult = await Visited.findOne({
                where:{
                    product_id: req.params.id,
                    user_id: req.session.user.id
                }
            });
        }else{
            visitedConsult = "visited"
        }
        
        let orderConsult= await db.OrderDetail.findOne({where:{user_add_id:req.session.user.id,product_id:req.params.id}})
        let productConsult = await Product.findByPk(req.params.id,{
            include: ["images","sizes","cats"]
        });
        res.render('pages/productDetail.ejs',{articulo:productConsult,visitedConsult,orderConsult})
    },
    recommended: async(req,res)=>{
        let visited=1;
        let visitasProducto
        let id = req.params.id
        let idUser = req.session.user.id
        let visitedConsult = await Visited.findOne({where:{
            product_id: id
        }})
        if(visitedConsult === null || visitedConsult.user_id !== idUser){
            if(visitedConsult !== null){
                visitasProducto = await Visited.findAll({where:{
                    product_id: id
                }});
                visited += visitasProducto.pop().visited
            }else{
                visited = 1;
            }
            await Visited.create({
                visited: visited,
                product_id: id,
                user_id: idUser
            })
            console.log("entro aunque haya registros");
        }else{
            //hay registros y no se puede crear la recomendacion
            console.log("no creo el registro");
        }
        res.redirect('/products/detail/'+id)
    },
    recommendedDelete: (req,res)=>{
        let id = req.params.id
        let idUser = req.session.user.id
        Visited.destroy({where:{
            product_id: id,
            user_id: idUser
        }})
        .then(resolve=> res.redirect('/products/detail/'+id))
    },
    search:(req,res)=>{
        let search = req.query.search;
        let consultCategory = Cat.findAll()
        let consultProduct = Product.findAll({
            order: [['createdAt','DESC']],
            include: ["images","discounts"],
            where: {
                name: { [Op.like]: `%${search}%` },
                visibility: 1
            }
        })
        Promise.all([consultProduct,consultCategory])
        .then(([products,category]) =>{
            if(products.length !== 0){
                res.render('pages/search.ejs',{db:products,category,response: true});
            }else{
                res.render("pages/search.ejs",{db:products,category,response: false})
            }
        })
    }   
};
module.exports=controllerProduct;