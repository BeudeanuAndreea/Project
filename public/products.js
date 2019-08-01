allObjects = [];
rockObjects = [];
popObjects = [];
jazzObjects = [];
hiphopObjects = [];
var selected = [false, false, false, false];
var checkboxSelect = [false, false, false, false, false];
var cat_name = null;
addedToCart = [];
var objects = [{
    src: " assets/guts.jpg",
    artist: "dsfsffdsfd",
    name: "dfsfds",
    price: "20",
    category_name: 'rock'

}];


$(document).ready(function () {

    getItems();

    console.log(addedToCart);

    $('.submit').click(function (event) {

        sendObjectList(addedToCart);
        window.location.href = "cart.html";
    });

    $('#rock-section').click(function (event) {
        //unselect another section when this is clicked
        $("#pop-section").css('background', 'white');
        $("#pop-section").css('color', 'black');
        selected[1] = false;

        $("#jazz-section").css('background', 'white');
        $("#jazz-section").css('color', 'black');
        selected[2] = false;

        $("#hiphop-section").css('background', 'white');
        $("#hiphop-section").css('color', 'black');
        selected[3] = false;


        if (selected[0] == false) {
            selected[0] = true;
            getRockItems();
            $(this).css('background', '#260800');
            $(this).css('color', 'white');
        }
        else {
            selected[0] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color', 'black');



        }



    });


    $('#pop-section').click(function (event) {
        $("#rock-section").css('background', 'white');
        $("#rock-section").css('color', 'black');
        selected[0] = false;

        $("#jazz-section").css('background', 'white');
        $("#jazz-section").css('color', 'black');
        selected[2] = false;

        $("#hiphop-section").css('background', 'white');
        $("#hiphop-section").css('color', 'black');
        selected[3] = false;
        if (selected[1] == false) {
            selected[1] = true;
            getPopItems();
            $(this).css('background', '#8D2B6E');
            $(this).css('color', 'white');
        }
        else {
            selected[1] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }


    });
    $('#jazz-section').click(function (event) {
        $("#rock-section").css('background', 'white');
        $("#rock-section").css('color', 'black');
        selected[0] = false;

        $("#pop-section").css('background', 'white');
        $("#pop-section").css('color', 'black');
        selected[1] = false;

        $("#hiphop-section").css('background', 'white');
        $("#hiphop-section").css('color', 'black');
        selected[3] = false;

        if (selected[2] == false) {
            selected[2] = true;
            getJazzItems();
            $(this).css('background', '#307A9D');
            $(this).css('color', 'white');
        }
        else {
            selected[2] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }


    });
    $('#hiphop-section').click(function (event) {
        $("#rock-section").css('background', 'white');
        $("#rock-section").css('color', 'black');
        selected[0] = false;

        $("#pop-section").css('background', 'white');
        $("#pop-section").css('color', 'black');
        selected[1] = false;

        $("#jazz-section").css('background', 'white');
        $("#jazz-section").css('color', 'black');
        selected[2] = false;
        if (selected[3] == false) {
            selected[3] = true;
            getHiphopItems();
            $(this).css('background', '#676767');
            $(this).css('color', 'white');
        }
        else {
            selected[3] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color', 'black');
        }



    });

    $('.cheap').click(function (event) {
        if (checkboxSelect[0] == false) {
            checkboxSelect[0] = true;
            getCheapItems();
        }
        else {
            checkboxSelect[0] = false;
            getItems();
        }
        if (selected[0] == true) {

            getBothFilters();

        }


        $(".semi-cheap").prop("checked", false);
        $(".medium").prop("checked", false);
        $(".expensive").prop("checked", false);
        $(".very-expensive").prop("checked", false);

    });
    $('.semi-cheap').click(function (event) {
        if (checkboxSelect[1] == false) {
            checkboxSelect[1] = true;
            getSemiCheapItems();
        }
        else {
            checkboxSelect[1] = false;
            getItems();
        }

        $(".cheap").prop("checked", false);
        $(".medium").prop("checked", false);
        $(".expensive").prop("checked", false);
        $(".very-expensive").prop("checked", false);

    });
    $('.medium').click(function (event) {
        if (checkboxSelect[2] == false) {
            checkboxSelect[2] = true;
            getMediumItems();
        }
        else {
            checkboxSelect[2] = false;
            getItems();
        }

        $(".cheap").prop("checked", false);
        $(".semi-cheap").prop("checked", false);
        $(".expensive").prop("checked", false);
        $(".very-expensive").prop("checked", false);

    });
    $('.expensive').click(function (event) {
        if (checkboxSelect[3] == false) {
            checkboxSelect[3] = true;
            getExpensiveItems();
        }
        else {
            checkboxSelect[3] = false;
            getItems();
        }

        $(".cheap").prop("checked", false);
        $(".semi-cheap").prop("checked", false);
        $(".medium").prop("checked", false);
        $(".very-expensive").prop("checked", false);

    });
    $('.very-expensive').click(function (event) {
        if (checkboxSelect[4] == false) {
            checkboxSelect[4] = true;
            getVeryExpensiveItems();
        }
        else {
            checkboxSelect[4] = false;
            getItems();
        }

        $(".cheap").prop("checked", false);
        $(".semi-cheap").prop("checked", false);
        $(".medium").prop("checked", false);
        $(".expensive").prop("checked", false);

    });

    function getBothFilters() {
        $.ajax({
            url: '/items/filter/both',
            type: 'post',
            dataType: 'json',
            data: {

                min: 1,
                max: 10

            },
            success: function (data) {
                renderList(data);

            },
            error: function (error) {
                console.log(error);
            }
        });

    }


    function getCheapItems() {
        $.ajax({
            url: '/items/filter',
            type: 'post',
            dataType: 'json',
            data: {
                min: 1,
                max: 10

            },
            success: function (data) {
                renderList(data);

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    function getSemiCheapItems() {
        $.ajax({
            url: '/items/filter',
            type: 'post',
            dataType: 'json',
            data: {
                min: 11,
                max: 20

            },
            success: function (data) {
                renderList(data);

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    function getMediumItems() {
        $.ajax({
            url: '/items/filter',
            type: 'post',
            dataType: 'json',
            data: {
                min: 21,
                max: 30

            },
            success: function (data) {
                renderList(data);

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    function getExpensiveItems() {
        $.ajax({
            url: '/items/filter',
            type: 'post',
            dataType: 'json',
            data: {
                min: 31,
                max: 40

            },
            success: function (data) {
                renderList(data);

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    function getVeryExpensiveItems() {
        $.ajax({
            url: '/items/filter',
            type: 'post',
            dataType: 'json',
            data: {
                min: 41,
                max: 70

            },
            success: function (data) {
                renderList(data);

            },
            error: function (error) {
                console.log(error);
            }
        });
    }


    function getRockItems() {
        $.ajax({
            url: '/rock/items',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                renderList(data);
                rockObjects = data;
            },
            error: function (error) {
                console.log(error);
            }
        });


    }
    function getPopItems() {
        $.ajax({
            url: '/pop/items',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                renderList(data);
                popObjects = data;
            },
            error: function (error) {
                console.log(error);
            }
        });


    }
    function getJazzItems() {
        $.ajax({
            url: '/jazz/items',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                renderList(data);
                jazzObjects = data;
            },
            error: function (error) {
                console.log(error);
            }
        });


    }
    function getHiphopItems() {
        $.ajax({
            url: '/hiphop/items',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                renderList(data);
                hiphopObjects = data;
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

    function sendItem(id, name) {
        $.ajax({
            url: '/items/cart',
            type: 'put',
            dataType: 'json',
            data: { id: id },
            success: function (data) {
                alert(`Order successfully for: ${name}`);
            },
            error: function (error) {
                alert(`Order failed for: ${name}`);
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
        const artist = $("<p>").addClass('artist').addClass('row');
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

            sendItem(object._id, object.name);
        });




        return item;







    }









});