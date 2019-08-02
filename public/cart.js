
cartObjects = [];
 var converted;
total=0;
const userId=localStorage.getItem('User');
$(document).ready(function () {

    getCartItems();
    $(".order").click(function(){
        alert("Order sent successfully!");
        deleteCart();
        
       

    });
});
function deleteCart(){
    $.ajax({
        url: `/delete`,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
        
            //for (i = 0; i < cartObjects.length; i++) {
                
                cartObjects.splice(0,cartObjects.length); 
                    total =0;       
                   alert("Thank you for your order!");
                         
                                
           // }
            $(".total-price-p").html("$"+total);
            $(".message").html('Empty cart!');
            renderList(cartObjects);

        },
        error: function (error) {

            console.log(error);
        }
    });
    
}

function getCartItems() {
    //let itemNr=0;
    $.ajax({
        url: `/cart`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            
            cartObjects = data.cart;
            for(i=0;i<cartObjects.length;i++){
                total += cartObjects[i].price;
               // itemNr++;
            }
            $(".total-price-p").html("$"+total);
            //$(".prod-number").html(itemNr);
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

// function sum(converted){
//     let itemNr=0;
//     for(i=0;i<converted.length;i++){
//         itemNr++;
//     }
//     $(".prod-number").html(itemNr);

// }
function deleteItem(id,userId) {
   console.log(userId);
    $.ajax({
        url: `/delete/item`,
        type: 'put',
        dataType: 'json',
        data: {
            id: id,
            userid: userId
        },
        success: function (data) {
           
           
              for (i = 0; i < converted.length; i++) {
                 if (converted[i]._id == id && converted[i].q == 1) {

            // //         console.log(converted[i].q);
                     total =total- converted[i].price;
                     converted.splice(i, 1);
                     break;
                    
                 }
              else if(converted[i]._id == id && converted[i].q > 1){
                     converted[i].q--;
                     total =total- converted[i].price;
                 }
             }
             $(".total-price-p").html("$"+total);
            // getCartItems();
            
            renderList(converted);

        },
        error: function (error) {

            console.log(error);
        }
    });

}

function convert(cartObjects){
    let i=0;
    let qobjects=[];
    while(i<cartObjects.length){
        let item = cartObjects[i];
        let  q=0;
        let j=0;
        while(j<cartObjects.length){
            if(cartObjects[j]._id == item._id){
                q++;
                cartObjects.splice(j,1);
            }
            else{
                j++;
            }
           
        }
        item.q= q;
        qobjects.push(item);
    }
    return qobjects;
}

function renderList(cartObjects) {
    $('.container').html('');
    $.each(cartObjects, function () {
        //total += this.price;
        let item = createItem(this);
        $('.container').append(item);
       
    });

    

    //$(".total-price-p").html("$"+total);

}




function createItem(cartObjects) {
    let converted = convert(cartObjects);
    let item = $("<div>").addClass('vinyl');
    let trash = $("<i>").addClass('fas fa-trash').addClass("trash");
    
    let ul = $("<ul>").addClass('attributes');
    let img = $('<img/>').attr({
        'src': `${cartObjects.src}`,
        'class': 'icon'
    });

    const icon = $("<li>").addClass("icon-box");
    const play = $("<li>").addClass('song-name');
    const artist = $("<p>").addClass('artist').addClass('row');
    const name = $("<p>").addClass('row');
    const price = $("<li>").addClass('price').html('$');
    const quantity = $("<li>").addClass('quantity');
    quantity.append(cartObjects.q);
    

    play.append(artist);
    play.append(name);
    icon.append(img);
    ul.append(icon);
    ul.append(play);
    ul.append(price);
    ul.append(quantity);
    
    trash.click(function(){
        deleteItem(cartObjects._id,userId);
    })


    artist.append(cartObjects.artist);
    name.append(cartObjects.name);
    price.append(cartObjects.price);

   
    

    item.append(ul);
    item.append(trash);



    return item;

}
