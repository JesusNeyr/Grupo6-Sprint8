const registerForm=document.querySelector('#registerform');
const inputs=document.querySelectorAll('#registerform input');
//^

const validadores={
    first_name:/^[a-zA-ZÀ-ÿ\s]{2,20}$/,
    last_name:/^[a-zA-ZÀ-ÿ\s]{2,20}$/,
    email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
    pass:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{4,15}$/
}
const campos={
    first_name:false,
    last_name:false,
    email:false,
    pass:false
}

const validarForm=(e)=>{
    
    switch (e.target.name) {
        case 'first_name':
            validarCampo(validadores.first_name,e.target,'first_name');
            console.log('first_name')       
            break;
        case 'last_name':
            validarCampo(validadores.last_name,e.target,'last_name')
            console.log('estas en last_name')
            break;
        case 'email':
            validarCampo(validadores.email,e.target,'email')
            console.log('estas en email')
            break;
        case 'pass':
            validarCampo(validadores.pass,e.target,'pass');
            validarPass1();
            console.log('pass')       
            break;
        case 'pass1':
            validarPass1();
            console.log('pass1')       
            break;
            
        default:
            break;
    }
};
const validarPass1=()=>{
    console.log("contraseñas iguales")
    const inputPass=document.getElementById('contrasenia');
    const inputPass1=document.getElementById('contrasenia1');
    if(inputPass.value!==inputPass1.value){
        document.getElementById(`errors-pass1`).classList.remove('div-error')
        document.getElementById(`errors-pass1`).classList.add('div-error-block')
        campo[pass]=false
    }else{
        document.getElementById(`errors-pass1`).classList.add('div-error')
        document.getElementById(`errors-pass1`).classList.remove('div-error-block')
        campos[pass]=true
    }
};

const validarCampo=(expresiones,input,campo)=>{
    if(expresiones.test(input.value)){
        document.getElementById(`errors-${campo}`).classList.remove('div-error-block')
        document.getElementById(`errors-${campo}`).classList.add('div-error')
        campos[campo]=true
        console.log('todo bien '+campos[campo])
    }else{
        document.getElementById(`errors-${campo}`).classList.remove('div-error')
        document.getElementById(`errors-${campo}`).classList.add('div-error-block')
        console.log('todo mal ' + campos[campo])
        campos[campo]=false
    }
}
inputs.forEach((input)=>{
    input.addEventListener('keyup',validarForm);
    input.addEventListener('blur',validarForm);
})
registerForm.addEventListener('submit',(e)=>{

    if (campos.first_name && campos.last_name && campos.email) {
        alert("todo correcto")
    }else{
        e.preventDefault();
    }
})
console.log("seeeeeeeeeee")
