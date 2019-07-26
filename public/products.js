allObjects = [];
rockObjects = [];
popObjects = [];
jazzObjects = [];
hiphopObjects = [];
var selected = [false, false, false, false];


$(document).ready(function () {

    getItems();
  
    

    $('#rock-section').click(function (event) {
        //unselect another section when this is clicked
        $("#pop-section").css('background', 'white');
        $("#pop-section").css('color','black');
        selected[1] = false;

        $("#jazz-section").css('background', 'white');
        $("#jazz-section").css('color','black');
        selected[2] = false;

        $("#hiphop-section").css('background', 'white');
        $("#hiphop-section").css('color','black');
        selected[3] = false;

      
        if (selected[0] == false) {
            selected[0] = true;
            getRockItems();
            $(this).css('background', '#260800');
            $(this).css('color','white');
        }
        else {
            selected[0] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color','black');
           


        }

        
    });
  

    $('#pop-section').click(function (event) {
        $("#rock-section").css('background', 'white');
        $("#rock-section").css('color','black');
        selected[0] = false;
    
        $("#jazz-section").css('background', 'white');
        $("#jazz-section").css('color','black');
        selected[2] = false;
    
        $("#hiphop-section").css('background', 'white');
        $("#hiphop-section").css('color','black');
        selected[3] = false;
        if (selected[1] == false) {
            selected[1] = true;
            getPopItems();
            $(this).css('background', '#8D2B6E');
            $(this).css('color','white');
        }
        else {
            selected[1] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color','black');
        }

        
    });
    $('#jazz-section').click(function (event) {
        $("#rock-section").css('background', 'white');
        $("#rock-section").css('color','black');
        selected[0] = false;
    
        $("#pop-section").css('background', 'white');
        $("#pop-section").css('color','black');
        selected[1] = false;
    
        $("#hiphop-section").css('background', 'white');
        $("#hiphop-section").css('color','black');
        selected[3] = false;

        if (selected[2] == false) {
            selected[2] = true;
             getJazzItems();
             $(this).css('background', '#307A9D');
            $(this).css('color','white');
        }
        else {
            selected[2] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color','black');
        }

       
    });
    $('#hiphop-section').click(function (event) {
        $("#rock-section").css('background', 'white');
        $("#rock-section").css('color','black');
        selected[0] = false;
    
        $("#pop-section").css('background', 'white');
        $("#pop-section").css('color','black');
        selected[1]=false;
    
        $("#jazz-section").css('background', 'white');
        $("#jazz-section").css('color','black');
        selected[2]=false;
        if (selected[3] == false) {
            selected[3] = true; 
            getHiphopItems();
            $(this).css('background', '#676767');
            $(this).css('color','white');
        }
        else {
            selected[3] = false;
            getItems();
            $(this).css('background', 'white');
            $(this).css('color','black');
        }


       
    });

    $('#myDropdown').click(function(){
        document.getElementById("#myDropdown").classList.toggle("show");
        // var dropdowns = document.getElementsByClassName("dropdown-content");
        // var i;
        // for (i = 0; i < dropdowns.length; i++) {
        //   var openDropdown = dropdowns[i];
        //   if (openDropdown.classList.contains('show')) {
        //     openDropdown.classList.remove('show');
        //   }
        // }
    });

    function getRockItems() {
        $.ajax({
            url: '/rock/items',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
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
                console.log(data);
                renderList(data);
                allObjects = data;
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

        return item;







    }









});