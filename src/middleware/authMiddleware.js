const res = require("express/lib/response");

const auth = {
    'logged': (req,res,next)=>{
        if(req.session.user != undefined){
            next();
        }else{
            res.redirect("/login");
        }
    },
    'visited':(req,res,next)=>{
        if(req.session.user != undefined){
            res.redirect("/perfil/"+ req.session.user.id);
        }else{
            next();
        }
    },
    'cookie': (req,res,next)=>{
        if(req.session.user == undefined && req.cookie.userEmail != undefined){
            User.findOne({where:{email:req.body.email}})
             .then(user=> {
                req.session.user = user.dataValues;
                req.session.access = user.dataValues.rol_id;
             })
        }
    },
    'admin': (req,res,next)=>{
        if(req.session.user && req.session.user.rol_id===1){
            next();
        }else{
            res.send("no puede acceder")
        }
    },
    'user':(req,res,next)=>{
        if(req.session.user.id == req.params.id){
            next()
        }else{
            res.redirect(`/perfil/${req.session.user.id}/edit`)
        }
    }
}
module.exports = auth;