window.addEventListener("load", function () {
    let miniaturas = document.querySelectorAll('.main-product__miniaturas img')
    let imagenPrincipal = document.querySelector('.imagenPrincipal')
    console.log(miniaturas)
    for (let i = 0; i < miniaturas.length; i++) {
        miniaturas[i].classList.remove('img-selected')
    }
    for (let i = 0; i < miniaturas.length; i++) {
         miniaturas[i].addEventListener ('click', function (e) {
       imagenPrincipal.src = miniaturas[i].src
       this.classList.add('img-selected')
        })
    }
  });