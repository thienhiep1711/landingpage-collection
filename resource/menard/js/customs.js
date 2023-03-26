function cusMagnificPopup() {
    $(document).ready(function () {
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

cusMagnificPopup();
//mmMenu-----------------
function mMenu() {
    var $menu = $("#mainMenu").clone();
    $menu.attr("id", "my-mobile-menu");
    $menu.mmenu({
      
    }); 
};
mMenu();
function sliderAll() {
    $(document).ready(function () {
        //Slider main
        

        //Slider casure
        $(".slider-pro").owlCarousel({
            items: 3,
            itemsCustom: false,
            itemsDesktop: [1105, 3],
            itemsDesktopSmall: [1024, 3],
            itemsTablet: [768, 2],
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

function ResizeWindows() {
    var Yheight = $(window).height();
    var Xwidth = $(window).width();
    var Portrait = $(window).height() > $(window).width();
    var Landscape = $(window).height() <= $(window).width();
    var RatioScreeen = Yheight / Xwidth;
    var RatioIMG = 744 / 1366;
    var newXwidth;
    var newYheight;

    var overlayPage = $('#overlay');

    if (Xwidth < 800) {
        $(function searchMobie() {
            var hHeaderMobie = $('#header-sidebar').height();


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

        });


    }

    if (Xwidth < 800) {
        $('#mainMenu-mobie ul li a[href^="#"]').on('click', function (event) {

            var target = $($(this).attr('href'));

            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 30
                }, 1000);
            }

        });
    }

    if (Xwidth > 800) {

        $(document).ready(function () {
            var hHeaderMain = $('#header-main').height();
            $(window).bind('scroll', function () {
                var offset = $(document).scrollTop();
                if (offset > (hHeaderMain + 200)) {
                    $('#header-main').addClass('active');
                    // Cache selectors
                    var idCurrent,
                        menuScroll = $("#mainMenu"),
                        menuScrollHeight = menuScroll.outerHeight() + 0,
                        // All list items
                        menuScrollItem = menuScroll.find("a"),
                        // Anchors corresponding to menu items
                        scrollItems = menuScrollItem.map(function () {
                            var item = $($(this).attr("href"));
                            if (item.length) { return item; }

                        });

                    // Bind click handler to menu items
                    // so we can get a fancy scroll animation
                    menuScrollItem.click(function (e) {
                        var href = $(this).attr("href"),
                            offsetTop = href === "#" ? 0 : $(href).offset().top - menuScrollHeight + 1;
                        $('html, body').stop().animate({
                            scrollTop: offsetTop - 30
                        }, 1000);
                        e.preventDefault();

                    });

                    // Bind to scroll
                    $(window).scroll(function () {
                        // Get container scroll position
                        var fromTop = $(this).scrollTop() + menuScrollHeight;

                        // Get id of current scroll item
                        var cur = scrollItems.map(function () {
                            if ($(this).offset().top < fromTop)
                                return this;
                        });
                        // Get the id of the current element
                        cur = cur[cur.length - 1];
                        var id = cur && cur.length ? cur[0].id : "";

                        if (idCurrent !== id) {
                            idCurrent = id;
                            // Set/remove active class
                            menuScrollItem
                              .parent().removeClass("active")
                              .end().filter("[href='#" + id + "']").parent().addClass("active");
                        }
                    });




                } else if (offset < (hHeaderMain + 200)) {
                    $('#header-main').removeClass('active');

                }
            });

        });
        $(document).ready(function () {
            $(window).bind('scroll', function () {
                // Cache selectors
                var idCurrent,
                    menuScroll = $("#mainMenu"),
                    menuScrollHeight = menuScroll.outerHeight() + 0,
                    // All list items
                    menuScrollItem = menuScroll.find("a"),
                    // Anchors corresponding to menu items
                    scrollItems = menuScrollItem.map(function () {
                        var item = $($(this).attr("href"));
                        if (item.length) { return item; }

                    });
                // Bind click handler to menu items
                // so we can get a fancy scroll animation
                menuScrollItem.click(function (e) {
                    var href = $(this).attr("href"),
                        offsetTop = href === "#" ? 0 : $(href).offset().top - menuScrollHeight + 1;
                    $('html, body').stop().animate({
                        scrollTop: offsetTop + 0
                    }, 1000);
                    e.preventDefault();

                });

                // Bind to scroll
                $(window).scroll(function () {
                    // Get container scroll position
                    var fromTop = $(this).scrollTop() + menuScrollHeight;

                    // Get id of current scroll item
                    var cur = scrollItems.map(function () {
                        if ($(this).offset().top < fromTop)
                            return this;
                    });
                    // Get the id of the current element
                    cur = cur[cur.length - 1];
                    var id = cur && cur.length ? cur[0].id : "";

                    if (idCurrent !== id) {
                        idCurrent = id;
                        // Set/remove active class
                        menuScrollItem
                          .parent().removeClass("active")
                          .end().filter("[href='#" + id + "']").parent().addClass("active");
                    }
                });
            });

        });
    }
}
$('.move-link').on('click', function (event) {
    var target = $($(this).attr('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top - 100
        }, 1000);
    }
});


function callPopup(el) {
    $.magnificPopup.open({
        items: {
            src: '#popupRegister',
            type: 'inline',
        },
    });
}

AOS.init({
    easing: 'ease-in-out-sine'
});


window.onorientationchange = ResizeWindows;
$(window).resize(function () {
    ResizeWindows();
});
ResizeWindows();
//Menu Sidebar Mobie effect
$("img.lazyImg").lazyload({
    effect: "fadeIn"
});

//Scroll Top
function cusScrollTop () {
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
};
cusScrollTop();

