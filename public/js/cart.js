// Como líder del Equipo de Desarrollo, quiero que, cuando un cliente agrega un producto a su carrito, se almacene esta información dentro de la API que nos proporcionó el equipo de backend, para poder tener persistencia de datos entre sesiones.
// Para esto debemos respetar el siguiente formato:
// localStorage.setItem(J)
// const getCart = () => {
//     let data = localStorage.getItem('user');
//     let user = JSON.parse(data);
//    return fetch(`http://localhost:5000/api/cart/${user.id}`)
//     .then((res) => {
//       return res.json();
//     })
//   }



const productsCarrito = document.querySelectorAll('.cart__product-card__actions');

const updateQuantity = (param, txtIdProduct, txtQuantity)=>{
    localStorage.setItem('userId', 1);
    let data;
    if(param === "+"){
        data = {
            userId: parseInt(localStorage.getItem('userId')),
            product: {
                id: parseInt(txtIdProduct),
                quantity: parseInt(txtQuantity) +1
            }
        }
    }else if(param ==="-"){
        data = {
            userId: parseInt(localStorage.getItem('userId')),
            product: {
                id: parseInt(txtIdProduct),
                quantity: parseInt(txtQuantity) -1
            }
        }
    }
    fetch('http://localhost:5000/api/cart', {
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
    localStorage.setItem('userId', 1);


    fetch(`http://localhost:5000/api/cart/${localStorage.getItem('userId')}?productId=${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

productsCarrito.forEach(pc =>{
    pc.addEventListener('click', (e)=>{
        if(e.target.value == "+"){
            let id = e.target.previousElementSibling.value; //nextElementSibling.value;
            let quantity = document.getElementById('quantity'+id);
            updateQuantity('+', id, quantity.innerText);
            quantity.innerHTML = parseInt(quantity.innerText) + 1;
            location.reload();
        }else if(e.target.value == "-"){
            let id = e.target.nextElementSibling.nextElementSibling.value;
            
            let quantity = document.getElementById('quantity'+id);
            if(parseInt(quantity.innerText)>=2){
                updateQuantity('-', id, quantity.innerText);
                quantity.innerHTML = parseInt(quantity.innerText) - 1;
                location.reload();
            } 
        }else if(e.target.innerText == "Quitar"){
            let id = e.target.nextElementSibling.value;
            deleteProduct(id);
            location.reload();
        }
    })
})

