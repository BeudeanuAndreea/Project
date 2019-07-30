$(document).ready(function () {

  function getUser(username) {
    var loginData = {'name: '}
    $.ajax({
      url: `/user`,
      type: 'POST',
      dataType: 'json',
      success: function (data) {
          console.log("bravo");
      },
      error: function (error) {
          console.log(error);
      }
  });
  }

   let container = $('<div>').addClass("container-login");
   let message = $('<div>').addClass("message").html('Hello');
   let inputs = $('<div>').addClass("inputs-login");
   let labelMail = $('<label>').html("Please enter your email: ");
   let inputMail = $('<input>').attr("type", "text").addClass("email");
   let labelPassword = $('<label>').html("and your password:");
   let inputPassword = $('<input>').attr("type", "password").addClass("password");
   let button = $('<input>').attr("type", "submit").val("Login");

  labelMail.append(inputMail);
  inputs.append(labelMail);
  labelPassword.append(inputPassword);
  inputs.append(labelPassword);
  inputs.append(button);
  container.append(message);
  container.append(inputs);
  $('#content').append(container);

  button.click(function () {
    const username = inputMail.val();
    const password = inputPassword.val();
    console.log(username);
    console.log(password);
    getUser(username, password);

  });
    
});