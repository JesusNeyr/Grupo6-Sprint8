const db = require("../database/models");
const Category = db.Cat;
const Product = db.Product;
const controllerCategory = {
    list: (req,res)=>{
        Category.findAll()
        .then(result=>{
            res.render("admin/product/categoryList.ejs",{result})
        })
    },
    onlyCategory: (req,res)=>{
        let response;
        let categoryConsult = Category.findAll();
        let productConsult = Product.findAll({where:{cat_id:req.params.id},include:['images']})

        Promise.all([productConsult,categoryConsult])
        .then(([result,category]) => {
            if(result.length != 0){ response = true }else{ response = false }
            res.render("pages/categoryOnly.ejs", {db:result,category,response})
        })
    },
    edit: (req,res)=>{
        Category.findByPk(req.params.id)
        .then(category=>{
            res.render("admin/product/categoryEdit.ejs",{category})
        })
    },
    editProcess: (req,res)=>{
        Category.update({
            name: req.body.name
        },{
            where: {id: req.params.id}
        })
        .then(result=> res.redirect('/category'));
    },
    add: (req,res)=>{
        res.render("admin/product/categoryAdd.ejs")
    },
    addProcess:(req,res)=>{
        Category.create({
            name: req.body.name
        })
        .then(result => res.redirect('/category'))
    }
}

module.exports = controllerCategory