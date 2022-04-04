const db = require('../../database/models')
const Contact = db.Contact;

const controllerApiContact = {
    index: async(req,res)=>{
        let contactConsult = await Contact.findAll();
        let response = {
            meta:{
                status: 200,
                total: contactConsult.lenght,
                url: 'api/contact'
            },
            message:{
                data: []
            }
        }
        contactConsult.forEach(contact =>{
            response.message.data.push({
                id: contact.id,
                name: contact.name,
                message: contact.message,
                viewed: contact.viewed
            })
        })
        return res.json(response)
    },
    detail: async(req,res)=>{
        let id = req.params.id
        let contactConsult = await Contact.findByPk(id);
        let response = {
            meta:{
                status: 200,
                total: contactConsult.lenght,
                url: 'api/contact/'+id+'/view'
            },
            message:{
                data: {
                    id: contactConsult.id,
                    name: contactConsult.name,
                    email: contactConsult.email,
                    message: contactConsult.message,
                    viewed: contactConsult.viewed
                }
            }
        }
        return res.json(response)
    },
    updateView: async(req,res)=>{
        let id = req.params.id;
        await Contact.update({
            viewed:1
        },{where:{id}})
    },
    updateViewOld: async(req,res)=>{
        let id = req.params.id;
        await Contact.update({
            viewed:0
        },{where:{id}})
    }
}

module.exports = controllerApiContact