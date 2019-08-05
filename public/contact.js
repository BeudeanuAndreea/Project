$(document).ready(function(){
    
    // console.log(username,password);
    $('#button').on("click", function(event){
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        sendMail(name,email,message);
        alert("The message was send! Thank you for your visit."); 
        window.location.href = 'index.html';
        console.log(name, email, message);
       
    }); 
    function sendMail(name,email,message){
    	 $.ajax({
        url: '/send',
        type: 'POST',
        datatype: 'json',
        data: {
        	name: name,
        	email: email,
        	message: message
        },
        success: function (data) {
           console.log("success");
 
        },
        errror: function(error) {
            console.log('servus');
            console.log(error);
        } 

    }); 

    }  

 });

