// Como líder del Equipo de Desarrollo, quiero que, cuando un cliente agrega un producto a su carrito, se almacene esta información dentro de la API que nos proporcionó el equipo de backend, para poder tener persistencia de datos entre sesiones.
// Para esto debemos respetar el siguiente formato:
// localStorage.setItem(J)
window.addEventListener('load', async()=>{
    let productsCarrito;
    await  getCart()
    .then(()=>{

        document.querySelectorAll('.cart__product-card__actions').forEach(pc =>{
            pc.addEventListener('click', (e)=>{
                if(e.target.value == "+"){
                    let id = e.target.previousElementSibling.value; //nextElementSibling.value;
                    let quantity = document.getElementById('quantity'+id);
                    let totalPrice = document.getElementById('price'+id);
                    let productPrice = totalPrice.innerHTML /quantity.innerHTML;
                    let cartTotalPrice = document.getElementById('cart-total-price');
                    cartTotalPrice.innerHTML = parseInt(cartTotalPrice.innerText) + productPrice;

                    updateQuantity('+', id, quantity.innerText);
                    quantity.innerHTML = parseInt(quantity.innerText) + 1;

                    totalPrice.innerHTML = quantity.innerHTML * productPrice;
                }else if(e.target.value == "-"){
                    let id = e.target.nextElementSibling.nextElementSibling.value;
                    let quantity = document.getElementById('quantity'+id);
                    let totalPrice = document.getElementById('price'+id);
                    let productPrice = totalPrice.innerHTML /quantity.innerHTML;
                    let cartTotalPrice = document.getElementById('cart-total-price');
                    cartTotalPrice.innerHTML = parseInt(cartTotalPrice.innerText) - productPrice;

                    if(parseInt(quantity.innerText)>=2){
                        updateQuantity('-', id, quantity.innerText);
                        quantity.innerHTML = parseInt(quantity.innerText) - 1;
                        totalPrice.innerHTML = quantity.innerHTML * productPrice;
                    } 
                }else if(e.target.innerText == "Quitar"){
                    let id = e.target.nextElementSibling.value;
                    deleteProduct(id);
                    location.reload();
                }
            })
        });
        


    });
})

//----obtengo carrito del cliente y ejecuto listProducts [acá también se utilizan getProducts y getProductsCart]
const getCart = async() => {
    const products = await  getProducts();
    let data = localStorage.getItem('user');
    let user = JSON.parse(data);
   return fetch(`http://localhost:8000/api/cart/${user.id}`)
    .then((res) => {
      return res.json();
    })
    .then(data =>{
        console.log(data);
        listProducts(getProductsCart(data, products));
    });

  }





const updateQuantity = (param, txtIdProduct, txtQuantity)=>{
    let datos = localStorage.getItem('user');
    let user = JSON.parse(datos);
    let data;
    if(param === "+"){
        data = {
            userId: parseInt(user.id),
            product: {
                id: parseInt(txtIdProduct),
                quantity: parseInt(txtQuantity) +1
            }
        }
    }else if(param ==="-"){
        data = {
            userId: parseInt(user.id),
            product: {
                id: parseInt(txtIdProduct),
                quantity: parseInt(txtQuantity) -1
            }
        }
    }
    fetch('http://localhost:8000/api/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)     
    })
    .then(res => res.json())
    //.then(data => console.log(data));
}

const deleteProduct = (productId)=>{
    let datos = localStorage.getItem('user');
    let user = JSON.parse(datos);
    fetch(`http://localhost:8000/api/cart/${user.id}?productId=${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data));
}


//----------------Obtengo listado total de productos
const getProducts = () => {
    return fetch("http://localhost:8000/api/product").then((res) => {
      return res.json();
    });
  };

//----------------Obtengo listado total de productos de un carrito 
const getProductsCart = (userCart, products) => {
    userCart.forEach((cartP) => {
      cartP.product = products.find((p) => p.id === cartP.id);
    });
    return userCart;
  };

//----------------Dibujo el carrito en el HTML
const listProducts = (products)=>{
        let content;
        let totalPoints = 0;
        let cartHtml = document.getElementById('cart-content');
    if(products!= null && products.length>0){
        
        products.map((p)=>{
            totalPoints+= p.product.price * p.quantity;
            console.log(totalPoints);
            content += `
            <section class="cart__product-list">
                <article class="cart__product-card">
                <div class="cart__product-card__content">
                    <img src="${p.product.images[0]}" class="cart__product-card__img" alt="${p.product.title}" />
                    <h3 class="cart__product-card__title">
                    ${
                        p.product.title
                    }
                    </h3>
                </div>
                <div class="cart__product-card__actions">
                    <!-- <%- include('../partials/button',{text: 'Quitar' }) %> -->
                    <button class="button">Quitar</button>

                    <input type="text" value="${p.id}" hidden>
                    <div class="cart__product-card__action-amount">
                        <button value="-">-</button>
                        <p id="quantity${p.id}">
                        ${p.quantity}
                        </p>
                        <input type="text" id="txtIdProduct${p.id}" value="${p.id}" hidden>
                        <button value="+">+</button>
                        
                    </div>


                    <p class="cart__product-card__price" id="price${p.id}">
                        ${p.product.price * p.quantity}
                    </p>
                </div>
                </article>
            </section>
            `
        })
        content +=`
            <section class="cart__total">
                <p class="cart__total__text">Total de puntos</p>
                <p class="cart__total__price" id="cart-total-price">
                    ${totalPoints}
                </p>
            </section>
        
            <section class="cart__pay">
                <a href="/checkout">
                <!-- <%- include('../partials/button',{text: 'Ir a Pagar' }) %> -->
                <button class="button">Ir a Pagar</button>
                </a>
            </section>
        `
        productsCarrito = document.querySelectorAll('.cart__product-card__actions');
        cartHtml.innerHTML = content;
    }else{
        content = `
        <h3 class="cart-error">No hay productos agregados a tu carrito</h3>
          <div class="cart-error__products">
              <%- include('../partials/products-list', {products: productsByRate, title: "Comienza agregando algunos productos", count: 4}) %>
          </div>
            <!-- Importación de menú de categorias -->
          <%- include('../partials/categories') %>
        `;
        cartHtml.innerHTML = content;
    }
}

