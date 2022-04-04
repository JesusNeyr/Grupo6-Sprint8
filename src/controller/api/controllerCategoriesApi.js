const path = require('path');
const db = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");

const Product = db.Product;
const Cat = db.Cat;
const controllerApiCategories = {
    index: async(req,res) =>{
        let CategoriesConsult = await Cat.findAll();
        let response ={
            meta:{
                status: 200,
                total: CategoriesConsult.length,
                url: 'api/categories',
            },
            count: CategoriesConsult.length,
            categories: {
                data: []
            }
        }
        CategoriesConsult.forEach(category => {
            response.categories.data.push({
                id: category.id,
                name: category.name
            })
        });
        return res.json(response)
    },
    ProductCategory: async(req,res)=>{
        let productConsult = await Product.findAll({
            include:['cats','sizes','discounts',{
                association:'images'
            }],
        });
        let catConsult = await Cat.findAll({include:'products'})

        let response ={
            meta:{
                status: 200,
                total: productConsult.length,
                url: 'api/categories/products'
            },
            count: productConsult.length,
            productsCat: {
                data: []
            }
        }
        catConsult.forEach(productCat =>{
            response.productsCat.data.push({
                category: productCat.name,
                productsCount: productCat.products.length
            })
        })
        return res.json(response)
    },
    count: async(req,res)=>{
        let catConsult = await Cat.findAll();
        let response = {
            meta: {
                status: 200,
                total: catConsult.length,
                url: 'api/categories/count'
            },
            data: {catConsult}
        }
        res.json(`El total de categorias es ${response.meta.total}`)
    }
}

module.exports = controllerApiCategories;