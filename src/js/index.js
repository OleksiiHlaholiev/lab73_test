$(function () {

    var menuStateFlag = 0;

    var header = $('#header'),
        headerFullCont = $('#header .full-cont'),
        logoCont = $('#header .logo-cont'),
        menuBtn = $('#menu-btn'),
        mainMenu = $('#main-menu'),
        menuDarkMask = $('#main-menu .dark-mask'),
        menuBgCont = $('#main-menu .left-bg-cont'),
        menuItems = $('#main-menu .menu li'),

        mainHeader = $('.main-section .main-header'),
        mainInfo = $('.main-section .main-info'),
        macbookVideo = $('.main-section .macbook-cont .video-wrapper'),
        macbookImgs = $('.main-section .macbook-cont img'),

        userBtns = $('.user-section .btn-wrapper .user-btn'),
        imgTextGuru = $('.user-section .img-text-guru');

    function pageInitState() {
        $(headerFullCont).addClass('transparent').removeClass('animated slideInDown');

        $(mainHeader).addClass('transparent').removeClass('animated fadeInUp');
        $(mainInfo).addClass('transparent').removeClass('animated fadeInUp');
        $(macbookVideo).addClass('transparent').removeClass('animated zoomIn');
        $(macbookImgs).addClass('transparent').removeClass('animated zoomIn');

        $(imgTextGuru).addClass('transparent').removeClass('animated zoomIn');
        $(userBtns).addClass('transparent').removeClass('animated fadeInUp');
    }
    function pageAnimateState() {
        setTimeout(function () {
            $(headerFullCont).removeClass('transparent').addClass('animated slideInDown');
        }, 200);

        setTimeout(function () {
            $(menuBtn).removeClass('transparent').addClass('animated slideInDown');
        }, 300);

        setTimeout(function () {
            $(mainHeader).removeClass('transparent').addClass('animated fadeInUp');
        }, 400);

        setTimeout(function () {
            $(mainHeader).find('.line').addClass('active');
        }, 700);

        setTimeout(function () {
            $(mainInfo).removeClass('transparent').addClass('animated fadeInUp');
        }, 800);

        $(macbookImgs).each(function (index, item) {
            setTimeout(function () {
                $(item).removeClass('transparent').addClass('animated zoomIn');
            }, 1000 + 300 * index);
        });

        setTimeout(function () {
            $(macbookVideo).removeClass('transparent').addClass('animated zoomIn');
        }, 1000);

        setTimeout(function () {
            $(imgTextGuru).removeClass('transparent').addClass('animated zoomIn');
        }, 1500);

        $(userBtns).each(function (index, item) {
            setTimeout(function () {
                $(item).removeClass('transparent').addClass('animated fadeInUp');
            }, 2000 + 300 * index);
        });
    }

    function menuInitState() {
        menuStateFlag = 0;
        $(mainMenu).fadeOut(400);

        $(menuDarkMask).addClass('transparent').removeClass('animated slideInLeft');
        $(menuBgCont).addClass('transparent').removeClass('animated slideInLeft');
        $(menuItems).addClass('transparent').removeClass('animated fadeInLeft');
    }
    function menuAnimateState() {
        menuStateFlag = 1;
        $(mainMenu).fadeIn(400);

        setTimeout(function () {
            $(menuDarkMask).removeClass('transparent').addClass('animated slideInLeft');
        }, 100);
        setTimeout(function () {
            $(menuBgCont).removeClass('transparent').addClass('animated slideInLeft');
        }, 500);
        $(menuItems).each(function (index, item) {
            setTimeout(function () {
                $(item).removeClass('transparent').addClass('animated fadeInLeft');
            }, 600 + 300 * index);
        });
    }

    pageInitState();
    menuInitState();

    pageAnimateState();


    $(menuBtn).on('click', function () {
        $(this).toggleClass('active');
        $(header).toggleClass('active');
        // $(mainMenu).fadeToggle(400);

        (menuStateFlag === 0) ? menuAnimateState() : menuInitState();
    });

});