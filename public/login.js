$(document).ready(function(){
    
    // console.log(username,password);
    $('#button').on("click", function(event){
        var username = $('#username').val();
        var password = $('#password').val();

        console.log('.......', username, password, $('#username'))
        checkLogin(username,password);
    });    

    $('#logout').on("click", function(event){
        console.log("heloo");
        var userId;
        userId = localStorage.removeUser(User);
        console.log(userId);
    })
    
});

function checkLogin(name, password){
    let user = {
        name: name, 
        password: password
    }
    console.log('buna', user);
    $.ajax({
        url: '/login',
        type: 'POST',
        datatype: 'json',
        data:  user,
        success: function (data) {
            window.localStorage;
            localStorage.setItem("User", data._id);
            //var userId = localStorage.getItem(user);
            
          //  console.log(userId);
            window.location.href = 'index.html';
            alert("Hello"+" " + user.name);
        },
        errror: function(error) {
            console.log('servus');
            console.log(error);
        }    
    });
}