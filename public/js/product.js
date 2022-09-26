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