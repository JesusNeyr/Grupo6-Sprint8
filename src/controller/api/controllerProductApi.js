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
                image: `http://${req.headers.host}/img/products/${product.images[0].image}`
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
                total: productConsult.length,
                url: 'api/products/'+id+'/detail'
            },
            count: productConsult.length,
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
                    size: productConsult.sizes.size,
                    discount: productConsult.discounts.discount,
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
            image: "default.png",
            id_products: productCreate.id
        })
    }
}

module.exports = controllerApiProduct;