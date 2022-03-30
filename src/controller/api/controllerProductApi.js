const path = require('path');
const db = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");

const Product = db.Product;
const controllerApiProduct = {
    index: async(req,res) =>{
        let productConsult = await Product.findAll({include:['cats','sizes','discounts']});
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
                size: product.sizes.size,
                discount: product.discounts.discount,
                description: product.description,
                visibility: product.visibility,
                detail: `api/products/${product.id}/detail`,
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
                url: 'api/users/count'
            },
            data: {productConsult}
        }
        res.json(`El total de usuario es ${response.meta.total}`)
    }
}

module.exports = controllerApiProduct;