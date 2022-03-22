module.exports = async (req,res,next) => {
    let logged = null;
    let access = null;
    let cat = null;
    const db = require("../database/models");
    const User = db.User;
    if(req.session && req.session.user != undefined) {
        logged = req.session.user
        access = req.session.access
        cat = req.session.cat
    }else{
    if(req.session.user == undefined && req.cookies.userEmail != undefined){
        let user = await User.findOne({where:{email:req.cookies.userEmail}})
        req.session.user = user.dataValues;
        req.session.access = user.dataValues.rol_id;
        logged = req.session.user
        access = req.session.access
        let address = await db.Address.findOne({where:{user_id:req.session.user.id}})
        req.session.address = address.dataValues
    }
}
    res.locals.user = logged
    res.locals.access = access
    res.locals.cat = cat
    return next()
}