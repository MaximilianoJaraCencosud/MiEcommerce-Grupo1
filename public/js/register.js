window.addEventListener("load", () => {
  let button = document.querySelector(".button");
  let inputs = document.querySelectorAll(".inputs-generic");
  let errors = [];
  let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
//   let arrayMesnajes = [
//     "El campo Apellido debe contener al menos 2 caracteres",
//     "El campo Nombre debe contener al menos 2 caracteres",
//     "La Contraseña debe contener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula NO puede tener otros símbolos",
//     "El Correo debe mantener el formato estandar Ej: prueba@example.com",
//   ];

  button.disabled = true;

  inputs.forEach((inp) => {
    inp.addEventListener("blur", (e) => {
      console.log(e.target.name);

      switch (e.target.name) {
        case "Nombre":
          if (inp.value.length < 2) {
            document
              .querySelector(".access__card__form .text-error:nth-child(2)")
              .classList.add("text-error-activo");
              if(errors.includes(1)){
                let findIndex = errors.findIndex(e=> e===1)
                errors.splice(findIndex, findIndex+1)
              }
          } else {
            document
              .querySelector(".access__card__form .text-error:nth-child(2)")
              .classList.remove("text-error-activo");
              errors.push(1);
          }
          break;
        case "Apellido":
          if (inp.value.length < 2) {
            document
              .querySelector(".access__card__form .text-error:nth-child(4)")
              .classList.add("text-error-activo");
              if(errors.includes(2)){
                let findIndex = errors.findIndex(e=> e===2)
                errors.splice(findIndex, findIndex+1)
              }
          } else {
            document
              .querySelector(".access__card__form .text-error:nth-child(4)")
              .classList.remove("text-error-activo");
              errors.push(2);
          }
          break;
        case "Correo":
          if (!regexEmail.test(inp.value)) {
            document
              .querySelector(".access__card__form .text-error:nth-child(6)")
              .classList.add("text-error-activo");
              if(errors.includes(3)){
                let findIndex = errors.findIndex(e=> e===3)
                errors.splice(findIndex, findIndex+1)
              }
          } else {
            document
              .querySelector(".access__card__form .text-error:nth-child(6)")
              .classList.remove("text-error-activo");
              errors.push(3);
          }
          break;
        case "Password":
          if (!regexPassword.test(inp.value)) {
            console.log('Estoy aca');
            document
              .querySelector(".access__card__form .text-error:nth-child(8)")
              .classList.add("text-error-activo");
              if(errors.includes(4)){
                let findIndex = errors.findIndex(e=> e===4)
                errors.splice(findIndex, findIndex+1)
              }
          } else {
            document
              .querySelector(".access__card__form .text-error:nth-child(8)")
              .classList.remove("text-error-activo");
              errors.push(4);
          }
          break;
        case "RepitePassword":
          if (!regexPassword.test(inp.value)) {
            document
              .querySelector(".access__card__form .text-error:nth-child(10)")
              .classList.add("text-error-activo");
              if(errors.includes(5)){
                let findIndex = errors.findIndex(e=> e===5)
                errors.splice(findIndex, findIndex+1)
              }
          } else {
            document
              .querySelector(".access__card__form .text-error:nth-child(10)")
              .classList.remove("text-error-activo");
              errors.push(5);
          }
          break;
      }
console.log(errors)
      if(errors.length===5){
        button.disabled=false;
      }
    });
  });
});

