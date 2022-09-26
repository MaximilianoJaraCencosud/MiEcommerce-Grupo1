
(() => {

    let loginMenu = document.querySelector('.noLoged');
    let userMenu = document.querySelector('.loged');

    if(isLoged() != null){

        let userName = getUserName();
        let $userName = document.querySelector(".user-button__name p");

        $userName.innerHTML = userName;

        userMenu.classList.remove('hidden')
        userMenu.classList.add('flex')
        loginMenu.classList.add('hidden')

    }else{
        console.log('No logueado');
        userMenu.classList.add('hidden')
        userMenu.classList.remove('flex')
        loginMenu.classList.remove('hidden')
        loginMenu.classList.add('flex')
    }
    
})();


function isLoged (){
    return localStorage.getItem('id');
}

function getUserName(){
    return localStorage.getItem('name');
}

