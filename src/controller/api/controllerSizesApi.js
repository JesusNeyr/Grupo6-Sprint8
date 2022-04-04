const path = require('path');
const db = require('../../database/models');
//const sequelize = db.sequelize;
//const { Op } = require("sequelize");

const Size = db.Size;
const controllerApiSizes = {
    index: async(req,res) =>{
        let sizesConsult = await Size.findAll();
        let response ={
            meta:{
                status: 200,
                total: sizesConsult.length,
                url: 'api/sizes',
            },
            count: sizesConsult.length,
            sizes: {
                data: []
            }
        }
        sizesConsult.forEach(size => {
            response.sizes.data.push({
                id: size.id,
                size: size.size
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
        res.json(`El total de tamaños es ${response.meta.total}`)
    }
}

module.exports = controllerApiSizes;