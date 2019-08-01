let cartObjects= [];
function getCart() {
    let itemNr=0;
    $.ajax({
        
        url: `/cart/second`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            
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
getCart();
