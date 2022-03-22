const db = require("../database/models")
const Image = db.Image;
const controllerImage = {
    file: (id, images)=>{
        Image.create({
            image: images,
            id_products: id
        })
    },
    list:(id)=>{
        Image.findOne({where: {id_products:id}})
        .then(e =>{  return e.dataValues.image })
    }
}
module.exports = controllerImage;