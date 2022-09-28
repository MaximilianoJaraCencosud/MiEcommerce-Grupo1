let test = localStorage.getItem('quantity-articles-cart');
console.log(test);
if(test!=null && test != "undefined"){
    document.getElementById('quantity-articles-cart').innerHTML=test;
}else{
    let quantity = localStorage.setItem('quantity-articles-cart', 0);
    document.getElementById('quantity-articles-cart').innerHTML=quantity;
}