window.addEventListener("load", function () {
  let miniaturas = document.querySelectorAll('.main-product__miniaturas img')
  let imagenPrincipal = document.querySelector('.imagenPrincipal')

  
  
  for (let i = 0; i < miniaturas.length; i++) {
    miniaturas[i].addEventListener ('click', function (e) {
      
    removeSelected(miniaturas, imagenPrincipal);

    imagenPrincipal.src = miniaturas[i].src
    this.classList.add('img-selected')
  })
  }
});

function removeSelected(miniaturas, imagenPrincipal){
  miniaturas.forEach(img => {
    img.classList.remove('img-selected');
  });
}