window.addEventListener("load", async function () {
  let modal = this.document.querySelector('.modal__entero');
  modal.classList.add('hidden');

  let emailsList = await listEmails();
  let errors = [];

  console.log(emailsList)


  let button = document.querySelector(".button");
  let inputs = document.querySelectorAll("input");
  let campoNombre = inputs[0];
  let campoPassword = inputs[1];
  button.disabled = true;
  const regularExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;


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

  // Listener Clik on Button
  button.addEventListener ('click', async (e)=>{
    e.preventDefault();

    userName = campoNombre.value;

    // Comprobación si el correo ingresado tiene formato valido
    if(regularExp.test(userName)){
      // Comprueba si el mail se encuentra registrado en la BD
      (!emailsList.includes(userName)) ? errors.push('El email no se encuentra registrado') : '';
    }else{
      errors.push('El email ingresado no tiene un formato valido');
    } 


    userPassword = campoPassword.value;

    if(!errors){

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
  
            getCart(data.id);
  
            window.location.href = '/';
          }
        })
        .catch((error) =>{
          if(error == 'Error: 405' || 'Error: 400'){
            errors.push('Email o contraseña no validos');
          }
        })        
    }else{
      console.log(errors);
      
      let modalTitle = document.querySelector('.modal__titulo');
      let modalErrors = document.querySelector('.modal__mensaje');
      modalTitle.innerHTML = 'Error al iniciar sesión';
      errors.forEach((err)=>{
        modalErrors.innerHTML += `<p>${err}</p>`
      });

      modal.classList.remove('hidden');
      modal.classList.add('animated');
    }
      
  });

});



async function  listEmails(){
  let url = 'http://localhost:8000/api/user';
  let list = [];

  try {
    const response = await fetch(url)
    const data = await response.json();
      data.forEach(element => {
        list.push(element.email);
      })
    } catch (error) {
      console.log(error)
    }
    finally{
      return list;
  } 
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