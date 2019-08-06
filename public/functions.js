 //let cartObjects= [];
 var user=localStorage.getItem('User');
 var itemNr=0;
 var  total=0;
 function getCartItems(userId) {

    $.ajax({
        url: '/cart',
        type: 'post',
        dataType: 'json',
        data: {
            uid: userId
        },
        success: function (data) {
            //console.log(data);
            cartObjects = data.cart;
            //console.log(cartObjects);
            for (i = 0; i < cartObjects.length; i++) {
                total += cartObjects[i].price;
                 itemNr++;
            }
            $(".total-price-p").html("$" + total);
            $(".prod-number").html(itemNr);
            //console.log(itemNr);

            converted = convert(cartObjects);
            //    for(i=0;i<converted.length;i++){
            //        $('.quantity').html(converted[i].q);
            //        console.log(converted[i].q);
            //    }
            //sum(converted);
            renderList(converted);
            //console.log(cartObjects);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function deleteItem(id, userId) {
    console.log(userId);
    console.log(converted);
    $.ajax({
        url: `/delete/item`,
        type: 'delete',
        dataType: 'json',
        data: {
            id: id,
            userid: userId
        },
        success: function (data) {

            console.log("dfdfdgdgfdfgg", converted);
            for (i = 0; i < converted.length; i++) {
                if (converted[i]._id == id && converted[i].q == 1) {

                           console.log(converted[i].q);
                    total = total - converted[i].price;
                    itemNr--;
                    $(".prod-number").html(itemNr);
                    converted.splice(i, 1);
                    $(".total-price-p").html("$" + total);
                    break;

                } else if (converted[i]._id == id && converted[i].q > 1) {
                    converted[i].q--;
                    total = total - converted[i].price;
                    $(".total-price-p").html("$" + total);
                    itemNr--;
                    $(".prod-number").html(itemNr);
                }
            }
           
            // getCartItems();

            renderList(converted);

        },
        error: function (error) {

            console.log(error);
        }
    });

}