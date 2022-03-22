const fs=require('fs');
let db= require("../database/models");

const User = db.User;
const Address = db.Address;
const Product = db.Product;

const controllerCart = {
    carrito:async(req,res) =>{
        let addressConsult = await Address.findOne({where:{id:req.session.address.id}})
        let orderConsult= await db.OrderDetail.findAll({
            where: {user_add_id:addressConsult.dataValues.id},
            include: ['orders',{association:'products',include:['images','discounts']}]
        });
        let promoCodes = await db.UsePromoCode.findAll({
                include: ['promoCodes'],
                where:{
                    id_user:req.session.user.id
                }
            });
        let codeUse;
        promoCodes.length > 0 ? codeUse = 1 : codeUse=0
        res.render('pages/carrito.ejs',{orderConsult,codeUse,promoCodes})
    },
    carritoAdd: async(req,res)=>{
        let id = req.params.id;
        let addressConsult = await db.Address.findOne({where:{user_id:req.session.user.id}})
        let carritoConsult = await db.OrderDetail.findOne({where:{product_id:id,user_add_id:addressConsult.id},include:['orders']})
        if(carritoConsult !== null && carritoConsult.orders.user_id == req.session.user.id){
            res.redirect('/carrito')
        }else{
            let user= req.session.user;
            let productConsult = await Product.findOne({where:{id}});
            let addressConsult = await Address.findOne({where:{user_id:user.id}});
            let total
            if(user.rol_id == 3 || user.rol_id == 1){
                total = productConsult.price_inv;
            }else{
                total = productConsult.price_who;
            }
            let orderNew = await db.Order.create({
                date:null,
                total:total,
                payments_id:1,
                user_id:user.id,
                status_id: 1
            });
            await db.OrderDetail.create({
                quantity:1,
                subtotal: total,
                order_id: orderNew.id,
                product_id: id,
                user_add_id: addressConsult.id
            });
        }
        res.redirect('/carrito')
    },
    carritoDelete: async(req,res)=>{
        let idOrder;
        let addressOrder = await db.Address.findOne({where:{user_id:req.session.user.id}})
        let consultDetail = await db.OrderDetail.findOne({where:{product_id:req.params.id,user_add_id:addressOrder.id}});
        idOrder = consultDetail.order_id
        await db.OrderDetail.destroy({
            where:{
                product_id: req.params.id,
                user_add_id: addressOrder.id
            }
        });
        await db.Order.destroy({
            where:{
                id: idOrder
            }
        })
        res.redirect('/carrito')
    },
    carritoDeleteCode: (req,res)=>{
        db.UsePromoCode.destroy({
            where:{
                id_code:req.params.id,
                id_user:req.session.user.id
            }
        })
        .then(response=> res.redirect('/carrito'))
    },
    carritoCode: async(req,res)=>{
        /*
         * Nota: used -> 0 = no usado | 1 = usado
         */
        let codeConsult = await db.PromoCode.findOne({where:{code:req.body.code}}); //verifico el codigo
        if(codeConsult !== null){
            let userConsult = await db.UsePromoCode.findOne({where:{id_code:codeConsult.id, id_user:req.session.user.id}})
            if(userConsult == null){
                    let createUse = await db.UsePromoCode.create({
                        id_code: codeConsult.id,
                        id_user: req.session.user.id,
                        used: 1
                    })
            }
        }
        res.redirect('/carrito')
    }
}
module.exports = controllerCart