$(function () {
    var header = $('#header'),
        menuBtn = $('#menu-btn'),
        mainMenu = $('#main-menu');


    $(menuBtn).on('click', function () {
        $(this).toggleClass('active');
        $(header).toggleClass('active');
        $(mainMenu).fadeToggle(400);
    })
});