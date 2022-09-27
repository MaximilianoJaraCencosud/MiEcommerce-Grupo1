let test = localStorage.getItem('quantity-articles-cart');
console.log(test);
if(test!=null){
    document.getElementById('quantity-articles-cart').innerHTML=test;
}