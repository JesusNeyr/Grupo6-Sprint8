const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
//const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const User = db.User;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const controllerApiUser = {
    index: async(req,res) =>{
        let userConsult = await User.findAll({attributes: ['id','first_name','last_name','email','avatar_id']});
        let response ={
            meta:{
                status: 200,
                total: userConsult.length,
                url: 'api/users'
            },
            count: userConsult.length,
            users: {
                data: []
            }
        }
        userConsult.forEach(user => {
            response.users.data.push({
                id:user.id,
                first_name:user.first_name,
                last_name:user.last_name,
                email:user.email,
                avatar_id:user.avatar_id,
                detail: `api/users/${user.id}/detail`
            })
            return user
        });
        return res.json(response)
    },
    detail: async(req,res)=>{
        let id = req.params.id;
        let userConsult = await User.findByPk(id,{include:['avatars'],attributes: ['id','first_name','last_name','email','avatar_id']})
        let response = {
            meta: {
                status: 200,
                total: userConsult.length,
                url: 'api/users/'+userConsult.id+'/detail'
            },
            count: userConsult.length,
            user: {
                data: {
                    id: userConsult.id,
                    first_name: userConsult.first_name,
                    last_name: userConsult.last_name,
                    email: userConsult.email,
                    avatar: `${req.headers.host}/img/avatars/${userConsult.avatars.avatar}`,
                }
            }
        }

        return res.json(response)
    }
    
}

module.exports = controllerApiUser;