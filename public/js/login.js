window.addEventListener("load", function () {
  let button = document.querySelector(".button");
  let inputs = document.querySelectorAll("input");
  let campoNombre = inputs[0];
  let campoPassword = inputs[1];
  button.disabled = true;
  const regularExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  // const regularExp = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;


  let userName, userPassword;

  campoNombre.addEventListener("keyup", function () {
    if (campoNombre.value.length >= 1 && campoPassword.value.length >= 1) {
      button.disabled = false;

    } else {
      button.disabled = true;
    }
  });

  campoPassword.addEventListener("keyup", function () {
    if (campoNombre.value.length >= 1 && campoPassword.value.length >= 1) {
      button.disabled = false;

    } else {
      button.disabled = true;
    }
  });

  button.addEventListener('click', (e)=>{
    e.preventDefault();


    userName = campoNombre.value;

    // Comprobación si el correo ingresado tiene formato valido
    if(!regularExp.test(userName)) alert('Pusiste un MAIL no valido');

    // Comprobación si existe el correo en la BD
    if(!existMail(userName)) alert('No existe correo registrado');

    userPassword = campoPassword.value;

    let url = 'http://localhost:8000/api/user/login';

    let data = {
      email : userName,
      password : userPassword
    }

    let settings = {
      "method": "POST",
      "headers": {
        'Content-type': 'application/json'
      },
      "body": JSON.stringify(data)
    }

    fetch(url, settings)
      .then((response) =>{
        console.log(response)
        if(response.status != 200) throw Error (response.status)
        return response.json();
      })
      .then((data) =>{
        if(data.id != null){
          const user = {
            id: data.id,
            mail: data.email,
            name: data.name
          }
          localStorage.setItem("user", JSON.stringify(user) );
          localStorage.setItem("isLogged", true );

          getCart(data.id)

          window.location.href = '/';
        }
      })
      .catch((error) =>{
        if(error == 'Error: 405' || 'Error: 400'){
          this.alert('Correo o password incorrectos')
        }
      })
  })


});


function existMail(mail){
  let url = 'http://localhost:8000/api/user';
  let exist = false;

  fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      data.forEach(element => {
        if(element.email == mail) exist= true;
      });
    })
    .catch((error)=>{
      console.log(error)
    });
  
  return exist;
}

function getCart(id){
  let url = 'http://localhost:8000/api/cart/'
  fetch(`${url}${id}`)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((error)=>{
      console.log(error)
    })
}