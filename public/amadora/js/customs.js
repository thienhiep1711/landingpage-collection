function callPopup(el) {
    $.magnificPopup.open({
        removalDelay: 400,
        items: {
            src: '#popup',
            type: 'inline'
        },
        mainClass: 'mfp-zoom-in',
    });
};


function cusMagnificPopup() {
    $(document).ready(function () {
        //Inline popups effect
        $('.call-inline-pop').magnificPopup({
            removalDelay: 400, //delay removal by X to allow out-animation
            mainClass: 'mfp-zoom-in',
        });
    });
};
cusMagnificPopup();


var groups = {};
$('.call-gallery-pop').each(function () {
    var id = parseInt($(this).attr('data-group'), 10);
    if (!groups[id]) {
        groups[id] = [];
    }

    groups[id].push(this);
});

$.each(groups, function () {
    $(this).magnificPopup({
        type: 'image',
        removalDelay: 500, //delay removal by X to allow out-animation
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        image: {
            titleSrc: 'title'
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup 
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.

    });

});

$(document).ready(function () {
    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});

function sliderAll() {
    $(document).ready(function () {
        //Slider main
        $(".js-slider-home").owlCarousel({
            navigation: true, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true,
            lazyLoad: true,
            transitionStyle: "fade",
            navigationText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
            pagination: false,
        });


        //Slider casure
        $("#sliderBottom").owlCarousel({
            items: 6,
            itemsCustom: false,
            itemsDesktop: [1105, 5],
            itemsDesktopSmall: [1024, 5],
            itemsTablet: [768, 4],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],
            navigation: true,
            autoPlay: 7000,
            stopOnHover: true,
            pagination: false,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            lazyLoad: true,
            transitionStyle: false,
            navigationText: ["<i class='fa fa-angle-left'></i>",
             "<i class='fa fa-angle-right'></i>"]
        });

        $(".sliderNews").owlCarousel({
            items: 3,
            itemsCustom: false,
            itemsDesktop: [1105, 3],
            itemsDesktopSmall: [1024, 3],
            itemsTablet: [768, 3],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            navigation: true,
            autoPlay: 7000,
            stopOnHover: true,
            pagination: false,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            lazyLoad: true,
            transitionStyle: false,
            navigationText: ["<i class='fa fa-angle-left'></i>",
             "<i class='fa fa-angle-right'></i>"]
        });

        $(".sliderProduct").owlCarousel({
            items: 4,
            itemsCustom: false,
            itemsDesktop: [1105, 4],
            itemsDesktopSmall: [1024, 4],
            itemsTablet: [768, 4],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],
            navigation: true,
            autoPlay: 7000,
            stopOnHover: true,
            pagination: false,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            lazyLoad: true,
            transitionStyle: false,
            navigationText: ["<i class='fa fa-angle-left'></i>",
             "<i class='fa fa-angle-right'></i>"]
        });
        //Inline popups effect
        $('.call-inline-pop').magnificPopup({
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    });
    
};

sliderAll();
//Validate contact form
$(document).ready(function () {
    $("#frmContact").validate({
        rules: {
            ctName: {
                required: true
            },
            ctEmail: {
                required: true,
                email: true,
            },
            ctPhone: {
                required: true,
                minlength: 10,
                maxlength: 12,
                number: true,
            },
            ctAddress: {
                required: true
            },
            ctContent: {
                required: true
            },
            ctCapcha: {
                required: true
            },
        },
        messages: {
            ctName: {
                required: "Nhập Tên Của Bạn !",
            },
            ctAddress: {
                required: "Nhập địa chỉ của bạn !",
            },
            ctEmail: {
                required: "Email không được để trống",
                email: "Email không đúng định dạng"
            },
            ctPhone: {
                required: "Bạn cần nhập Số điện thoại",
                minlength: "Số điện thoại tối thiểu 10 số",
                maxlength: "Số điện thoại tối đa 12 số",
                number: "Bạn cần nhập chữ số"
            },
            ctContent: {
                required: "Nhập nội dung !",
            },
            ctCapcha: {
                required: "Nhập mã bảo mật !",
            },
        },
        submitHandler: function () {
            form.submit();
        },
    });
});

//Validate cart form
$(document).ready(function () {
    $("#frmPaymentCart").validate({
        rules: {
            cartName: {
                required: true
            },
            cartEmail: {
                required: true,
                email: true,
            },
            cartPhone: {
                required: true,
                minlength: 10,
                maxlength: 12,
                number: true,
            },
            cartAddress: {
                required: true
            },
            cartContent: {
                required: true
            },

            //ctCapcha: {
            //    required: true
            //},
        },
        messages: {
            cartName: {
                required: "Nhập Tên Của Bạn !",
            },

            cartEmail: {
                required: "Email không được để trống",
                email: "Email không đúng định dạng"
            },
            cartPhone: {
                required: "Bạn cần nhập Số điện thoại",
                minlength: "Số điện thoại tối thiểu 10 số",
                maxlength: "Số điện thoại tối đa 12 số",
                number: "Bạn cần nhập chữ số"
            },
            cartAddress: {
                required: "Nhập địa chỉ của bạn !",
            },
            cartContent: {
                required: "Nhập nội dung đặt hàng!",
            },
            //ctCapcha: {
            //    required: "Nhập mã bảo mật !",
            //},
        },
        submitHandler: function () {
            form.submit();
        },
    });
});

//---------- Detect Device
var isTouchDevice = 'ontouchstart' in window || 'onmsgesturechange' in window;
var isDesktop = $(window).width() != 0 && !isTouchDevice ? true : false;
var isTouchIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1 && navigator.msMaxTouchPoints > 0;
var isIE11 = !!window.MSStream;
var isiPad = navigator.userAgent.indexOf('iPad') != -1;
var isiPhone = navigator.userAgent.indexOf('iPhone') != -1;
var isiPod = navigator.userAgent.indexOf('iPod') != -1;
var isAndroid = navigator.userAgent.indexOf('Android') != -1;
var isIE = navigator.userAgent.toLowerCase().indexOf('msie') != -1 && $(window).width() != 0;
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

// ----------- Check Device customs
$(document).ready(function () {
    if (!isTouchDevice) {

    }
    if (isDesktop) {

    }
    if (isiPhone) {

    }
    if (isiPad) {

    }
});

$("img.lazyImg").lazyload({
    effect: "fadeIn"
});

function mMenu() {
    var $menu = $("#mainMenu").clone();
    $menu.attr("id", "my-mobile-menu");
    $menu.mmenu({

    });
};

function searchMobie() {
    var overlayPage = $('#overlay');
    $(document).ready(function () {
        $('.button-call-search').on('click', function () {
            $(".boxMobieSearch").addClass("open");
            overlayPage.fadeIn();
            $('#iptSearchMobie').blur(function () {
                $('#iptSearchMobie').focus();
            });
        });
        $('.bt-close-search-mb').on('click', function () {
            $(".boxMobieSearch").removeClass("open");
            overlayPage.fadeOut();
        });
        overlayPage.on('click', function () {
            $(".boxMobieSearch").removeClass("open");
            overlayPage.fadeOut();
        });

    });
};


$('.isotope-wrapper')
		.each(function () {

		    var $isotope = $('.js-mansory', this);
		    var $filterCheckboxes = $('#menu-mansory a', this);

		    var filter = function () {
		        var type = $filterCheckboxes.filter(':checked').data('type') || '*';
		        if (type !== '*') {
		            type = '[data-type="' + type + '"]';
		        }
		        $isotope.isotope({ filter: type });
		    };

		    $isotope.isotope({
		        itemSelector: '.isotope-item',
		        layoutMode: 'masonry'
		    });

		    $(this).on('change', filter);
		    filter();
		})
;

$(document).ready(function () {
    if ($(".js-mansory").length != 0) {
        var $container = $('.js-mansory');
        var $menu = $("#menu-mansory");
        $("img.lazyMansory").lazyload({
            effect: 'fadeIn',
            effectspeed: 1000,
            threshold: 200,
            load: function () {
                $container.isotope({
                    itemSelector: '.item',
                    percentPosition: true,
                    masonry: {
                        
                    },

                }).imagesLoaded(function () {
                    $container.masonry();
                });
                $menu.on('click', 'a', function (e) {
                    e.preventDefault();
                    var filterValue = $(this).attr('data-filter');
                    if (filterValue == 'all') {
                        $container.isotope({ filter: '.item' });
                    } else {
                        $container.isotope({ filter: '.' + filterValue });
                    }
                });
            }
        });
       
    }
    if ($(".nice-scroll").length >= 1) {
        $('.nice-scroll').perfectScrollbar({
            wheelSpeed: 0.3
        });
    }
    if ($(".accordion-news").length >= 1) {
        $('.accordion-content').hide();
        $('.accordion-news .accordion-title:nth-child(1)').addClass("open");
        $('.accordion-news .accordion-content:nth-child(2)').show();
        $('.accordion-news').on('click', '.accordion-title', function () {
            var open = $('.accordion-news .accordion-title');
            var openActive = $('.accordion-news .accordion-title.open');
            if (open.hasClass('open')) {
                open.removeClass('open');
            }
            $(this).addClass('open').next().slideDown(200).siblings('.accordion-content').slideUp(300);
        });
    }
    if ($("#header-main").length >= 1) {
        $(window).scroll(function () {
            var n = $(".navi-head").height();
            if ($(window).scrollTop() > n) {
                $("#header-main").addClass("active");
            }
            else $("#header-main").removeClass("active");
        });
    };
    if ($(".menu-cate").length >= 1) {
        $(window).scroll(function () {
            var n = $(".banner-sec").height();
            if ($(window).scrollTop() > n) {
                $(".menu-cate").addClass("fixed");
               
            }
            else $(".menu-cate").removeClass("fixed");
        });
    };
});




//Scroll Top
$(function cusScrollTop() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollTop').fadeIn(200);
        } else {
            $('#scrollTop').fadeOut(200);
        }
    });
    $('#scrollTop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);

    });
});

function ResizeWindows() {
    var Yheight = $(window).height();
    var Xwidth = $(window).width();
    if (Xwidth < 800) {
        //Menu Sidebar Mobie effect
        $(document).ready(function () {
            var overlay = $('.sidebar-overlay');
            $('.sidebar-toggle').on('click', function () {
                var sidebar = $('#sidebar');
                sidebar.toggleClass('open');
                overlay.addClass('active');
            });
            overlay.on('click', function () {
                $(this).removeClass('active');
                $('#sidebar').removeClass('open');
            });

            if ($(".nav-mobie").length) {
                $('.nav-mobie li.has-sub>.a-open-down').on('click', function () {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp();
                    }
                    else {
                        element.addClass('open');
                        element.children('ul').slideDown();
                        element.siblings('li').children('ul').slideUp();
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp();
                    }
                });
            }
        });
        searchMobie();
        if ($(".js-mmenu").length) {
            mMenu();
        }
    }
    if (Xwidth > 800) {
        /*Open Navi Sroll Sticker------------------------------------*/


    }
}

window.onorientationchange = ResizeWindows;
$(window).resize(function () {
    ResizeWindows();
});

function Done() {
    ResizeWindows(),
    $(".loading-wrap").fadeOut(500);
};

$(document).ready(function () {
    Done();
});