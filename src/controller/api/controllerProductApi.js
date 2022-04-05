const path = require('path');
const db = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");

const Product = db.Product;
const Image = db.Image;

const controllerApiProduct = {
    index: async(req,res) =>{
        let productConsult = await Product.findAll({include:['cats','sizes','discounts',{association: 'images'}]});
        let response ={
            meta:{
                status: 200,
                total: productConsult.length,
                url: 'api/products',
            },
            count: productConsult.length,
            products: {
                data: []
            }
        }
        productConsult.forEach(product => {
            
            response.products.data.push({
                id:product.id,
                name:product.name,
                price_inv:product.price_inv,
                price_who:product.price_who,
                stock:product.stock,
                stock_min:product.stock_min,
                stock_max:product.stock_max,
                category: product.cats.name,
                categoryId: product.cat_id,
                size: product.sizes.size,
                discount: product.discounts.discount,
                description: product.description,
                visibility: product.visibility,
                detail: `api/products/${product.id}/detail`,
                //image: `http://${req.headers.host}/img/products/${product.images[0].image}`
            }) 
            return product
        });
        return res.json(response)
    },
    detail: async(req,res)=>{
        let id = req.params.id
        let productConsult = await Product.findByPk(id,{
            include:['cats','sizes','discounts',{
                association:'images'
            }],
        });
        let response ={
            meta:{
                status: 200,
                url: 'api/products/'+id+'/detail'
            },
            products: {
                data: {
                    id:productConsult.id,
                    name:productConsult.name,
                    price_inv:productConsult.price_inv,
                    price_who:productConsult.price_who,
                    stock:productConsult.stock,
                    stock_min:productConsult.stock_min,
                    stock_max:productConsult.stock_max,
                    category: productConsult.cats.name,
                    categoryId: productConsult.cat_id,
                    size: productConsult.sizes.size,
                    sizeId: productConsult.size_id,
                    discount: productConsult.discounts.discount,
                    discountId: productConsult.discount_id,
                    description: productConsult.description,
                    visibility: productConsult.visibility,
                    imagen: productConsult.images[0].image,
                    detail: `api/products/${productConsult.id}/detail`,
                }
            }
        }
        return res.json(response)
    },
    count: async(req,res)=>{
        let productConsult = await Product.findAll();
        let response = {
            meta: {
                status: 200,
                total: productConsult.length,
                url: 'api/products/count'
            },
            data: {productConsult}
        }
        res.json(`El total de productos es ${response.meta.total}`)
    },
    lastProduct: async(req,res)=>{
        let productConsult = await Product.findAll({include:[{association: 'images'}]});
        let lastProduct = productConsult.pop();
        let response = {
            meta: {
                status: 200,
                total: 1,
                url: 'api/products/lastProduct'
            },
            data: {
                id: lastProduct.id,
                name: lastProduct.name,
                imagen: `http://${req.headers.host}/img/products/${lastProduct.images[0].image}`,
                url: `http://${req.headers.host}/products/detail/${lastProduct.id}/`
            }
        }
        return res.json(response)
    },
    createProduct: async(req,res)=>{
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
            image: "default.jpg",
            id_products: productCreate.id
        })
    },
    updateProduct: async(req,res)=>{
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
    },
    deleteProduct: (req,res)=>{
        db.Visited.destroy({
            where:{
                product_id: req.params.id
            }
        })
        Image.destroy({
            where:{
                id_products: req.params.id
            }
        })
        db.OrderDetail.destroy({
            where: {product_id: req.params.id}
        })
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
    }
}

module.exports = controllerApiProduct;