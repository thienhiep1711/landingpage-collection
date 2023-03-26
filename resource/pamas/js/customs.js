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

$(document).ready(function () {
    $("#frmBox").validate({
        rules: {
            rgName: {
                required: true
            },
            rgEmail: {
                required: true,
                email: true,
            },
            rgPhone: {
                required: true,
                minlength: 10,
                maxlength: 12,
                number: true,
            },
            rgService: {
                required: true,
            },
            rgText: {
                required: true
            },

        },
        messages: {
            rgName: {
                required: "Nhập Tên Của Bạn !",
            },
            rgService: {
                required: "Nhập dịch vụ bạn cần tư vấn",
            },
            rgEmail: {
                required: "Email không được để trống",
                email: "Email không đúng định dạng"
            },
            rgPhone: {
                required: "Bạn cần nhập Số điện thoại",
                minlength: "Số điện thoại tối thiểu 10 số",
                maxlength: "Số điện thoại tối đa 12 số",
                number: "Bạn cần nhập chữ số"
            },
            rgText: {
                required: "Nhập nội dung !",
            },
          
        },
        submitHandler: function () {
            $.fancybox.open({
                src: '#popupThanks',
                type: 'inline',
                afterShow: function () {
                    setTimeout(function () {
                        $.fancybox.close();
                    }, 100000);
                },
            });

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


$(document).ready(function () {
    var overlay = $(".sidebar-overlay");
    var sidebar = $("#sidebar");
    var wrapper = $("#wrapper");
    var iconSidebar = $("#sidebar-icon");

    $("#sidebar-toggle").on('click', function () {
        iconSidebar.toggleClass("active");
        sidebar.toggleClass("open");
        wrapper.toggleClass("open-sidebar");
        overlay.toggleClass("active");
    });
    overlay.on('click', function () {
        $(this).removeClass('active');
        sidebar.removeClass('open');
        wrapper.removeClass('open-sidebar');
        iconSidebar.removeClass("active");
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

$(function () {
    var shrinkHeader = 300;
    $(window).scroll(function () {
        var scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) {
            $('#header-main').addClass('fixed');
            $('.hotline-sticky-wrap').addClass('active');
        }
        else {
            $('#header-main').removeClass('fixed');
            $('.hotline-sticky-wrap').removeClass('active');
        }
    });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
});


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
    var hHeaderMobie = $('#header-sidebar').height();
    var overlayPage = $('#overlay');
    $(document).ready(function () {
        $('.button-call-search').on('click', function () {
            $(".boxMobieSearch").addClass("open");
            overlayPage.fadeIn();
            $('#iptSearchMobie').blur(function () {
                $('#iptSearchMobie').focus();
            });
        });
        $('.cogLangguage').on('click', function () {
            $(".cogLangguage .head-lang").addClass("open");
            overlayPage.fadeIn();
        });
        overlayPage.on('click', function () {
            $(".boxMobieSearch").removeClass("open");
            $(".cogLangguage .head-lang").removeClass("open");
            overlayPage.fadeOut();
        });

    });
};

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

$('.video-youtube').fancybox({
    youtube: {
        controls: 0,
        showinfo: 0
    },
});


function component() {
    //$(document).ready(function () {
    //    $("#mainMenu li.m-no-relative").mouseenter(function() {
    //        $("#mainMenu .mega-sub > li:first-child").addClass("active");
    //    })
    //    $("#mainMenu li.m-no-relative").mouseleave(function () {
    //        $("#mainMenu .mega-sub > li:first-child").removeClass("active");
    //        $("#mainMenu .mega-sub > li").removeClass("active");
    //    })
    //    $("#mainMenu .mega-sub > li").mouseenter(function () {
    //        $("#mainMenu .mega-sub > li").removeClass("active");
    //        $(this).addClass("active");
    //    })
    //});
    $(document).ready(function () {
        debugger
        $("#js-slider-main").owlCarousel({
            nav: false,
            navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
            items: 1,
            lazyLoad: true,
            autoHeight: true,
            loop: true,
            responsive: {
                0: {
                    dots: false,
                },
                480: {
                    dots: false,
                },
                768: {
                    dots: false,
                },
               
            }
        });
    });
    $(document).ready(function () {
        $("#js-slider-video").owlCarousel({
            nav: true,
            navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
            items: 1,
            lazyLoad: true,
            autoHeight: true,
            loop: true,
            dots: false,
        });
    });
    $(document).ready(function () {
        var $tabs = $('.callTabsHoz');
        $tabs.responsiveTabs({
            rotate: false,
            collapsible: "tabs",
            setHash: true,
            animation: 'slide',
        });

    });

    $(document).ready(function () {
        $("#js-slider-award").owlCarousel({
            nav: true,
            navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
            items: 4,
            lazyLoad: true,
            autoHeight: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 2,
                    nav: false,
                    dots: false,
                },
                480: {
                    items: 3,
                },
                768: {
                    items: 4,
                },
                1024: {
                    items: 4,
                },
            }
        });
    });

    $(document).ready(function () {
        $("#js-slider-service").owlCarousel({
            nav: true,
            navText: ["<i class='icon ion-ios-arrow-left'></i>", "<i class='icon ion-ios-arrow-right'></i>"],
            items: 2,
            lazyLoad: true,
            autoHeight: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 2,
                    nav: false,
                    dots: false,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                1024: {
                    items: 2,
                },
            }
        });
    });
    if ($(".bcg-parallax").length != 0) {
        $(document).ready(function () {
            //Init ScrollMagic
            var controller = new ScrollMagic.Controller();
            //paralax scene
            var parallaxTl = new TimelineMax();
            parallaxTl
                //.from('.bcg-content', 0.4, { autoAlpha: 0, ease: Power0.easeNone },0.4)
                .from('.bcg', 2, { y: '50%', ease: Power0.easeNone }, 0);

            var slideParallaxScene = new ScrollMagic.Scene({
                triggerElement: '.bcg-parallax',
                triggerHook: 1,
                duration: "100%"
            })

            .setTween(parallaxTl)
            .addTo(controller)
            //loop
            $('.project').each(function () {
                //build scene
                var ourScene = new ScrollMagic.Scene({
                    triggerElement: this,
                    duration: '100%',
                    triggerHook: 0.9,
                })
                .setClassToggle(this, 'fade-in')

                  .addTo(controller)
            })

        });
    };
    $(document).ready(function () {
        $('.cricle-skinrebon .child-skinrebon').mouseenter(function () {
            var textHtml = $(this).find('.tool-tip').html();
            $('.cricle-skinrebon').find(".text").html("");
            setTimeout(function() {
                $('.cricle-skinrebon .text').removeClass('animated flipInX');
            }, 500);
            $('.cricle-skinrebon .text').addClass('animated flipInX');
            $('.cricle-skinrebon').find(".text").append(textHtml);
        })
    });

    $(document).ready(function () {
        $('.icon-cate-prl > a').mouseenter(function () {
            $('.icon-cate-prl > a').removeClass("active");
            var textHtml = $(this).find('.ct-text-prl').html();
            $(this).addClass("active");
            $('.context-prl').find(".text-prl").html("");
            setTimeout(function () {
                $('.context-prl .text-prl').removeClass('animated flipInX');
            }, 500);
            $('.context-prl .text-prl').addClass('animated flipInX');
            $('.context-prl').find(".text-prl").append(textHtml);
        })
    });

    $('.item-href').on('click', function (event) {
        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 0
            }, 1000);
        }
    });
    if ($(".js-mansory").length != 0) {
        var i = $('.js-mansory');
        var n = $("#menu-mansory");
        $("img.lazyMansory").lazyload({
            effect: 'fadeIn',
            effectspeed: 500,
            threshold: 200,
            load: function () {
                i.isotope({
                    itemSelector: '.item',
                    percentPosition: true,
                    masonry: {},

                }).imagesLoaded(function () {
                    i.masonry();
                });
                n.on("click", "a", function (b) {
                    b.preventDefault();
                    var e = $($(this).parents("ul").data("filter-grid")),
                    f = $(this).attr("data-filter");
                    return e.isotope({
                        filter: f
                    }), $(this).parents("ul").find(".active").removeClass("active"), $(this).parent("li").addClass("active"), !1
                })
            }
        });
    }

    $(document).ready(function () {
        $(function () {
            $('.accordion-content').hide();
            $('.accordion h3').addClass("open");
            $('.accordion .accordion-content').show();
            $('.accordion').on('click', 'h3', function () {
                var open = $('.accordion h3');
                var openActive = $('.accordion h3.open');
                if (open.hasClass('open')) {
                    open.removeClass('open');
                }
                $(this).addClass('open').next().slideDown(200).siblings('.accordion-content').slideUp(300);
            });
        });
    });


};



function afterLoad() {
    $("#loading-wrap").fadeOut(500);
};


function ResizeWindows() {
    var Yheight = $(window).height();
    var Xwidth = $(window).width();
    var Portrait = $(window).height() > $(window).width();
    var Landscape = $(window).height() <= $(window).width();

    if (Xwidth < 1025) {

        //Search mobie 
        searchMobie();

        if ($(".js-mmenu").length != 0) {
            mMenu();
        };
    };

    if (Xwidth > 800) {

    };
};



window.onorientationchange = ResizeWindows;
$(window).resize(function () {
    ResizeWindows();
});
ResizeWindows();

function Done() {
    ResizeWindows(),
    component()
};

$(document).ready(function () {
    Done();
});
