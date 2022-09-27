window.addEventListener("load", async function () {
  let modal = document.querySelector(".modal__entero");
  modal.classList.add("hidden");
  let modalButtons = this.document.querySelectorAll(".modal__botones button");

  modalButtons[0].addEventListener("click", () => {
    window.location.href = "/";
  });

  modalButtons[1].addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  let emailsList = await listEmails();
  let errors = [];

  const loginForm = document.forms.loginForm;
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
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    errors = [];

    userName = campoNombre.value;

    // Comprobación si el correo ingresado tiene formato valido
    if (regularExp.test(userName)) {
      // Comprueba si el mail se encuentra registrado en la BD
      !emailsList.includes(userName)
        ? errors.push("El email no se encuentra registrado")
        : "";
    } else {
      errors.push("El email ingresado no tiene un formato valido");
    }

    userPassword = campoPassword.value;

    if (!errors.length) {
      let url = "http://localhost:8000/api/user/login";

      let data = {
        email: userName,
        password: userPassword,
      };

      let settings = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const resp = await fetch(url, settings);
        const dat = await resp.json();

        if (resp.status != 200) throw Error(resp.status);

        if (dat.id != null) {
          const user = {
            id: dat.id,
            mail: dat.email,
            name: dat.name,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isLogged", true);

          getCart(dat.id);

          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
        if (error == "Error: 405" || "Error: 400") {
          errors.push("Email o contraseña no validos");
          console.log(error);
        }
      }
    }

    let modalTitle = document.querySelector(".modal__titulo");
    let modalErrors = document.querySelector(".modal__mensaje");
    modalTitle.innerHTML = "Error al iniciar sesión";

    modalErrors.innerHTML = "";

    errors.forEach((err) => {
      modalErrors.innerHTML += `<p>${err}</p>`;
    });

    modal.classList.remove("hidden");
    modal.classList.add("animated");
  });
});

async function listEmails() {
  let url = "http://localhost:8000/api/user";
  let list = [];

  try {
    const response = await fetch(url);
    const data = await response.json();
    data.forEach((element) => {
      list.push(element.email);
    });
  } catch (error) {
    console.log(error);
  } finally {
    return list;
  }
}

function getCart(id) {
  let url = "http://localhost:8000/api/cart/";
  fetch(`${url}${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("quantity-articles-cart", data.length);
    })

    .catch((error) => {
      console.log(error);
    });
}
