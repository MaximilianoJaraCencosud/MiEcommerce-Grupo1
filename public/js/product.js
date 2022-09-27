
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
  
  
  
  
  
const addProductToCart = ()=>{
    let txtId = document.getElementById('txtId').value;
    localStorage.setItem('userId', 1);
    let data = {
            userId: parseInt(localStorage.getItem('userId')),
            product: {
            id: parseInt(txtId),
            }
        }
    fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)     
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

const btnAddTocart = document.getElementById('btnAddToCart');
btnAddTocart.addEventListener('click', addProductToCart);
}

