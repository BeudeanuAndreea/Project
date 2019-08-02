$(document).ready(function () {

    $(".border").click(function () {
        $(this).effect('shake');
    });

    getStats();
    setStats();

    function getStats() {
        $.ajax({
            url: '/statistics',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                for (let i = 0; i <= data.length; i++)
                    $("." + data[i].name).css("height", (100 - data[i].sales) + "%");
            },
            error: function (error) {
                console.log(error);
                $('.page-container').hide();
                $('.error').show();
            }
        })
    }

    function setStats() {

    }
});