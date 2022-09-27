window.addEventListener("load", function () {
  let button = document.querySelector(".button");
  let inputs = document.querySelectorAll("input");
  let campoNombre = inputs[0];
  let campoPassword = inputs[1];
  button.disabled = true;

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

        }
      })
      .catch((error) =>{
        if(error == 'Error: 405'){
          this.alert('Correo o password incorrectos')
        }
      })
  })
});
