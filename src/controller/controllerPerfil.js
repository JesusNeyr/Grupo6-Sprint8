const path = require("path");
const fs = require("fs")
let db = require("../database/models");
const sequelize = db.sequelize;
const {Op} = require("sequelize");
const { compareSync, hashSync }= require('bcryptjs');
//llamamos los modelos
const User = db.User
const Address = db.Address;
const Avatar = db.Avatar;
const controllerPerfil={
    detail:(req,res)=>{
        User.findByPk(req.params.id, {include:["avatars"]})
        .then((user)=>{
             console.log(user);
             if(user !== null){
                 res.render('user/profile.ejs',{title: "Perfil",userData:user.dataValues})
             }else{
                 res.redirect('/');
             }
         })
    },
    edit: (req,res)=>{
        let userConsult = User.findByPk(req.params.id,{include:['avatars']});
        let addressConsult = Address.findOne({where:{user_id:req.params.id}});
        Promise.all([userConsult,addressConsult])
        .then(([user,address])=>{
            res.render("user/profileEdit.ejs",{user,address})
        })
    },
    addressProcess: (req,res)=>{
        Address.update({
            province: req.body.province,
            city: req.body.city,
            street: req.body.street,
            number: req.body.number,
            cp: req.body.cp,
            phone: req.body.phone,
            floor: req.body.floor,
            user_id: req.params.id,
        },{where:{user_id:req.params.id}})
         .then(result => res.redirect(`/perfil/${req.params.id}`))
         .catch(e=>console.log(e))
    },
    userInfoProcess: async (req,res)=>{
        let userConsult = await User.findByPk(req.params.id).then(response=>response);
        let avatarOld = userConsult.avatar_id;
        let avatarConsult = await Avatar.findByPk(avatarOld).then(response=>response);
        if(req.file !== undefined){
            let newAvatar = await Avatar.create({
                avatar: req.file.filename
            }).then(response=>response)
            let userUpdate = await User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                pass: hashSync(req.body.pass,10),
                avatar_id: newAvatar.id
            },{where:{id:req.params.id}})
            .then(response=>{
                if(avatarOld != 1){
                    Avatar.destroy({where:{id:avatarOld}}).then(response=>response)
                    //solo funciona en local
                    //fs.unlinkSync(path.resolve(__dirname,`../../public/img/avatars/${avatarConsult.avatar}`))
                }
            });
        }else{
            User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                pass: hashSync(req.body.pass,10),
                avatar_id: avatarOld
            },{where:{id:req.params.id}})
            .then(response =>{
                 res.redirect('/perfil/'+req.params.id);
            })
        }
        if(userConsult.email !== req.body.email){
            res.redirect('/logout')
         }else{
            res.redirect('/perfil/'+req.params.id)
         }
    }
}
module.exports=controllerPerfil; 