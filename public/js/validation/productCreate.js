// products validation
const nameProduct = document.querySelector("#nameProduct");
const priceInvProduct = document.querySelector("#priceInvProduct");
const priceWhoProduct = document.querySelector("#priceWhoProduct");
const stockProduct = document.querySelector("#stockProduct");
const stockMinProduct = document.querySelector("#stockMinProduct");
const stockMaxProduct = document.querySelector("#stockMaxProduct");
const categoryProduct = document.querySelector("#categoryProduct");
const sizeProduct = document.querySelector("#sizeProduct");
const discountProduct = document.querySelector("#discountProduct");
const visibilityProduct = document.querySelector("#visibilityProduct");
const descriptionProduct = document.querySelector("#descriptionProduct");
const formAddProduct = document.querySelector(".adminAddProductForm")

const errorsCreateProduct = [];

let eventAddProduct = (input,err,carac,caracErr,divErr)=>{
    let msgError = document.querySelector(divErr)
    input.addEventListener("blur",(e)=>{
        if(input.value == ""){
            input.classList.add("isInvalid");
            input.classList.remove("isValid");
            msgError.classList.add("div-error-block");
            msgError.classList.remove("div-error");
            if(!errorsCreateProduct.includes(err)){
                errorsCreateProduct.push(err);
                msgError.innerHTML+=err
            }
        }else{
            input.classList.add("isValid");
            input.classList.remove("isInvalid");
            msgError.classList.remove("div-error-block");
            msgError.classList.add("div-error");    
            let pos = errorsCreateProduct.indexOf(err);
            errorsCreateProduct.splice(pos,1);
            msgError.innerHTML=""
        }
        if(carac){
            if(input.value.length < carac){
                input.classList.add("isInvalid");
                input.classList.remove("isValid");
                msgError.classList.add("div-error-block");
                msgError.classList.remove("div-error");
                if(!errorsCreateProduct.includes(caracErr)){
                    errorsCreateProduct.push(caracErr)
                    msgError.innerHTML+=`<br>${caracErr}<br>`
                }
            }else{
                input.classList.add("isValid");
                input.classList.remove("isInvalid");
                msgError.classList.remove("div-error-block");
                msgError.classList.add("div-error"); 
                let pos = errorsCreateProduct.indexOf(caracErr);
                errorsCreateProduct.splice(pos,1);
                msgError.innerHTML="";     
            }
        }
    })
}

eventAddProduct(nameProduct,"El titulo es obligatorio",5,"El titulo debe tener al menos 5 caracteres",".errorAddTitle")
eventAddProduct(priceInvProduct,"El precio individual es obligatorio",0,0,".errorAddPriceInv");
eventAddProduct(priceWhoProduct,"El precio mayorista es obligatorio",0,0,".errorAddPriceWho");
eventAddProduct(stockProduct,"El stock es obligatorio",0,0,".errorAddStock");
eventAddProduct(stockMinProduct,"El stock minimo es obligatorio",0,0,".errorAddStockMin");
eventAddProduct(stockMaxProduct,"El stock maximo es obligatorio",0,0,".errorAddStockMax");
eventAddProduct(categoryProduct,"Seleccione una categoría",0,0,".errorAddCategory");
eventAddProduct(sizeProduct,"Seleccione un tamaño",0,0,".errorAddSize");
eventAddProduct(discountProduct,"Seleccione un descuento",0,0,".errorAddDiscount");
eventAddProduct(visibilityProduct,"Seleccione la visibilidad",0,0,".errorAddVisibility");
eventAddProduct(descriptionProduct,"La descripcion es obligatoria",20,"La descripción debe tener al menos 20 caracteres",".errorAddDescription");

formAddProduct.addEventListener("submit",(e)=>{
    if(errorsCreateProduct.length > 0){
        e.preventDefault();
        console.log("No se envia");
    }else{
        console.log("se envio");
    }
})