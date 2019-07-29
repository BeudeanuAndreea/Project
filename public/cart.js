
cartObjects = [];
total=0;

$(document).ready(function () {

    getCartItems();
});

function getCartItems() {
    $.ajax({
        url: `/cart`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            
            cartObjects = data.cart;
            renderList(cartObjects);
            console.log(cartObjects);
         
            
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: `/delete/item/${id}`,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < cartObjects.length; i++) {
                if (cartObjects[i]._id == id) {
                    cartObjects.splice(i, 1);
                    break;
                }
            }

            renderList(cartObjects);
        },
        error: function (error) {

            console.log(error);
        }
    });

}

function renderList(cartObjects) {
    $('.container').html('');
    $.each(cartObjects, function () {
        total += this.price;
        let item = createItem(this);
        $('.container').append(item);
    });
 $(".total-price-p").html("$"+total);

}




function createItem(cartObjects) {
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
    

    play.append(artist);
    play.append(name);
    icon.append(img);
    ul.append(icon);
    ul.append(play);
    ul.append(price);
    
    trash.click(function(){
        deleteItem(cartObjects._id);
    })


    artist.append(cartObjects.artist);
    name.append(cartObjects.name);
    price.append(cartObjects.price);

   
    

    item.append(ul);
    item.append(trash);



    return item;

}
