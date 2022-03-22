const controllerAdmin={
    index:(req,res)=>{
        res.render('admin/admin.ejs')
    },
    stock:(req,res)=>{
        res.render('admin/product/stockProduct.ejs')
    },
    ListProduct:(req,res)=>{
        res.render('admin/product/listProduct.ejs')
    },
}
module.exports=controllerAdmin;