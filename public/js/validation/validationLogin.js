let emailLogin = document.querySelector(".emailLogin");
let passLogin = document.querySelector(".passLogin");
let divErrVacio = document.querySelector(".divErrVacio");
let divErrEmail = document.querySelector(".divErrEmail");
let divErrVacioPass = document.querySelector(".divErrVacioPass");
let formLogin = document.querySelector(".formLogin")
let erroresLogin = [];
let email= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/;
emailLogin.focus()

emailLogin.addEventListener("blur",()=>{
    let errVacio = "El email no puede estar vacío";
    let errEmailValid = "El email tiene que ser válido";
    if(emailLogin.value == ""){
        emailLogin.classList.add("isInvalid");
        emailLogin.classList.remove("isValid");
        if(!erroresLogin.includes(errVacio)){
            erroresLogin.push(errVacio);
            divErrVacio.innerHTML=errVacio+"<br>"
        }
    }else{
        emailLogin.classList.add("isValid");
        emailLogin.classList.remove("isInvalid");
        let pos = erroresLogin.indexOf(errVacio);
        erroresLogin.splice(pos,1);
        divErrVacio.innerHTML=""
    }
    if(!email.test(emailLogin.value)){
        emailLogin.classList.add("isInvalid");
        emailLogin.classList.remove("isValid");
        if(!erroresLogin.includes(errEmailValid)){
            erroresLogin.push(erroEmailValid);
            divErroEmail.innerHTML=erroEmailValid+"<br>"
        }
    }else{
        emailLogin.classList.add("isValid");
        emailLogin.classList.remove("isInvalid");
        let pos = erroresLogin.indexOf(erroEmailValid);
        erroresLogin.splice(pos,1);
        divErro
        mail.innerHTML=""
    }
    
});
passLogin.addEventListener("blur",()=>{
    let errPassVacio = "La contraseña no puede estar vacía"
    if(passLogin.value == ""){
        passLogin.classList.add("isInvalid");
        passLogin.classList.remove("isValid");
        if(!erroresLogin.includes(errPassVacio)){
            erroresLogin.push(errPassVacio);
            divErrVacioPass.innerHTML=errPassVacio+"<br>"
        }
    }else{
        passLogin.classList.add("isValid");
        passLogin.classList.remove("isInvalid");
        let pos = erroresLogin.indexOf(errPassVacio);
        erroresLogin.splice(pos,1);
        divErrVacioPass.innerHTML=""
    }
    
})
formLogin.addEventListener("submit",(e)=>{
    console.log(erroresLogin);
    if(erroresLogin.length > 0){
        e.preventDefault();
        console.log("No se envia");
    }else{
        console.log("Se envio");
    }
})