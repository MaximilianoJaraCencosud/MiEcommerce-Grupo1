
(() => {

    let loginMenu = document.querySelector('.noLoged');
    let userMenu = document.querySelector('.loged');

    if(isLoged() != null){

        let userName = getUserName();
        let $userName = document.querySelector(".user-button__name p");

        
        if(loginMenu) loginMenu.style.display = 'none'
        if(userMenu){
            $userName.innerHTML = userName;
            userMenu.style.display = 'flex'
        } 

    }else{

        if(loginMenu) loginMenu.style.display = 'flex'
        if(userMenu) userMenu.style.display = 'none'
    }
    
})();


function isLoged (){
    return localStorage.getItem('isLogged');
}

function getUserName(){
    let data = localStorage.getItem('user');
    let user = JSON.parse(data);
    return user.name;
}

