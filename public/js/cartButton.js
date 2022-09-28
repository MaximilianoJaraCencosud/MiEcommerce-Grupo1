let test = localStorage.getItem('quantity-articles-cart');
if(test!=null){
    document.getElementById('quantity-articles-cart').innerHTML=test;
}