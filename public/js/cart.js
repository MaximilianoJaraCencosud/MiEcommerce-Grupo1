// Como líder del Equipo de Desarrollo, quiero que, cuando un cliente agrega un producto a su carrito, se almacene esta información dentro de la API que nos proporcionó el equipo de backend, para poder tener persistencia de datos entre sesiones.
// Para esto debemos respetar el siguiente formato:
 
//   {
//     "userId": 1,
//     "product": {
//       "id": 1,
//       "quantity": 2
//     }
//   }

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