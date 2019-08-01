allObjects = [];
var criteria = {}
var cat_name = null;
addedToCart = [];
const userId = localStorage.getItem('User');



$(document).ready(function () {

    getItems();
    console.log(userId);

    console.log(addedToCart);

    $('.submit').click(function (event) {
        console.log("am ajuns in cos");
        sendObjectList(addedToCart, userId);
        window.location.href = "cart.html";
    });

    $('#rock-section').click(function (event) {
        if (criteria.category_name != 'rock') {
            criteria.category_name = 'rock';
            $(this).css('background', '#260800');
            $(this).css('color', 'white');
            $('#pop-section').css('background', 'white');
            $("#pop-section").css('color', 'black');
            $('#jazz-section').css('background', 'white');
            $("#jazz-section").css('color', 'black');
            $('#hiphop-section').css('background', 'white');
            $("#hiphop-section").css('color', 'black');
        }
        else {
            criteria.category_name = undefined;
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }

        getFilteredItems();
    });


    $('#pop-section').click(function (event) {

        if (criteria.category_name != 'pop') {
            criteria.category_name = 'pop'
            $(this).css('background', '#8D2B6E');
            $(this).css('color', 'white');
            $('#rock-section').css('background', 'white');
            $("#rock-section").css('color', 'black');
            $('#jazz-section').css('background', 'white');
            $("#jazz-section").css('color', 'black');
            $('#hiphop-section').css('background', 'white');
            $("#hiphop-section").css('color', 'black');
        }
        else {
            criteria.category_name = undefined;
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }
        getFilteredItems();
    });

    $('#jazz-section').click(function (event) {

        if (criteria.category_name != 'jazz') {
            criteria.category_name = 'jazz'
            $(this).css('background', '#307A9D');
            $(this).css('color', 'white');
            $('#rock-section').css('background', 'white');
            $("#rock-section").css('color', 'black');
            $('#pop-section').css('background', 'white');
            $("#pop-section").css('color', 'black');
            $('#hiphop-section').css('background', 'white');
            $("#hiphop-section").css('color', 'black');
        }
        else {
            criteria.category_name = undefined;
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }
        getFilteredItems();
    });

    $('#hiphop-section').click(function (event) {

        if (criteria.category_name != 'hiphop') {
            criteria.category_name = 'hiphop'
            $(this).css('background', '#676767');
            $(this).css('color', 'white');
            $('#rock-section').css('background', 'white');
            $("#rock-section").css('color', 'black');
            $('#pop-section').css('background', 'white');
            $("#pop-section").css('color', 'black');
            $('#jazz-section').css('background', 'white');
            $("#jazz-section").css('color', 'black');
        }
        else {
            criteria.category_name = undefined;
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }
        getFilteredItems();
    });

    $('.cheap').click(function (event) {

        if (criteria.price != {
            min: 1,
            max: 10
        }) {
            criteria.price = {
                min: 1,
                max: 10
            }
        }
        else {
            criteria.price = undefined;
        }
        getFilteredItems();

    });
    $('.semi-cheap').click(function (event) {
        if (criteria.price != {
            min: 10,
            max: 20
        }) {
            criteria.price = {
                min: 10,
                max: 20
            }
        }
        else {
            criteria.price = undefined;
        }
        getFilteredItems();

    });
    $('.medium').click(function (event) {
        if (criteria.price != {
            min: 20,
            max: 30
        }) {
            criteria.price = {
                min: 20,
                max: 30
            }
        }
        else {
            criteria.price = undefined;
        }
        getFilteredItems();
    });

    $('.expensive').click(function (event) {
        if (criteria.price != {
            min: 30,
            max: 40
        }) {
            criteria.price = {
                min: 30,
                max: 40
            }
        }
        else {
            criteria.price = undefined;
        }
        getFilteredItems();

    });

    $('.very-expensive').click(function (event) {
        if (criteria.price != {
            min: 40,
            max: 70
        }) {
            criteria.price = {
                min: 40,
                max: 70
            }
        }
        else {
            criteria.price = undefined;
        }
        getFilteredItems();
    });


    function getFilteredItems() {
        $.ajax({
            url: '/items/filtered',
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(criteria),
            success: function (data) {
                console.log('xxxxxxx', data);
                renderList(data);
            },
            error: function (error) {
                console.log(error);
            }
        });

    }

    function getItems() {
        $.ajax({
            url: '/items',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                renderList(data);
                allObjects = data;
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function sendObjectList(addedToCart, userId) {
        console.log("----------",userId);
        addedToCart = JSON.stringify(addedToCart);
        //console.log(addedToCart);
        //console.log(list);
        $.ajax({
            url: '/items/cart',
            type: 'put',
            dataType: 'json',
            data: { elements: addedToCart,
                    id: userId
                 },

            success: function (data) {
                // console.log(data);

            },
            error: function (error) {
                console.log(error);

            }

        });

    }

    function renderList(objects) {
        $('.container-right').html('');
        $.each(objects, function () {
            let item = createItem(this);
            $('.container-right').append(item);
        });
    }

    function createItem(object) {
        let item = $("<div>").addClass('vinyl');
        let ul = $("<ul>").addClass('attributes');
        let img = $('<img/>').attr({
            'src': `${object.src}`,
            'class': 'icon'
        })

        const icon = $("<li>");
        const play = $("<li>").addClass('song-name');
        const artist = $("<p>").addClass('artist');
        const name = $("<p>").addClass('row');
        const price = $("<li>").addClass('price').html('$');
        const add = $("<button>").addClass('button-color');
        const button = $("<div>").addClass('button');
        const span = $("<span>").html("Add to cart");

        play.append(artist);
        play.append(name);
        icon.append(img);
        ul.append(icon);
        ul.append(play);
        ul.append(price);
        button.append(add);

        add.append(span);


        artist.append(object.artist);
        name.append(object.name);
        price.append(object.price);

        item.append(ul);
        item.append(button);
        cat_name = object.category_name;

        add.click(function () {
           
            
            if (userId === undefined) {
                 window.location.href = 'login.html';
            } else {
                addedToCart.push(object._id);  
                console.log(localStorage);
            }
              
            addedToCart.push(object._id);
        });

        return item;



    }


});