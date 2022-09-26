// Como líder del Equipo de Desarrollo, quiero que, cuando un cliente agrega un producto a su carrito, se almacene esta información dentro de la API que nos proporcionó el equipo de backend, para poder tener persistencia de datos entre sesiones.
// Para esto debemos respetar el siguiente formato:




const productsCarrito = document.querySelectorAll('.cart__product-card__action-amount');

const updateQuantityLess = ()=>{
    let txtIdProduct = document.getElementById('txtIdProduct').value;
    localStorage.setItem('userId', 1);
    let data = {
            userId: parseInt(localStorage.getItem('userId')),
            product: {
                id: parseInt(txtIdProduct),
                quantity: parseInt(txtQuantity) -1
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
    .then(data => console.log(data));
}


productsCarrito.forEach(pc =>{
    pc.addEventListener('click', (e)=>{
        console.log(e)
        console.log(e.target)
        if(e.target.value == "+"){
            alert("mas")
        }else if(e.target.value == "-"){
            alert("menos")
        }
    })
})
// console.log(productsCarrito)

