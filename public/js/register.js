
window.addEventListener("load", () => {
  let button = document.querySelector(".button");
  let inputs = document.querySelectorAll(".inputs-generic");
  let errors = [];
  button.disabled = true;
  let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;


  inputs.forEach(inp => {
    inp.addEventListener('change', () => {

        if((inp.getAttribute("nombre") === "Nombre" || inp.getAttribute("nombre") === "Apellido") && inp.value.length < 2){
           errors.push(`El campo ${inp.getAttribute("nombre")} debe contener al menos 2 caracteres`);
           button.disabled = true;
        }else{
            button.disabled = true; 
        }
        if(inp.getAttribute("nombre") === "password" && !regexPassword.test(inp.value)){
           
            errors.push(`La ${inp.getAttribute("nombre")} debe contener minimo ocho caracteres, al menos una letra mayúscula, una minuscula, un número y un carácter especial`);
            console.log(errors);
            button.disabled = true;
        }
        else{
            button.disabled = true; 
        }
        if(inp.getAttribute("nombre") === "Correo" && !regexEmail.test(inp.value)){
           
            errors.push(`El ${inp.getAttribute("nombre")} debe mantener el formato estandar Ej: prueba@example.com`);
            console.log(errors);
            button.disabled = true;  
        }
        else{
            button.disabled = true; 
        } 
    })
  })

  
  
  

});
