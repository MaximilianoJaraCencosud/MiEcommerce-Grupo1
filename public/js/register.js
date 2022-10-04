localStorage.clear();
window.addEventListener("load", () => {
  let button = document.querySelector(".button");
  let inputs = document.querySelectorAll(".inputs-generic");
  let validate = [];
  let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  let regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  let passwordValidate = "";

  button.disabled = true;

  inputs.forEach((inp) => {
    inp.addEventListener("blur", validarFormulario);
    inp.addEventListener("keyup", validarFormulario);
  });

  async function validarFormulario(e) {
    switch (e.target.name) {
      case "Nombre":
        if (e.target.value.length < 2) {
          document
            .querySelector(".access__card__form .text-error:nth-child(2)")
            .classList.add("text-error-activo");
          if (validate.includes(1)) {
            let findIndex = validate.findIndex((f) => f === 1);
            validate.splice(findIndex, findIndex + 1);
          }
        } else {
          document
            .querySelector(".access__card__form .text-error:nth-child(2)")
            .classList.remove("text-error-activo");
          validate.push(1);
        }
        break;
      case "Apellido":
        if (e.target.value.length < 2) {
          document
            .querySelector(".access__card__form .text-error:nth-child(4)")
            .classList.add("text-error-activo");
          if (validate.includes(2)) {
            let findIndex = validate.findIndex((f) => f === 2);
            validate.splice(findIndex, findIndex + 1);
          }
        } else {
          document
            .querySelector(".access__card__form .text-error:nth-child(4)")
            .classList.remove("text-error-activo");
          validate.push(2);
        }
        break;
      case "Correo":
        let emaiList = await listEmails();
        if (!regexEmail.test(e.target.value)) {
          document
            .querySelector(".access__card__form .text-error:nth-child(6)")
            .classList.add("text-error-activo");
          if (validate.includes(3)) {
            let findIndex = validate.findIndex((f) => f === 3);
            validate.splice(findIndex, findIndex + 1);
          }
        } else if (emaiList.includes(e.target.value)) {
          document.querySelector(
            ".access__card__form .text-error:nth-child(6)"
          ).innerText = "El email ya esta registrado";
          document
            .querySelector(".access__card__form .text-error:nth-child(6)")
            .classList.add("text-error-activo");
        } else {
          document
            .querySelector(".access__card__form .text-error:nth-child(6)")
            .classList.remove("text-error-activo");
          validate.push(3);
        }
        break;
      case "Password":
        passwordValidate = e.target.value;

        if (
          !regexPassword.test(e.target.value) ||
          passwordValidate.toLowerCase().includes("password")
        ) {
          document
            .querySelector(".access__card__form .text-error:nth-child(8)")
            .classList.add("text-error-activo");
          if (validate.includes(4)) {
            let findIndex = validate.findIndex((f) => f === 4);
            validate.splice(findIndex, findIndex + 1);
          }
        } else {
          document
            .querySelector(".access__card__form .text-error:nth-child(8)")
            .classList.remove("text-error-activo");
          validate.push(4);
        }
        break;
      case "RepitePassword":
        if (e.target.value !== passwordValidate) {
          document
            .querySelector(".access__card__form .text-error:nth-child(10)")
            .classList.add("text-error-activo");
          if (validate.includes(5)) {
            let findIndex = validate.findIndex((f) => f === 5);
            validate.splice(findIndex, findIndex + 1);
          }
        } else {
          document
            .querySelector(".access__card__form .text-error:nth-child(10)")
            .classList.remove("text-error-activo");
          validate.push(5);
        }
        break;
    }
    if (
      validate.includes(5) &&
      validate.includes(4) &&
      validate.includes(3) &&
      validate.includes(2) &&
      validate.includes(1)
    ) {
      button.disabled = false;
      let form = document.querySelector('.access__card__form')
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = document.querySelectorAll('input');
        let firstname = input[0].value.trimStart().trimEnd();
        let lastname = input[1].value.trimStart().trimEnd();
        let email = input[2].value.trimStart().trimEnd();
        let password = input[3].value;
        POSTFunction(firstname, lastname, email, password)
      })
    }
  }
});

async function listEmails() {
  let url = "http://localhost:5000/api/user";
  let list = [];

  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((element) => {
      list.push(element.email);
    });
  } catch (error) {
    
  } finally {
    return list;
  }
}

function POSTFunction(firstname,lastname,email,password){
    let data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    }
    fetch("http://localhost:5000/api/user", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((result) => result.json()).then(res => {
        return location.href = "/login"
    })//.catch(err => console.log(err))
  
}
