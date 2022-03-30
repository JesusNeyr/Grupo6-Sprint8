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
        let response ={
            meta:{
                status: 200,
                total: productConsult.length,
                url: 'api/categories/products'
            },
            count: productConsult.length,
            products: {
                data: [
                    {
                        category: 1,
                        products: 20
                    },
                    {
                        category: 3,
                        products: 80
                    },
                    {
                        category: 2,
                        products: 15
                    },
                ]
            }
        }
        for(let i =0; i<productConsult.length;i++){
            if(productConsult[i].catId == i){
                console.log(`Categoria id: ${productConsult[i].catId} en ${i}`);
            }
        }
        // productConsult.forEach(product =>{
        //     response.products.data.push({
        //         category: product.cats.name,
        //         // productsCount: product
        //     })
        // })
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

module.exports = controllerApiCategories;