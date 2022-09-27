// <%- include('../partials/head', {variable : "Cart | MiEcommerce" }) %>
//   <%-include('../partials/header', {variable_search: true}) %>
//     <main class="cart">
//       <a href="/" class="cart__return">
//         <img src="images/arrow-left.svg" alt="Boton de regreso" />
//         Volver</a>
//       <h1 class="cart__title">Productos en tu Carrito</h1>
//       <section class="cart__product-list">

//         <% if(products!= null){ %> 
//         <% let totalPoints=0; products.map(p=> { %>
//           <% totalPoints +=p.product.price * p.quantity %>
//             <article class="cart__product-card">
//               <div class="cart__product-card__content">
//                 <img src="<%= p.product.images[0] %>" class="cart__product-card__img" alt="<%= p.product.title %>" />
//                 <h3 class="cart__product-card__title">
//                   <%= p.product.title %>
//                 </h3>
//               </div>
//               <div class="cart__product-card__actions">
//                 <%- include('../partials/button',{text: 'Quitar' }) %>
//                 <input type="text" value="<%= p.id %> " hidden>
//                   <div class="cart__product-card__action-amount">
//                     <button value="-">-</button>
//                     <p id="quantity<%= p.id %> ">
//                       <%= p.quantity %>
//                     </p>
//                     <input type="text" id="txtIdProduct<% p.id %> " value="<%= p.id %> " hidden>
//                     <button value="+">+</button>
                    
//                   </div>


//                   <p class="cart__product-card__price">
//                     <%= p.product.price * p.quantity %>
//                   </p>
//               </div>
//             </article>
//             <% }) %>
            
//       </section>
//       <section class="cart__total">
//         <p class="cart__total__text">Total de puntos</p>
//         <p class="cart__total__price">
//           <%= totalPoints %>
//         </p>
//       </section>
      
//       <section class="cart__pay">
//         <a href="/checkout">
//           <%- include('../partials/button',{text: 'Ir a Pagar' }) %>
//         </a>
//       </section>
//       <script src="/js/cart.js"></script>
//       <% }else{ %> 
//         <div class="empty-cart">
//           <h3 class="cart-error">No hay productos agregados a tu carrito</h3>
//           <div class="cart-error__products">
//               <%- include('../partials/products-list', {products: productsByRate, title: "Comienza agregando algunos productos", count: 4}) %>
//           </div>
//             <!-- Importación de menú de categorias -->
//           <%- include('../partials/categories') %>
//         </div>
//       <% } %> 
//     </main>
    
//     <%- include('../partials/footer') %>