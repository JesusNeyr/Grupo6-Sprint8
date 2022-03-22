const buttonClic = document.querySelector(".menuBurger");
const menuMostrar = document.querySelector(".menuHeader");
const menuMostrar2 = document.querySelector(".menuHeader2");
const cerrarMenu = document.querySelector(".cerrarMenu");

buttonClic.addEventListener("click",()=>{
    menuMostrar.classList.toggle("mostrarMenu");
    menuMostrar2.classList.toggle("mostrarMenu");
    buttonClic.classList.toggle("ocultarMenu")
});
cerrarMenu.addEventListener("click",()=>{
    menuMostrar.classList.remove("mostrarMenu");
    menuMostrar2.classList.remove("mostrarMenu");
    buttonClic.classList.remove("ocultarMenu")
});