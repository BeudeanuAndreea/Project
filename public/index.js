var userId=localStorage.getItem('User');
const username = localStorage.getItem('Name');

$(document).ready(function () {

    if(userId == undefined){
       
        $(".login-logout").html("Login");
        $('.login-logout').on("click", function(event){
            window.location.href = 'login.html';
        
        });

        
    }
    else{
        $(".login-logout").html("Logout");
        $(".user").html("Hello" +" "+ username +"!");
        $('.login-logout').on("click", function(event){
            window.location.href = 'index.html';
            window.localStorage.clear();
        });
       
       
       
    }
})

