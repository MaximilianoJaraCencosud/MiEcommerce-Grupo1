
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
if(this.localStorage.getItem('user') === null){
  console.log();
  let btn = document.querySelector(".button__addCart");
  btn.disabled = true;
}else{
  let btn = document.querySelector(".button__addCart");
  btn.disabled = false;
}
  
  
});

function removeSelected(miniaturas, imagenPrincipal){
  miniaturas.forEach(img => {
    img.classList.remove('img-selected');
  });
}

const addProductToCart = ()=>{

  let txtId = document.getElementById('txtId').value;
  let datos = localStorage.getItem('user');
  let user = JSON.parse(datos);
  let data = {
          userId: parseInt(user.id),
          product: {
          id: parseInt(txtId),
          }
      }
  fetch('http://localhost:8000/api/cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)     
  })
  .then(res => res.json())
  .then(data =>{
      let userInfo = localStorage.getItem('user');
      let user = JSON.parse(userInfo);
      //Este fetch es usado para recargar la cantidad de productos en el carrito
      fetch(`http://localhost:8000/api/cart/${user.id}`)
      .then((res) => res.json())
      .then(data =>{
        localStorage.setItem('quantity-articles-cart', data.length)
        let quantityArticles = document.getElementById('quantity-articles-cart');
        quantityArticles.innerHTML = localStorage.getItem('quantity-articles-cart'); 
        let carritoHeader = document.querySelector('.cart-button');
        carritoHeader.style.animation = 'shake 0.2s linear';

      } )
  });
}

const btnAddTocart = document.getElementById('btnAddToCart');
btnAddTocart.addEventListener('click', addProductToCart);

function animateButton (){
  let cartButton = document.querySelector('.cart-button');
  let quantityArticles = document.querySelector('#quantity-articles-cart');
  
  quantityArticles.innerHTML = parseInt(localStorage.getItem('quantity-articles-cart')); 

  cartButton.classList.add('animation');

  setTimeout(() => {
    cartButton.classList.remove('animation');
  }, "500")
}

