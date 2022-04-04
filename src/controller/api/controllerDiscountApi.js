const path = require('path');
const db = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");

const Discount = db.Discount;
const controllerApiDiscount = {
    index: async(req,res) =>{
        let discountsConsult = await Discount.findAll();
        let response ={
            meta:{
                status: 200,
                total: discountsConsult.length,
                url: 'api/discounts',
            },
            count: discountsConsult.length,
            discounts: {
                data: []
            }
        }
        discountsConsult.forEach(discounts => {
            response.discounts.data.push({
                id: discounts.id,
                discounts: discounts.discount
            })
        });
        return res.json(response)
    },
    count: async(req,res)=>{
        let sizeConsult = await Size.findAll();
        let response = {
            meta: {
                status: 200,
                total: sizeConsult.length,
                url: 'api/users/count'
            },
            data: {sizeConsult}
        }
        res.json(`El total de descuentos es ${response.meta.total}`)
    }
}

module.exports = controllerApiDiscount;