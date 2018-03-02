'use strict';

$(function () {

    var menuStateFlag = 0,
        isMobileViewFlag = true,
        mobileViewWidth = 992;

    var header = $('#header'),
        headerFullCont = $('#header .full-cont'),
        logoCont = $('#header .logo-cont'),
        logoImg = $('#header .logo-cont .logo-img'),
        logoImgMob = $('#header .logo-cont .logo-img-mobile'),
        titleContMob = $('#header .title-cont-mob'),
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

        if (!isMobileViewFlag) {
            setTimeout(function () {
                $(menuDarkMask).addClass('transparent').removeClass('animated slideInLeft');
                $(menuBgCont).addClass('transparent').removeClass('animated slideInLeft');
                $(menuItems).addClass('transparent').removeClass('animated fadeInLeft');
            }, 400);
        } else {
            setTimeout(function () {
                $(logoImg).removeClass('transparent').addClass('animated fadeIn');
                $(logoImgMob).addClass('transparent').removeClass('animated slideInDown');
                $(titleContMob).addClass('transparent').removeClass('animated fadeIn');
                $(menuDarkMask).addClass('transparent').removeClass('animated fadeIn');
                $(menuItems).addClass('transparent').removeClass('animated slideInDown');
            }, 400);
        }

    }

    function menuAnimateState() {
        menuStateFlag = 1;
        $(mainMenu).fadeIn(400);

        if (!isMobileViewFlag) {
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
        } else {
            setTimeout(function () {
                $(logoImg).addClass('transparent').removeClass('animated fadeIn');
                $(logoImgMob).removeClass('transparent').addClass('animated slideInDown');
                $(titleContMob).removeClass('transparent').addClass('animated fadeIn');
                $(menuDarkMask).removeClass('transparent').addClass('animated fadeIn');
            }, 100);
            $(menuItems).each(function (index, item) {
                setTimeout(function () {
                    $(item).removeClass('transparent').addClass('animated slideInDown');
                }, 600 + 300 * index);
            });
        }

    }

    $(menuBtn).on('click', function () {
        $(this).toggleClass('active');
        $(header).toggleClass('active');
        // $(mainMenu).fadeToggle(400);

        (menuStateFlag === 0) ? menuAnimateState() : menuInitState();
    });

    function resizeWindowHandler(event) {
        isMobileViewFlag = window.innerWidth < mobileViewWidth;
    }

    $(window).on('resize', resizeWindowHandler);

    // ***************************************************************************************
    resizeWindowHandler(); // initial call

    pageInitState();
    menuInitState();

    pageAnimateState();
});

// parallax effect with GSAP
$(function () {
    var $parallaxContainer = $(".macbook-cont"); // our container
    var $parallaxItems = $parallaxContainer.find(".parallax");  //elements
    var fixer = 0.001;		//experiment with the value

    $(document).on("mousemove", function (event) {

        var pageX = event.pageX - ($parallaxContainer.width() * 0.5);  //get the mouseX - negative on left, positive on right
        var pageY = event.pageY - ($parallaxContainer.height() * 0.5); //same here, get the y. use console.log(pageY) to see the values

        //here we move each item
        $parallaxItems.each(function () {

            var item = $(this);
            var speedX = item.data("speed-x");
            var speedY = item.data("speed-y");

            TweenLite.to(item, 0.5, {
							x: (item.position().left + pageX * speedX)*fixer,    //calculate the new X based on mouse position * speed
							y: (item.position().top + pageY * speedY)*fixer
						});

            //or use set - not so smooth, but better performance
            /*TweenLite.set(item, {
                x: (item.position().left + pageX * speedX) * fixer,
                y: (item.position().top + pageY * speedY) * fixer
            });*/

        });
    });
});
