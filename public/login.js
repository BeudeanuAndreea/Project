$(document).ready(function(){
    
    // console.log(username,password);
    $('#button').on("click", function(event){
        var username = $('#username').val();
        var password = $('#password').val();

        console.log('.......', username, password, $('#username'))
        checkLogin(username,password);
        
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
            console.log("ajung aici");
            window.location.href = 'index.html';
            // console.log('ajung aici');
            // console.log(data);
            // if (data === 'Correct') {
            //     window.location.href('index.html');
            // }
        },
        errror: function(error) {
            console.log('servus');
            console.log(error);
        }    
    });
}