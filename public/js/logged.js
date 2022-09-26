
(() => {

    let loginMenu = document.querySelector('.noLoged');
    let userMenu = document.querySelector('.loged');

    if(isLoged() != null){

        let userName = getUserName();
        let $userName = document.querySelector(".user-button__name p");

        $userName.innerHTML = userName;

        loginMenu.style.display = 'none'
        userMenu.style.display = 'flex'

    }else{
        console.log('No logueado');

        loginMenu.style.display = 'flex'
        userMenu.style.display = 'none'
    }
    
})();


function isLoged (){
    return localStorage.getItem('id');
}

function getUserName(){
    return localStorage.getItem('name');
}

