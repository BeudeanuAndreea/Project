let cartObjects= [];
var user=localStorage.getItem('User');
function getCart(user) {
    let itemNr=0;
    $.ajax({
        
        url: `/cart/second`,
        type: 'post',
        dataType: 'json',
        data: {
            uid: userId
        },
        success: function (data) {
            console.log(data);
            
        cartObjects = data.cart;
        for(i=0;i<cartObjects.length;i++){
            itemNr++;

        }
        $(".prod-number").html(itemNr);
    
        },
        error: function (error) {
            console.log(error);
        }
    });
}
getCart(user);
