(function (factory) {
    typeof define === 'function' && define.amd ? define('jqueryFancyboxMin', factory) :
    factory();
}((function () { 'use strict';

    // ==================================================

    (function (window, document, $, undefined$1) {
      // =========================================

      if (!$) {
        return;
      } // Check if fancyBox is already initialized
      // ========================================


      if ($.fn.fancybox) {
        if ('console' in window) {
          console.log('fancyBox already initialized');
        }

        return;
      } // Private default settings
      // ========================


      var defaults = {
        // Enable infinite gallery navigation
        loop: false,
        // Space around image, ignored if zoomed-in or viewport width is smaller than 800px
        margin: [44, 0],
        // Horizontal space between slides
        gutter: 50,
        // Enable keyboard navigation
        keyboard: true,
        // Should display navigation arrows at the screen edges
        arrows: true,
        // Should display infobar (counter and arrows at the top)
        infobar: true,
        // Should display toolbar (buttons at the top)
        toolbar: true,
        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons: ['slideShow', 'fullScreen', 'thumbs', 'share', //'download',
        //'zoom',
        'close'],
        // Detect "idle" time in seconds
        idleTime: 3,
        // Should display buttons at top right corner of the content
        // If 'auto' - they will be created for content having type 'html', 'inline' or 'ajax'
        // Use template from `btnTpl.smallBtn` for customization
        smallBtn: 'auto',
        // Disable right-click and use simple image protection for images
        protect: false,
        // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
        modal: false,
        image: {
          // Wait for images to load before displaying
          // Requires predefined image dimensions
          // If 'auto' - will zoom in thumbnail if 'width' and 'height' attributes are found
          preload: "auto"
        },
        ajax: {
          // Object containing settings for ajax request
          settings: {
            // This helps to indicate that request comes from the modal
            // Feel free to change naming
            data: {
              fancybox: true
            }
          }
        },
        iframe: {
          // Iframe template
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
          // Preload iframe before displaying it
          // This allows to calculate iframe content width and height
          // (note: Due to "Same Origin Policy", you can't get cross domain data).
          preload: true,
          // Custom CSS styling for iframe wrapping element
          // You can use this to set custom iframe dimensions
          css: {},
          // Iframe tag attributes
          attr: {
            scrolling: 'auto'
          }
        },
        // Default content type if cannot be detected automatically
        defaultType: 'image',
        // Open/close animation type
        // Possible values:
        //   false            - disable
        //   "zoom"           - zoom images from/to thumbnail
        //   "fade"
        //   "zoom-in-out"
        //
        animationEffect: "zoom",
        // Duration in ms for open/close animation
        animationDuration: 500,
        // Should image change opacity while zooming
        // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
        zoomOpacity: "auto",
        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect: "fade",
        // Duration in ms for transition animation
        transitionDuration: 366,
        // Custom CSS class for slide element
        slideClass: '',
        // Custom CSS class for layout
        baseClass: '',
        // Base template for layout
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-infobar">' + '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' + '</div>' + '<div class="fancybox-toolbar">{{buttons}}</div>' + '<div class="fancybox-navigation">{{arrows}}</div>' + '<div class="fancybox-stage"></div>' + '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' + '</div>' + '</div>',
        // Loading indicator template
        spinnerTpl: '<div class="fancybox-loading"></div>',
        // Error message template
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
        btnTpl: {
          download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" />' + '</svg>' + '</a>',
          zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" />' + '</svg>' + '</button>',
          close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M10,10 L30,30 M30,10 L10,30" />' + '</svg>' + '</button>',
          // This small close button will be appended to your html/inline/ajax content by default,
          // if "smallBtn" option is not set to false
          smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
          // Arrows
          arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path>' + '</svg>' + '</button>',
          arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path>' + '</svg>' + '</button>'
        },
        // Container is injected into this element
        parentEl: 'body',
        // Focus handling
        // ==============
        // Try to focus on the first focusable element after opening
        autoFocus: false,
        // Put focus back to active element after closing
        backFocus: true,
        // Do not let user to focus on element outside modal content
        trapFocus: true,
        // Module specific options
        // =======================
        fullScreen: {
          autoStart: false
        },
        // Set `touch: false` to disable dragging/swiping
        touch: {
          vertical: true,
          // Allow to drag content vertically
          momentum: true // Continue movement after releasing mouse/touch when panning

        },
        // Hash value when initializing manually,
        // set `false` to disable hash change
        hash: null,
        // Customize or add new media types
        // Example:

        /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
        media: {},
        slideShow: {
          autoStart: false,
          speed: 4000
        },
        thumbs: {
          autoStart: false,
          // Display thumbnails on opening
          hideOnClose: true,
          // Hide thumbnail grid when closing animation starts
          parentEl: '.fancybox-container',
          // Container is injected into this element
          axis: 'y' // Vertical (y) or horizontal (x) scrolling

        },
        // Use mousewheel to navigate gallery
        // If 'auto' - enabled for images only
        wheel: 'auto',
        // Callbacks
        //==========
        // See Documentation/API/Events for more information
        // Example:

        /*
            afterShow: function( instance, current ) {
                 console.info( 'Clicked element:' );
                 console.info( current.opts.$orig );
            }
        */
        onInit: $.noop,
        // When instance has been initialized
        beforeLoad: $.noop,
        // Before the content of a slide is being loaded
        afterLoad: $.noop,
        // When the content of a slide is done loading
        beforeShow: $.noop,
        // Before open animation starts
        afterShow: $.noop,
        // When content is done loading and animating
        beforeClose: $.noop,
        // Before the instance attempts to close. Return false to cancel the close.
        afterClose: $.noop,
        // After instance has been closed
        onActivate: $.noop,
        // When instance is brought to front
        onDeactivate: $.noop,
        // When other instance has been activated
        // Interaction
        // ===========
        // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
        // each option can be string or method that returns value.
        //
        // Possible values:
        //   "close"           - close instance
        //   "next"            - move to next gallery item
        //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
        //   "toggleControls"  - show/hide controls
        //   "zoom"            - zoom image (if loaded)
        //   false             - do nothing
        // Clicked on the content
        clickContent: function clickContent(current, event) {
          return current.type === 'image' ? 'zoom' : false;
        },
        // Clicked on the slide
        clickSlide: 'close',
        // Clicked on the background (backdrop) element
        clickOutside: 'close',
        // Same as previous two, but for double click
        dblclickContent: false,
        dblclickSlide: false,
        dblclickOutside: false,
        // Custom options when mobile device is detected
        // =============================================
        mobile: {
          idleTime: false,
          margin: 0,
          clickContent: function clickContent(current, event) {
            return current.type === 'image' ? 'toggleControls' : false;
          },
          clickSlide: function clickSlide(current, event) {
            return current.type === 'image' ? 'toggleControls' : 'close';
          },
          dblclickContent: function dblclickContent(current, event) {
            return current.type === 'image' ? 'zoom' : false;
          },
          dblclickSlide: function dblclickSlide(current, event) {
            return current.type === 'image' ? 'zoom' : false;
          }
        },
        // Internationalization
        // ============
        lang: 'en',
        i18n: {
          'en': {
            CLOSE: 'Close',
            NEXT: 'Next',
            PREV: 'Previous',
            ERROR: 'The requested content cannot be loaded. <br/> Please try again later.',
            PLAY_START: 'Start slideshow',
            PLAY_STOP: 'Pause slideshow',
            FULL_SCREEN: 'Full screen',
            THUMBS: 'Thumbnails',
            DOWNLOAD: 'Download',
            SHARE: 'Share',
            ZOOM: 'Zoom'
          },
          'de': {
            CLOSE: 'Schliessen',
            NEXT: 'Weiter',
            PREV: 'Zurück',
            ERROR: 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
            PLAY_START: 'Diaschau starten',
            PLAY_STOP: 'Diaschau beenden',
            FULL_SCREEN: 'Vollbild',
            THUMBS: 'Vorschaubilder',
            DOWNLOAD: 'Herunterladen',
            SHARE: 'Teilen',
            ZOOM: 'Maßstab'
          }
        }
      }; // Few useful variables and methods
      // ================================

      var $W = $(window);
      var $D = $(document);
      var called = 0; // Check if an object is a jQuery object and not a native JavaScript object
      // ========================================================================

      var isQuery = function isQuery(obj) {
        return obj && obj.hasOwnProperty && obj instanceof $;
      }; // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
      // ===============================================================================


      var requestAFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
        function (callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
      }(); // Detect the supported transition-end event property name
      // =======================================================


      var transitionEnd = function () {
        var t,
            el = document.createElement("fakeelement");
        var transitions = {
          "transition": "transitionend",
          "OTransition": "oTransitionEnd",
          "MozTransition": "transitionend",
          "WebkitTransition": "webkitTransitionEnd"
        };

        for (t in transitions) {
          if (el.style[t] !== undefined$1) {
            return transitions[t];
          }
        }

        return 'transitionend';
      }(); // Force redraw on an element.
      // This helps in cases where the browser doesn't redraw an updated element properly.
      // =================================================================================


      var forceRedraw = function forceRedraw($el) {
        return $el && $el.length && $el[0].offsetHeight;
      }; // Class definition
      // ================


      var FancyBox = function FancyBox(content, opts, index) {
        var self = this;
        self.opts = $.extend(true, {
          index: index
        }, $.fancybox.defaults, opts || {});

        if ($.fancybox.isMobile) {
          self.opts = $.extend(true, {}, self.opts, self.opts.mobile);
        } // Exclude buttons option from deep merging


        if (opts && $.isArray(opts.buttons)) {
          self.opts.buttons = opts.buttons;
        }

        self.id = self.opts.id || ++called;
        self.group = [];
        self.currIndex = parseInt(self.opts.index, 10) || 0;
        self.prevIndex = null;
        self.prevPos = null;
        self.currPos = 0;
        self.firstRun = null; // Create group elements from original item collection

        self.createGroup(content);

        if (!self.group.length) {
          return;
        } // Save last active element and current scroll position


        self.$lastFocus = $(document.activeElement).blur(); // Collection of gallery objects

        self.slides = {};
        self.init();
      };

      $.extend(FancyBox.prototype, {
        // Create DOM structure
        // ====================
        init: function init() {
          var self = this,
              firstItem = self.group[self.currIndex],
              firstItemOpts = firstItem.opts,
              scrollbarWidth = $.fancybox.scrollbarWidth,
              $scrollDiv,
              $container,
              buttonStr;
          self.scrollTop = $D.scrollTop();
          self.scrollLeft = $D.scrollLeft(); // Hide scrollbars
          // ===============

          if (!$.fancybox.getInstance()) {
            $('body').addClass('fancybox-active'); // iOS hack

            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
              // iOS has problems for input elements inside fixed containers,
              // the workaround is to apply `position: fixed` to `<body>` element,
              // unfortunately, this makes it lose the scrollbars and forces address bar to appear.
              if (firstItem.type !== 'image') {
                $('body').css('top', $('body').scrollTop() * -1).addClass('fancybox-iosfix');
              }
            } else if (!$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
              if (scrollbarWidth === undefined$1) {
                $scrollDiv = $('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo('body');
                scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;
                $scrollDiv.remove();
              }

              $('head').append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + scrollbarWidth + 'px; }</style>');
              $('body').addClass('compensate-for-scrollbar');
            }
          } // Build html markup and set references
          // ====================================
          // Build html code for buttons and insert into main template


          buttonStr = '';
          $.each(firstItemOpts.buttons, function (index, value) {
            buttonStr += firstItemOpts.btnTpl[value] || '';
          }); // Create markup from base template, it will be initially hidden to
          // avoid unnecessary work like painting while initializing is not complete

          $container = $(self.translate(self, firstItemOpts.baseTpl.replace('\{\{buttons\}\}', buttonStr).replace('\{\{arrows\}\}', firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight))).attr('id', 'fancybox-container-' + self.id).addClass('fancybox-is-hidden').addClass(firstItemOpts.baseClass).data('FancyBox', self).appendTo(firstItemOpts.parentEl); // Create object holding references to jQuery wrapped nodes

          self.$refs = {
            container: $container
          };
          ['bg', 'inner', 'infobar', 'toolbar', 'stage', 'caption', 'navigation'].forEach(function (item) {
            self.$refs[item] = $container.find('.fancybox-' + item);
          });
          self.trigger('onInit'); // Enable events, deactive previous instances

          self.activate(); // Build slides, load and reveal content

          self.jumpTo(self.currIndex);
        },
        // Simple i18n support - replaces object keys found in template
        // with corresponding values
        // ============================================================
        translate: function translate(obj, str) {
          var arr = obj.opts.i18n[obj.opts.lang];
          return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
            var value = arr[n];

            if (value === undefined$1) {
              return match;
            }

            return value;
          });
        },
        // Create array of gally item objects
        // Check if each object has valid type and content
        // ===============================================
        createGroup: function createGroup(content) {
          var self = this;
          var items = $.makeArray(content);
          $.each(items, function (i, item) {
            var obj = {},
                opts = {},
                $item,
                type,
                src,
                srcParts; // Step 1 - Make sure we have an object
            // ====================================

            if ($.isPlainObject(item)) {
              // We probably have manual usage here, something like
              // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )
              obj = item;
              opts = item.opts || item;
            } else if ($.type(item) === 'object' && $(item).length) {
              // Here we probably have jQuery collection returned by some selector
              $item = $(item);
              opts = $item.data();
              opts = $.extend({}, opts, opts.options || {}); // Here we store clicked element

              opts.$orig = $item;
              obj.src = opts.src || $item.attr('href'); // Assume that simple syntax is used, for example:
              //   `$.fancybox.open( $("#test"), {} );`

              if (!obj.type && !obj.src) {
                obj.type = 'inline';
                obj.src = item;
              }
            } else {
              // Assume we have a simple html code, for example:
              //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
              obj = {
                type: 'html',
                src: item + ''
              };
            } // Each gallery object has full collection of options


            obj.opts = $.extend(true, {}, self.opts, opts); // Do not merge buttons array

            if ($.isArray(opts.buttons)) {
              obj.opts.buttons = opts.buttons;
            } // Step 2 - Make sure we have content type, if not - try to guess
            // ==============================================================


            type = obj.type || obj.opts.type;
            src = obj.src || '';

            if (!type && src) {
              if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
                type = 'image';
              } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
                type = 'pdf';
              } else if (src.charAt(0) === '#') {
                type = 'inline';
              }
            }

            if (type) {
              obj.type = type;
            } else {
              self.trigger('objectNeedsType', obj);
            } // Step 3 - Some adjustments
            // =========================


            obj.index = self.group.length; // Check if $orig and $thumb objects exist

            if (obj.opts.$orig && !obj.opts.$orig.length) {
              delete obj.opts.$orig;
            }

            if (!obj.opts.$thumb && obj.opts.$orig) {
              obj.opts.$thumb = obj.opts.$orig.find('img:first');
            }

            if (obj.opts.$thumb && !obj.opts.$thumb.length) {
              delete obj.opts.$thumb;
            } // "caption" is a "special" option, it can be used to customize caption per gallery item ..


            if ($.type(obj.opts.caption) === 'function') {
              obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
            }

            if ($.type(self.opts.caption) === 'function') {
              obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
            } // Make sure we have caption as a string or jQuery object


            if (!(obj.opts.caption instanceof $)) {
              obj.opts.caption = obj.opts.caption === undefined$1 ? '' : obj.opts.caption + '';
            } // Check if url contains "filter" used to filter the content
            // Example: "ajax.html #something"


            if (type === 'ajax') {
              srcParts = src.split(/\s+/, 2);

              if (srcParts.length > 1) {
                obj.src = srcParts.shift();
                obj.opts.filter = srcParts.shift();
              }
            }

            if (obj.opts.smallBtn == 'auto') {
              if ($.inArray(type, ['html', 'inline', 'ajax']) > -1) {
                obj.opts.toolbar = false;
                obj.opts.smallBtn = true;
              } else {
                obj.opts.smallBtn = false;
              }
            } // If the type is "pdf", then simply load file into iframe


            if (type === 'pdf') {
              obj.type = 'iframe';
              obj.opts.iframe.preload = false;
            } // Hide all buttons and disable interactivity for modal items


            if (obj.opts.modal) {
              obj.opts = $.extend(true, obj.opts, {
                // Remove buttons
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                // Disable keyboard navigation
                keyboard: 0,
                // Disable some modules
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                // Disable click event handlers
                clickContent: false,
                clickSlide: false,
                clickOutside: false,
                dblclickContent: false,
                dblclickSlide: false,
                dblclickOutside: false
              });
            } // Step 4 - Add processed object to group
            // ======================================


            self.group.push(obj);
          });
        },
        // Attach an event handler functions for:
        //   - navigation buttons
        //   - browser scrolling, resizing;
        //   - focusing
        //   - keyboard
        //   - detect idle
        // ======================================
        addEvents: function addEvents() {
          var self = this;
          self.removeEvents(); // Make navigation elements clickable

          self.$refs.container.on('click.fb-close', '[data-fancybox-close]', function (e) {
            e.stopPropagation();
            e.preventDefault();
            self.close(e);
          }).on('click.fb-prev touchend.fb-prev', '[data-fancybox-prev]', function (e) {
            e.stopPropagation();
            e.preventDefault();
            self.previous();
          }).on('click.fb-next touchend.fb-next', '[data-fancybox-next]', function (e) {
            e.stopPropagation();
            e.preventDefault();
            self.next();
          }).on('click.fb', '[data-fancybox-zoom]', function (e) {
            // Click handler for zoom button
            self[self.isScaledDown() ? 'scaleToActual' : 'scaleToFit']();
          }); // Handle page scrolling and browser resizing

          $W.on('orientationchange.fb resize.fb', function (e) {
            if (e && e.originalEvent && e.originalEvent.type === "resize") {
              requestAFrame(function () {
                self.update();
              });
            } else {
              self.$refs.stage.hide();
              setTimeout(function () {
                self.$refs.stage.show();
                self.update();
              }, 600);
            }
          }); // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
          // (a.k.a. "escaping the modal")

          $D.on('focusin.fb', function (e) {
            var instance = $.fancybox ? $.fancybox.getInstance() : null;

            if (instance.isClosing || !instance.current || !instance.current.opts.trapFocus || $(e.target).hasClass('fancybox-container') || $(e.target).is(document)) {
              return;
            }

            if (instance && $(e.target).css('position') !== 'fixed' && !instance.$refs.container.has(e.target).length) {
              e.stopPropagation();
              instance.focus(); // Sometimes page gets scrolled, set it back

              $W.scrollTop(self.scrollTop).scrollLeft(self.scrollLeft);
            }
          }); // Enable keyboard navigation

          $D.on('keydown.fb', function (e) {
            var current = self.current,
                keycode = e.keyCode || e.which;

            if (!current || !current.opts.keyboard) {
              return;
            }

            if ($(e.target).is('input') || $(e.target).is('textarea')) {
              return;
            } // Backspace and Esc keys


            if (keycode === 8 || keycode === 27) {
              e.preventDefault();
              self.close(e);
              return;
            } // Left arrow and Up arrow


            if (keycode === 37 || keycode === 38) {
              e.preventDefault();
              self.previous();
              return;
            } // Righ arrow and Down arrow


            if (keycode === 39 || keycode === 40) {
              e.preventDefault();
              self.next();
              return;
            }

            self.trigger('afterKeydown', e, keycode);
          }); // Hide controls after some inactivity period

          if (self.group[self.currIndex].opts.idleTime) {
            self.idleSecondsCounter = 0;
            $D.on('mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle', function (e) {
              self.idleSecondsCounter = 0;

              if (self.isIdle) {
                self.showControls();
              }

              self.isIdle = false;
            });
            self.idleInterval = window.setInterval(function () {
              self.idleSecondsCounter++;

              if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
                self.isIdle = true;
                self.idleSecondsCounter = 0;
                self.hideControls();
              }
            }, 1000);
          }
        },
        // Remove events added by the core
        // ===============================
        removeEvents: function removeEvents() {
          var self = this;
          $W.off('orientationchange.fb resize.fb');
          $D.off('focusin.fb keydown.fb .fb-idle');
          this.$refs.container.off('.fb-close .fb-prev .fb-next');

          if (self.idleInterval) {
            window.clearInterval(self.idleInterval);
            self.idleInterval = null;
          }
        },
        // Change to previous gallery item
        // ===============================
        previous: function previous(duration) {
          return this.jumpTo(this.currPos - 1, duration);
        },
        // Change to next gallery item
        // ===========================
        next: function next(duration) {
          return this.jumpTo(this.currPos + 1, duration);
        },
        // Switch to selected gallery item
        // ===============================
        jumpTo: function jumpTo(pos, duration, slide) {
          var self = this,
              firstRun,
              loop,
              current,
              previous,
              canvasWidth,
              currentPos,
              transitionProps;
          var groupLen = self.group.length;

          if (self.isDragging || self.isClosing || self.isAnimating && self.firstRun) {
            return;
          }

          pos = parseInt(pos, 10);
          loop = self.current ? self.current.opts.loop : self.opts.loop;

          if (!loop && (pos < 0 || pos >= groupLen)) {
            return false;
          }

          firstRun = self.firstRun = self.firstRun === null;

          if (groupLen < 2 && !firstRun && !!self.isDragging) {
            return;
          }

          previous = self.current;
          self.prevIndex = self.currIndex;
          self.prevPos = self.currPos; // Create slides

          current = self.createSlide(pos);

          if (groupLen > 1) {
            if (loop || current.index > 0) {
              self.createSlide(pos - 1);
            }

            if (loop || current.index < groupLen - 1) {
              self.createSlide(pos + 1);
            }
          }

          self.current = current;
          self.currIndex = current.index;
          self.currPos = current.pos;
          self.trigger('beforeShow', firstRun);
          self.updateControls();
          currentPos = $.fancybox.getTranslate(current.$slide);
          current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass('fancybox-animated');
          current.forcedDuration = undefined$1;

          if ($.isNumeric(duration)) {
            current.forcedDuration = duration;
          } else {
            duration = current.opts[firstRun ? 'animationDuration' : 'transitionDuration'];
          }

          duration = parseInt(duration, 10); // Fresh start - reveal container, current slide and start loading content

          if (firstRun) {
            if (current.opts.animationEffect && duration) {
              self.$refs.container.css('transition-duration', duration + 'ms');
            }

            self.$refs.container.removeClass('fancybox-is-hidden');
            forceRedraw(self.$refs.container);
            self.$refs.container.addClass('fancybox-is-open'); // Make first slide visible (to display loading icon, if needed)

            current.$slide.addClass('fancybox-slide--current');
            self.loadSlide(current);
            self.preload();
            return;
          } // Clean up


          $.each(self.slides, function (index, slide) {
            $.fancybox.stop(slide.$slide);
          }); // Make current that slide is visible even if content is still loading

          current.$slide.removeClass('fancybox-slide--next fancybox-slide--previous').addClass('fancybox-slide--current'); // If slides have been dragged, animate them to correct position

          if (current.isMoved) {
            canvasWidth = Math.round(current.$slide.width());
            $.each(self.slides, function (index, slide) {
              var pos = slide.pos - current.pos;
              $.fancybox.animate(slide.$slide, {
                top: 0,
                left: pos * canvasWidth + pos * slide.opts.gutter
              }, duration, function () {
                slide.$slide.removeAttr('style').removeClass('fancybox-slide--next fancybox-slide--previous');

                if (slide.pos === self.currPos) {
                  current.isMoved = false;
                  self.complete();
                }
              });
            });
          } else {
            self.$refs.stage.children().removeAttr('style');
          } // Start transition that reveals current content
          // or wait when it will be loaded


          if (current.isLoaded) {
            self.revealContent(current);
          } else {
            self.loadSlide(current);
          }

          self.preload();

          if (previous.pos === current.pos) {
            return;
          } // Handle previous slide
          // =====================


          transitionProps = 'fancybox-slide--' + (previous.pos > current.pos ? 'next' : 'previous');
          previous.$slide.removeClass('fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous');
          previous.isComplete = false;

          if (!duration || !current.isMoved && !current.opts.transitionEffect) {
            return;
          }

          if (current.isMoved) {
            previous.$slide.addClass(transitionProps);
          } else {
            transitionProps = 'fancybox-animated ' + transitionProps + ' fancybox-fx-' + current.opts.transitionEffect;
            $.fancybox.animate(previous.$slide, transitionProps, duration, function () {
              previous.$slide.removeClass(transitionProps).removeAttr('style');
            });
          }
        },
        // Create new "slide" element
        // These are gallery items  that are actually added to DOM
        // =======================================================
        createSlide: function createSlide(pos) {
          var self = this;
          var $slide;
          var index;
          index = pos % self.group.length;
          index = index < 0 ? self.group.length + index : index;

          if (!self.slides[pos] && self.group[index]) {
            $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);
            self.slides[pos] = $.extend(true, {}, self.group[index], {
              pos: pos,
              $slide: $slide,
              isLoaded: false
            });
            self.updateSlide(self.slides[pos]);
          }

          return self.slides[pos];
        },
        // Scale image to the actual size of the image
        // ===========================================
        scaleToActual: function scaleToActual(x, y, duration) {
          var self = this;
          var current = self.current;
          var $what = current.$content;
          var imgPos, posX, posY, scaleX, scaleY;
          var canvasWidth = parseInt(current.$slide.width(), 10);
          var canvasHeight = parseInt(current.$slide.height(), 10);
          var newImgWidth = current.width;
          var newImgHeight = current.height;

          if (!(current.type == 'image' && !current.hasError) || !$what || self.isAnimating) {
            return;
          }

          $.fancybox.stop($what);
          self.isAnimating = true;
          x = x === undefined$1 ? canvasWidth * 0.5 : x;
          y = y === undefined$1 ? canvasHeight * 0.5 : y;
          imgPos = $.fancybox.getTranslate($what);
          scaleX = newImgWidth / imgPos.width;
          scaleY = newImgHeight / imgPos.height; // Get center position for original image

          posX = canvasWidth * 0.5 - newImgWidth * 0.5;
          posY = canvasHeight * 0.5 - newImgHeight * 0.5; // Make sure image does not move away from edges

          if (newImgWidth > canvasWidth) {
            posX = imgPos.left * scaleX - (x * scaleX - x);

            if (posX > 0) {
              posX = 0;
            }

            if (posX < canvasWidth - newImgWidth) {
              posX = canvasWidth - newImgWidth;
            }
          }

          if (newImgHeight > canvasHeight) {
            posY = imgPos.top * scaleY - (y * scaleY - y);

            if (posY > 0) {
              posY = 0;
            }

            if (posY < canvasHeight - newImgHeight) {
              posY = canvasHeight - newImgHeight;
            }
          }

          self.updateCursor(newImgWidth, newImgHeight);
          $.fancybox.animate($what, {
            top: posY,
            left: posX,
            scaleX: scaleX,
            scaleY: scaleY
          }, duration || 330, function () {
            self.isAnimating = false;
          }); // Stop slideshow

          if (self.SlideShow && self.SlideShow.isActive) {
            self.SlideShow.stop();
          }
        },
        // Scale image to fit inside parent element
        // ========================================
        scaleToFit: function scaleToFit(duration) {
          var self = this;
          var current = self.current;
          var $what = current.$content;
          var end;

          if (!(current.type == 'image' && !current.hasError) || !$what || self.isAnimating) {
            return;
          }

          $.fancybox.stop($what);
          self.isAnimating = true;
          end = self.getFitPos(current);
          self.updateCursor(end.width, end.height);
          $.fancybox.animate($what, {
            top: end.top,
            left: end.left,
            scaleX: end.width / $what.width(),
            scaleY: end.height / $what.height()
          }, duration || 330, function () {
            self.isAnimating = false;
          });
        },
        // Calculate image size to fit inside viewport
        // ===========================================
        getFitPos: function getFitPos(slide) {
          var self = this;
          var $what = slide.$content;
          var imgWidth = slide.width;
          var imgHeight = slide.height;
          var margin = slide.opts.margin;
          var canvasWidth, canvasHeight, minRatio, width, height;

          if (!$what || !$what.length || !imgWidth && !imgHeight) {
            return false;
          } // Convert "margin to CSS style: [ top, right, bottom, left ]


          if ($.type(margin) === "number") {
            margin = [margin, margin];
          }

          if (margin.length == 2) {
            margin = [margin[0], margin[1], margin[0], margin[1]];
          } // We can not use $slide width here, because it can have different diemensions while in transiton


          canvasWidth = parseInt(self.$refs.stage.width(), 10) - (margin[1] + margin[3]);
          canvasHeight = parseInt(self.$refs.stage.height(), 10) - (margin[0] + margin[2]);
          minRatio = Math.min(1, canvasWidth / imgWidth, canvasHeight / imgHeight);
          width = Math.floor(minRatio * imgWidth);
          height = Math.floor(minRatio * imgHeight); // Use floor rounding to make sure it really fits

          return {
            top: Math.floor((canvasHeight - height) * 0.5) + margin[0],
            left: Math.floor((canvasWidth - width) * 0.5) + margin[3],
            width: width,
            height: height
          };
        },
        // Update position and content of all slides
        // =========================================
        update: function update() {
          var self = this;
          $.each(self.slides, function (key, slide) {
            self.updateSlide(slide);
          });
        },
        // Update slide position and scale content to fit
        // ==============================================
        updateSlide: function updateSlide(slide) {
          var self = this;
          var $what = slide.$content;

          if ($what && (slide.width || slide.height)) {
            self.isAnimating = false;
            $.fancybox.stop($what);
            $.fancybox.setTranslate($what, self.getFitPos(slide));

            if (slide.pos === self.currPos) {
              self.updateCursor();
            }
          }

          slide.$slide.trigger('refresh');
          self.trigger('onUpdate', slide);
        },
        // Update cursor style depending if content can be zoomed
        // ======================================================
        updateCursor: function updateCursor(nextWidth, nextHeight) {
          var self = this;
          var isScaledDown;
          var $container = self.$refs.container.removeClass('fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut');

          if (!self.current || self.isClosing) {
            return;
          }

          if (self.isZoomable()) {
            $container.addClass('fancybox-is-zoomable');

            if (nextWidth !== undefined$1 && nextHeight !== undefined$1) {
              isScaledDown = nextWidth < self.current.width && nextHeight < self.current.height;
            } else {
              isScaledDown = self.isScaledDown();
            }

            if (isScaledDown) {
              // If image is scaled down, then, obviously, it can be zoomed to full size
              $container.addClass('fancybox-can-zoomIn');
            } else {
              if (self.current.opts.touch) {
                // If image size ir largen than available available and touch module is not disable,
                // then user can do panning
                $container.addClass('fancybox-can-drag');
              } else {
                $container.addClass('fancybox-can-zoomOut');
              }
            }
          } else if (self.current.opts.touch) {
            $container.addClass('fancybox-can-drag');
          }
        },
        // Check if current slide is zoomable
        // ==================================
        isZoomable: function isZoomable() {
          var self = this;
          var current = self.current;
          var fitPos;

          if (!current || self.isClosing) {
            return;
          } // Assume that slide is zoomable if
          //   - image is loaded successfuly
          //   - click action is "zoom"
          //   - actual size of the image is smaller than available area


          if (current.type === 'image' && current.isLoaded && !current.hasError && (current.opts.clickContent === 'zoom' || $.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom")) {
            fitPos = self.getFitPos(current);

            if (current.width > fitPos.width || current.height > fitPos.height) {
              return true;
            }
          }

          return false;
        },
        // Check if current image dimensions are smaller than actual
        // =========================================================
        isScaledDown: function isScaledDown() {
          var self = this;
          var current = self.current;
          var $what = current.$content;
          var rez = false;

          if ($what) {
            rez = $.fancybox.getTranslate($what);
            rez = rez.width < current.width || rez.height < current.height;
          }

          return rez;
        },
        // Check if image dimensions exceed parent element
        // ===============================================
        canPan: function canPan() {
          var self = this;
          var current = self.current;
          var $what = current.$content;
          var rez = false;

          if ($what) {
            rez = self.getFitPos(current);
            rez = Math.abs($what.width() - rez.width) > 1 || Math.abs($what.height() - rez.height) > 1;
          }

          return rez;
        },
        // Load content into the slide
        // ===========================
        loadSlide: function loadSlide(slide) {
          var self = this,
              type,
              $slide;
          var ajaxLoad;

          if (slide.isLoading) {
            return;
          }

          if (slide.isLoaded) {
            return;
          }

          slide.isLoading = true;
          self.trigger('beforeLoad', slide);
          type = slide.type;
          $slide = slide.$slide;
          $slide.off('refresh').trigger('onReset').addClass('fancybox-slide--' + (type || 'unknown')).addClass(slide.opts.slideClass); // Create content depending on the type

          switch (type) {
            case 'image':
              self.setImage(slide);
              break;

            case 'iframe':
              self.setIframe(slide);
              break;

            case 'html':
              self.setContent(slide, slide.src || slide.content);
              break;

            case 'inline':
              if ($(slide.src).length) {
                self.setContent(slide, $(slide.src));
              } else {
                self.setError(slide);
              }

              break;

            case 'ajax':
              self.showLoading(slide);
              ajaxLoad = $.ajax($.extend({}, slide.opts.ajax.settings, {
                url: slide.src,
                success: function success(data, textStatus) {
                  if (textStatus === 'success') {
                    self.setContent(slide, data);
                  }
                },
                error: function error(jqXHR, textStatus) {
                  if (jqXHR && textStatus !== 'abort') {
                    self.setError(slide);
                  }
                }
              }));
              $slide.one('onReset', function () {
                ajaxLoad.abort();
              });
              break;

            default:
              self.setError(slide);
              break;
          }

          return true;
        },
        // Use thumbnail image, if possible
        // ================================
        setImage: function setImage(slide) {
          var self = this;
          var srcset = slide.opts.srcset || slide.opts.image.srcset;
          var found, temp, pxRatio, windowWidth; // If we have "srcset", then we need to find matching "src" value.
          // This is necessary, because when you set an src attribute, the browser will preload the image
          // before any javascript or even CSS is applied.

          if (srcset) {
            pxRatio = window.devicePixelRatio || 1;
            windowWidth = window.innerWidth * pxRatio;
            temp = srcset.split(',').map(function (el) {
              var ret = {};
              el.trim().split(/\s+/).forEach(function (el, i) {
                var value = parseInt(el.substring(0, el.length - 1), 10);

                if (i === 0) {
                  return ret.url = el;
                }

                if (value) {
                  ret.value = value;
                  ret.postfix = el[el.length - 1];
                }
              });
              return ret;
            }); // Sort by value

            temp.sort(function (a, b) {
              return a.value - b.value;
            }); // Ok, now we have an array of all srcset values

            for (var j = 0; j < temp.length; j++) {
              var el = temp[j];

              if (el.postfix === 'w' && el.value >= windowWidth || el.postfix === 'x' && el.value >= pxRatio) {
                found = el;
                break;
              }
            } // If not found, take the last one


            if (!found && temp.length) {
              found = temp[temp.length - 1];
            }

            if (found) {
              slide.src = found.url; // If we have default width/height values, we can calculate height for matching source

              if (slide.width && slide.height && found.postfix == 'w') {
                slide.height = slide.width / slide.height * found.value;
                slide.width = found.value;
              }
            }
          } // This will be wrapper containing both ghost and actual image


          slide.$content = $('<div class="fancybox-image-wrap"></div>').addClass('fancybox-is-hidden').appendTo(slide.$slide); // If we have a thumbnail, we can display it while actual image is loading
          // Users will not stare at black screen and actual image will appear gradually

          if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && (slide.opts.thumb || slide.opts.$thumb)) {
            slide.width = slide.opts.width;
            slide.height = slide.opts.height;
            slide.$ghost = $('<img />').one('error', function () {
              $(this).remove();
              slide.$ghost = null;
              self.setBigImage(slide);
            }).one('load', function () {
              self.afterLoad(slide);
              self.setBigImage(slide);
            }).addClass('fancybox-image').appendTo(slide.$content).attr('src', slide.opts.thumb || slide.opts.$thumb.attr('src'));
          } else {
            self.setBigImage(slide);
          }
        },
        // Create full-size image
        // ======================
        setBigImage: function setBigImage(slide) {
          var self = this;
          var $img = $('<img />');
          slide.$image = $img.one('error', function () {
            self.setError(slide);
          }).one('load', function () {
            // Clear timeout that checks if loading icon needs to be displayed
            clearTimeout(slide.timouts);
            slide.timouts = null;

            if (self.isClosing) {
              return;
            }

            slide.width = this.naturalWidth;
            slide.height = this.naturalHeight;

            if (slide.opts.image.srcset) {
              $img.attr('sizes', '100vw').attr('srcset', slide.opts.image.srcset);
            }

            self.hideLoading(slide);

            if (slide.$ghost) {
              slide.timouts = setTimeout(function () {
                slide.timouts = null;
                slide.$ghost.hide();
              }, Math.min(300, Math.max(1000, slide.height / 1600)));
            } else {
              self.afterLoad(slide);
            }
          }).addClass('fancybox-image').attr('src', slide.src).appendTo(slide.$content);

          if (($img[0].complete || $img[0].readyState == "complete") && $img[0].naturalWidth && $img[0].naturalHeight) {
            $img.trigger('load');
          } else if ($img[0].error) {
            $img.trigger('error');
          } else {
            slide.timouts = setTimeout(function () {
              if (!$img[0].complete && !slide.hasError) {
                self.showLoading(slide);
              }
            }, 100);
          }
        },
        // Create iframe wrapper, iframe and bindings
        // ==========================================
        setIframe: function setIframe(slide) {
          var self = this,
              opts = slide.opts.iframe,
              $slide = slide.$slide,
              $iframe;
          slide.$content = $('<div class="fancybox-content' + (opts.preload ? ' fancybox-is-hidden' : '') + '"></div>').css(opts.css).appendTo($slide);
          $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(opts.attr).appendTo(slide.$content);

          if (opts.preload) {
            self.showLoading(slide); // Unfortunately, it is not always possible to determine if iframe is successfully loaded
            // (due to browser security policy)

            $iframe.on('load.fb error.fb', function (e) {
              this.isReady = 1;
              slide.$slide.trigger('refresh');
              self.afterLoad(slide);
            }); // Recalculate iframe content size
            // ===============================

            $slide.on('refresh.fb', function () {
              var $wrap = slide.$content,
                  frameWidth = opts.css.width,
                  frameHeight = opts.css.height,
                  scrollWidth,
                  $contents,
                  $body;

              if ($iframe[0].isReady !== 1) {
                return;
              } // Check if content is accessible,
              // it will fail if frame is not with the same origin


              try {
                $contents = $iframe.contents();
                $body = $contents.find('body');
              } catch (ignore) {} // Calculate dimensions for the wrapper


              if ($body && $body.length) {
                if (frameWidth === undefined$1) {
                  scrollWidth = $iframe[0].contentWindow.document.documentElement.scrollWidth;
                  frameWidth = Math.ceil($body.outerWidth(true) + ($wrap.width() - scrollWidth));
                  frameWidth += $wrap.outerWidth() - $wrap.innerWidth();
                }

                if (frameHeight === undefined$1) {
                  frameHeight = Math.ceil($body.outerHeight(true));
                  frameHeight += $wrap.outerHeight() - $wrap.innerHeight();
                } // Resize wrapper to fit iframe content


                if (frameWidth) {
                  $wrap.width(frameWidth);
                }

                if (frameHeight) {
                  $wrap.height(frameHeight);
                }
              }

              $wrap.removeClass('fancybox-is-hidden');
            });
          } else {
            this.afterLoad(slide);
          }

          $iframe.attr('src', slide.src);

          if (slide.opts.smallBtn === true) {
            slide.$content.prepend(self.translate(slide, slide.opts.btnTpl.smallBtn));
          } // Remove iframe if closing or changing gallery item


          $slide.one('onReset', function () {
            // This helps IE not to throw errors when closing
            try {
              $(this).find('iframe').hide().attr('src', '//about:blank');
            } catch (ignore) {}

            $(this).empty();
            slide.isLoaded = false;
          });
        },
        // Wrap and append content to the slide
        // ======================================
        setContent: function setContent(slide, content) {
          var self = this;

          if (self.isClosing) {
            return;
          }

          self.hideLoading(slide);
          slide.$slide.empty();

          if (isQuery(content) && content.parent().length) {
            // If content is a jQuery object, then it will be moved to the slide.
            // The placeholder is created so we will know where to put it back.
            // If user is navigating gallery fast, then the content might be already inside fancyBox
            // =====================================================================================
            // Make sure content is not already moved to fancyBox
            content.parent('.fancybox-slide--inline').trigger('onReset'); // Create temporary element marking original place of the content

            slide.$placeholder = $('<div></div>').hide().insertAfter(content); // Make sure content is visible

            content.css('display', 'inline-block');
          } else if (!slide.hasError) {
            // If content is just a plain text, try to convert it to html
            if ($.type(content) === 'string') {
              content = $('<div>').append($.trim(content)).contents(); // If we have text node, then add wrapping element to make vertical alignment work

              if (content[0].nodeType === 3) {
                content = $('<div>').html(content);
              }
            } // If "filter" option is provided, then filter content


            if (slide.opts.filter) {
              content = $('<div>').html(content).find(slide.opts.filter);
            }
          }

          slide.$slide.one('onReset', function () {
            // Pause all html5 video/audio
            $(this).find("video,audio").each(function () {
              this.pause();
            }); // Put content back

            if (slide.$placeholder) {
              slide.$placeholder.after(content.hide()).remove();
              slide.$placeholder = null;
            } // Remove custom close button


            if (slide.$smallBtn) {
              slide.$smallBtn.remove();
              slide.$smallBtn = null;
            } // Remove content and mark slide as not loaded


            if (!slide.hasError) {
              $(this).empty();
              slide.isLoaded = false;
            }
          });
          slide.$content = $(content).appendTo(slide.$slide);
          this.afterLoad(slide);
        },
        // Display error message
        // =====================
        setError: function setError(slide) {
          slide.hasError = true;
          slide.$slide.removeClass('fancybox-slide--' + slide.type);
          this.setContent(slide, this.translate(slide, slide.opts.errorTpl));
        },
        // Show loading icon inside the slide
        // ==================================
        showLoading: function showLoading(slide) {
          var self = this;
          slide = slide || self.current;

          if (slide && !slide.$spinner) {
            slide.$spinner = $(self.opts.spinnerTpl).appendTo(slide.$slide);
          }
        },
        // Remove loading icon from the slide
        // ==================================
        hideLoading: function hideLoading(slide) {
          var self = this;
          slide = slide || self.current;

          if (slide && slide.$spinner) {
            slide.$spinner.remove();
            delete slide.$spinner;
          }
        },
        // Adjustments after slide content has been loaded
        // ===============================================
        afterLoad: function afterLoad(slide) {
          var self = this;

          if (self.isClosing) {
            return;
          }

          slide.isLoading = false;
          slide.isLoaded = true;
          self.trigger('afterLoad', slide);
          self.hideLoading(slide);

          if (slide.opts.smallBtn && !slide.$smallBtn) {
            slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content.filter('div,form').first());
          }

          if (slide.opts.protect && slide.$content && !slide.hasError) {
            // Disable right click
            slide.$content.on('contextmenu.fb', function (e) {
              if (e.button == 2) {
                e.preventDefault();
              }

              return true;
            }); // Add fake element on top of the image
            // This makes a bit harder for user to select image

            if (slide.type === 'image') {
              $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
            }
          }

          self.revealContent(slide);
        },
        // Make content visible
        // This method is called right after content has been loaded or
        // user navigates gallery and transition should start
        // ============================================================
        revealContent: function revealContent(slide) {
          var self = this;
          var $slide = slide.$slide;
          var effect,
              effectClassName,
              duration,
              opacity,
              end,
              start = false;
          effect = slide.opts[self.firstRun ? 'animationEffect' : 'transitionEffect'];
          duration = slide.opts[self.firstRun ? 'animationDuration' : 'transitionDuration'];
          duration = parseInt(slide.forcedDuration === undefined$1 ? duration : slide.forcedDuration, 10);

          if (slide.isMoved || slide.pos !== self.currPos || !duration) {
            effect = false;
          } // Check if can zoom


          if (effect === 'zoom' && !(slide.pos === self.currPos && duration && slide.type === 'image' && !slide.hasError && (start = self.getThumbPos(slide)))) {
            effect = 'fade';
          } // Zoom animation
          // ==============


          if (effect === 'zoom') {
            end = self.getFitPos(slide);
            end.scaleX = end.width / start.width;
            end.scaleY = end.height / start.height;
            delete end.width;
            delete end.height; // Check if we need to animate opacity

            opacity = slide.opts.zoomOpacity;

            if (opacity == 'auto') {
              opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
            }

            if (opacity) {
              start.opacity = 0.1;
              end.opacity = 1;
            } // Draw image at start position


            $.fancybox.setTranslate(slide.$content.removeClass('fancybox-is-hidden'), start);
            forceRedraw(slide.$content); // Start animation

            $.fancybox.animate(slide.$content, end, duration, function () {
              self.complete();
            });
            return;
          }

          self.updateSlide(slide); // Simply show content
          // ===================

          if (!effect) {
            forceRedraw($slide);
            slide.$content.removeClass('fancybox-is-hidden');

            if (slide.pos === self.currPos) {
              self.complete();
            }

            return;
          }

          $.fancybox.stop($slide);
          effectClassName = 'fancybox-animated fancybox-slide--' + (slide.pos >= self.prevPos ? 'next' : 'previous') + ' fancybox-fx-' + effect;
          $slide.removeAttr('style').removeClass('fancybox-slide--current fancybox-slide--next fancybox-slide--previous').addClass(effectClassName);
          slide.$content.removeClass('fancybox-is-hidden'); //Force reflow for CSS3 transitions

          forceRedraw($slide);
          $.fancybox.animate($slide, 'fancybox-slide--current', duration, function (e) {
            $slide.removeClass(effectClassName).removeAttr('style');

            if (slide.pos === self.currPos) {
              self.complete();
            }
          }, true);
        },
        // Check if we can and have to zoom from thumbnail
        //================================================
        getThumbPos: function getThumbPos(slide) {
          var self = this;
          var rez = false; // Check if element is inside the viewport by at least 1 pixel

          var isElementVisible = function isElementVisible($el) {
            var element = $el[0];
            var elementRect = element.getBoundingClientRect();
            var parentRects = [];
            var visibleInAllParents;

            while (element.parentElement !== null) {
              if ($(element.parentElement).css('overflow') === 'hidden' || $(element.parentElement).css('overflow') === 'auto') {
                parentRects.push(element.parentElement.getBoundingClientRect());
              }

              element = element.parentElement;
            }

            visibleInAllParents = parentRects.every(function (parentRect) {
              var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
              var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);
              return visiblePixelX > 0 && visiblePixelY > 0;
            });
            return visibleInAllParents && elementRect.bottom > 0 && elementRect.right > 0 && elementRect.left < $(window).width() && elementRect.top < $(window).height();
          };

          var $thumb = slide.opts.$thumb;
          var thumbPos = $thumb ? $thumb.offset() : 0;
          var slidePos;

          if (thumbPos && $thumb[0].ownerDocument === document && isElementVisible($thumb)) {
            slidePos = self.$refs.stage.offset();
            rez = {
              top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
              left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
              width: $thumb.width(),
              height: $thumb.height(),
              scaleX: 1,
              scaleY: 1
            };
          }

          return rez;
        },
        // Final adjustments after current gallery item is moved to position
        // and it`s content is loaded
        // ==================================================================
        complete: function complete() {
          var self = this;
          var current = self.current;
          var slides = {};

          if (current.isMoved || !current.isLoaded || current.isComplete) {
            return;
          }

          current.isComplete = true;
          current.$slide.siblings().trigger('onReset'); // Trigger any CSS3 transiton inside the slide

          forceRedraw(current.$slide);
          current.$slide.addClass('fancybox-slide--complete'); // Remove unnecessary slides

          $.each(self.slides, function (key, slide) {
            if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
              slides[slide.pos] = slide;
            } else if (slide) {
              $.fancybox.stop(slide.$slide);
              slide.$slide.off().remove();
            }
          });
          self.slides = slides;
          self.updateCursor();
          self.trigger('afterShow'); // Play first html5 video/audio

          var media = current.$slide.find("video,audio").first();

          if (media.length) {
            media[0].play();
          } // Try to focus on the first focusable element


          if ($(document.activeElement).is('[disabled]') || current.opts.autoFocus && !(current.type == 'image' || current.type === 'iframe')) {
            self.focus();
          }
        },
        // Preload next and previous slides
        // ================================
        preload: function preload() {
          var self = this;
          var next, prev;

          if (self.group.length < 2) {
            return;
          }

          next = self.slides[self.currPos + 1];
          prev = self.slides[self.currPos - 1];

          if (next && next.type === 'image') {
            self.loadSlide(next);
          }

          if (prev && prev.type === 'image') {
            self.loadSlide(prev);
          }
        },
        // Try to find and focus on the first focusable element
        // ====================================================
        focus: function focus() {
          var current = this.current;
          var $el;

          if (this.isClosing) {
            return;
          }

          if (current && current.isComplete) {
            // Look for first input with autofocus attribute
            $el = current.$slide.find('input[autofocus]:enabled:visible:first');

            if (!$el.length) {
              $el = current.$slide.find('button,:input,[tabindex],a').filter(':enabled:visible:first');
            }
          }

          $el = $el && $el.length ? $el : this.$refs.container;
          $el.focus();
        },
        // Activates current instance - brings container to the front and enables keyboard,
        // notifies other instances about deactivating
        // =================================================================================
        activate: function activate() {
          var self = this; // Deactivate all instances

          $('.fancybox-container').each(function () {
            var instance = $(this).data('FancyBox'); // Skip self and closing instances

            if (instance && instance.id !== self.id && !instance.isClosing) {
              instance.trigger('onDeactivate');
              instance.removeEvents();
              instance.isVisible = false;
            }
          });
          self.isVisible = true;

          if (self.current || self.isIdle) {
            self.update();
            self.updateControls();
          }

          self.trigger('onActivate');
          self.addEvents();
        },
        // Start closing procedure
        // This will start "zoom-out" animation if needed and clean everything up afterwards
        // =================================================================================
        close: function close(e, d) {
          var self = this;
          var current = self.current;
          var effect, duration;
          var $what, opacity, start, end;

          var done = function done() {
            self.cleanUp(e);
          };

          if (self.isClosing) {
            return false;
          }

          self.isClosing = true; // If beforeClose callback prevents closing, make sure content is centered

          if (self.trigger('beforeClose', e) === false) {
            self.isClosing = false;
            requestAFrame(function () {
              self.update();
            });
            return false;
          } // Remove all events
          // If there are multiple instances, they will be set again by "activate" method


          self.removeEvents();

          if (current.timouts) {
            clearTimeout(current.timouts);
          }

          $what = current.$content;
          effect = current.opts.animationEffect;
          duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0; // Remove other slides

          current.$slide.off(transitionEnd).removeClass('fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated');
          current.$slide.siblings().trigger('onReset').remove(); // Trigger animations

          if (duration) {
            self.$refs.container.removeClass('fancybox-is-open').addClass('fancybox-is-closing');
          } // Clean up


          self.hideLoading(current);
          self.hideControls();
          self.updateCursor(); // Check if possible to zoom-out

          if (effect === 'zoom' && !(e !== true && $what && duration && current.type === 'image' && !current.hasError && (end = self.getThumbPos(current)))) {
            effect = 'fade';
          }

          if (effect === 'zoom') {
            $.fancybox.stop($what);
            start = $.fancybox.getTranslate($what);
            start.width = start.width * start.scaleX;
            start.height = start.height * start.scaleY; // Check if we need to animate opacity

            opacity = current.opts.zoomOpacity;

            if (opacity == 'auto') {
              opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
            }

            if (opacity) {
              end.opacity = 0;
            }

            start.scaleX = start.width / end.width;
            start.scaleY = start.height / end.height;
            start.width = end.width;
            start.height = end.height;
            $.fancybox.setTranslate(current.$content, start);
            forceRedraw(current.$content);
            $.fancybox.animate(current.$content, end, duration, done);
            return true;
          }

          if (effect && duration) {
            // If skip animation
            if (e === true) {
              setTimeout(done, duration);
            } else {
              $.fancybox.animate(current.$slide.removeClass('fancybox-slide--current'), 'fancybox-animated fancybox-slide--previous fancybox-fx-' + effect, duration, done);
            }
          } else {
            done();
          }

          return true;
        },
        // Final adjustments after removing the instance
        // =============================================
        cleanUp: function cleanUp(e) {
          var self = this,
              $body = $('body'),
              instance,
              offset;
          self.current.$slide.trigger('onReset');
          self.$refs.container.empty().remove();
          self.trigger('afterClose', e); // Place back focus

          if (self.$lastFocus && !!self.current.opts.backFocus) {
            self.$lastFocus.focus();
          }

          self.current = null; // Check if there are other instances

          instance = $.fancybox.getInstance();

          if (instance) {
            instance.activate();
          } else {
            $W.scrollTop(self.scrollTop).scrollLeft(self.scrollLeft);
            $body.removeClass('fancybox-active compensate-for-scrollbar');

            if ($body.hasClass('fancybox-iosfix')) {
              offset = parseInt(document.body.style.top, 10);
              $body.removeClass('fancybox-iosfix').css('top', '').scrollTop(offset * -1);
            }

            $('#fancybox-style-noscroll').remove();
          }
        },
        // Call callback and trigger an event
        // ==================================
        trigger: function trigger(name, slide) {
          var args = Array.prototype.slice.call(arguments, 1),
              self = this,
              obj = slide && slide.opts ? slide : self.current,
              rez;

          if (obj) {
            args.unshift(obj);
          } else {
            obj = self;
          }

          args.unshift(self);

          if ($.isFunction(obj.opts[name])) {
            rez = obj.opts[name].apply(obj, args);
          }

          if (rez === false) {
            return rez;
          }

          if (name === 'afterClose' || !self.$refs) {
            $D.trigger(name + '.fb', args);
          } else {
            self.$refs.container.trigger(name + '.fb', args);
          }
        },
        // Update infobar values, navigation button states and reveal caption
        // ==================================================================
        updateControls: function updateControls(force) {
          var self = this;
          var current = self.current,
              index = current.index,
              caption = current.opts.caption,
              $container = self.$refs.container,
              $caption = self.$refs.caption; // Recalculate content dimensions

          current.$slide.trigger('refresh');
          self.$caption = caption && caption.length ? $caption.html(caption) : null;

          if (!self.isHiddenControls && !self.isIdle) {
            self.showControls();
          } // Update info and navigation elements


          $container.find('[data-fancybox-count]').html(self.group.length);
          $container.find('[data-fancybox-index]').html(index + 1);
          $container.find('[data-fancybox-prev]').prop('disabled', !current.opts.loop && index <= 0);
          $container.find('[data-fancybox-next]').prop('disabled', !current.opts.loop && index >= self.group.length - 1);

          if (current.type === 'image') {
            // Update download button source
            $container.find('[data-fancybox-download]').attr('href', current.opts.image.src || current.src).show();
          } else {
            $container.find('[data-fancybox-download],[data-fancybox-zoom]').hide();
          }
        },
        // Hide toolbar and caption
        // ========================
        hideControls: function hideControls() {
          this.isHiddenControls = true;
          this.$refs.container.removeClass('fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav');
        },
        showControls: function showControls() {
          var self = this;
          var opts = self.current ? self.current.opts : self.opts;
          var $container = self.$refs.container;
          self.isHiddenControls = false;
          self.idleSecondsCounter = 0;
          $container.toggleClass('fancybox-show-toolbar', !!(opts.toolbar && opts.buttons)).toggleClass('fancybox-show-infobar', !!(opts.infobar && self.group.length > 1)).toggleClass('fancybox-show-nav', !!(opts.arrows && self.group.length > 1)).toggleClass('fancybox-is-modal', !!opts.modal);

          if (self.$caption) {
            $container.addClass('fancybox-show-caption ');
          } else {
            $container.removeClass('fancybox-show-caption');
          }
        },
        // Toggle toolbar and caption
        // ==========================
        toggleControls: function toggleControls() {
          if (this.isHiddenControls) {
            this.showControls();
          } else {
            this.hideControls();
          }
        }
      });
      $.fancybox = {
        version: "3.2.8",
        defaults: defaults,
        // Get current instance and execute a command.
        //
        // Examples of usage:
        //
        //   $instance = $.fancybox.getInstance();
        //   $.fancybox.getInstance().jumpTo( 1 );
        //   $.fancybox.getInstance( 'jumpTo', 1 );
        //   $.fancybox.getInstance( function() {
        //       console.info( this.currIndex );
        //   });
        // ======================================================
        getInstance: function getInstance(command) {
          var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data('FancyBox');
          var args = Array.prototype.slice.call(arguments, 1);

          if (instance instanceof FancyBox) {
            if ($.type(command) === 'string') {
              instance[command].apply(instance, args);
            } else if ($.type(command) === 'function') {
              command.apply(instance, args);
            }

            return instance;
          }

          return false;
        },
        // Create new instance
        // ===================
        open: function open(items, opts, index) {
          return new FancyBox(items, opts, index);
        },
        // Close current or all instances
        // ==============================
        close: function close(all) {
          var instance = this.getInstance();

          if (instance) {
            instance.close(); // Try to find and close next instance

            if (all === true) {
              this.close();
            }
          }
        },
        // Close instances and unbind all events
        // ==============================
        destroy: function destroy() {
          this.close(true);
          $D.off('click.fb-start');
        },
        // Try to detect mobile devices
        // ============================
        isMobile: document.createTouch !== undefined$1 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        // Detect if 'translate3d' support is available
        // ============================================
        use3d: function () {
          var div = document.createElement('div');
          return window.getComputedStyle && window.getComputedStyle(div).getPropertyValue('transform') && !(document.documentMode && document.documentMode < 11);
        }(),
        // Helper function to get current visual state of an element
        // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
        // =====================================================================
        getTranslate: function getTranslate($el) {
          var matrix;

          if (!$el || !$el.length) {
            return false;
          }

          matrix = $el.eq(0).css('transform');

          if (matrix && matrix.indexOf('matrix') !== -1) {
            matrix = matrix.split('(')[1];
            matrix = matrix.split(')')[0];
            matrix = matrix.split(',');
          } else {
            matrix = [];
          }

          if (matrix.length) {
            // If IE
            if (matrix.length > 10) {
              matrix = [matrix[13], matrix[12], matrix[0], matrix[5]];
            } else {
              matrix = [matrix[5], matrix[4], matrix[0], matrix[3]];
            }

            matrix = matrix.map(parseFloat);
          } else {
            matrix = [0, 0, 1, 1];
            var transRegex = /\.*translate\((.*)px,(.*)px\)/i;
            var transRez = transRegex.exec($el.eq(0).attr('style'));

            if (transRez) {
              matrix[0] = parseFloat(transRez[2]);
              matrix[1] = parseFloat(transRez[1]);
            }
          }

          return {
            top: matrix[0],
            left: matrix[1],
            scaleX: matrix[2],
            scaleY: matrix[3],
            opacity: parseFloat($el.css('opacity')),
            width: $el.width(),
            height: $el.height()
          };
        },
        // Shortcut for setting "translate3d" properties for element
        // Can set be used to set opacity, too
        // ========================================================
        setTranslate: function setTranslate($el, props) {
          var str = '';
          var css = {};

          if (!$el || !props) {
            return;
          }

          if (props.left !== undefined$1 || props.top !== undefined$1) {
            str = (props.left === undefined$1 ? $el.position().left : props.left) + 'px, ' + (props.top === undefined$1 ? $el.position().top : props.top) + 'px';

            if (this.use3d) {
              str = 'translate3d(' + str + ', 0px)';
            } else {
              str = 'translate(' + str + ')';
            }
          }

          if (props.scaleX !== undefined$1 && props.scaleY !== undefined$1) {
            str = (str.length ? str + ' ' : '') + 'scale(' + props.scaleX + ', ' + props.scaleY + ')';
          }

          if (str.length) {
            css.transform = str;
          }

          if (props.opacity !== undefined$1) {
            css.opacity = props.opacity;
          }

          if (props.width !== undefined$1) {
            css.width = props.width;
          }

          if (props.height !== undefined$1) {
            css.height = props.height;
          }

          return $el.css(css);
        },
        // Simple CSS transition handler
        // =============================
        animate: function animate($el, to, duration, callback, leaveAnimationName) {
          if ($.isFunction(duration)) {
            callback = duration;
            duration = null;
          }

          if (!$.isPlainObject(to)) {
            $el.removeAttr('style');
          }

          $el.on(transitionEnd, function (e) {
            // Skip events from child elements and z-index change
            if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == 'z-index')) {
              return;
            }

            $.fancybox.stop($el);

            if ($.isPlainObject(to)) {
              if (to.scaleX !== undefined$1 && to.scaleY !== undefined$1) {
                $el.css('transition-duration', '');
                to.width = Math.round($el.width() * to.scaleX);
                to.height = Math.round($el.height() * to.scaleY);
                to.scaleX = 1;
                to.scaleY = 1;
                $.fancybox.setTranslate($el, to);
              }
            } else if (leaveAnimationName !== true) {
              $el.removeClass(to);
            }

            if ($.isFunction(callback)) {
              callback(e);
            }
          });

          if ($.isNumeric(duration)) {
            $el.css('transition-duration', duration + 'ms');
          }

          if ($.isPlainObject(to)) {
            $.fancybox.setTranslate($el, to);
          } else {
            $el.addClass(to);
          }

          if (to.scaleX && $el.hasClass('fancybox-image-wrap')) {
            $el.parent().addClass('fancybox-is-scaling');
          } // Make sure that `transitionend` callback gets fired


          $el.data("timer", setTimeout(function () {
            $el.trigger('transitionend');
          }, duration + 16));
        },
        stop: function stop($el) {
          clearTimeout($el.data("timer"));
          $el.off('transitionend').css('transition-duration', '');

          if ($el.hasClass('fancybox-image-wrap')) {
            $el.parent().removeClass('fancybox-is-scaling');
          }
        }
      }; // Default click handler for "fancyboxed" links
      // ============================================

      function _run(e) {
        var $target = $(e.currentTarget),
            opts = e.data ? e.data.options : {},
            value = $target.attr('data-fancybox') || '',
            index = 0,
            items = []; // Avoid opening multiple times

        if (e.isDefaultPrevented()) {
          return;
        }

        e.preventDefault(); // Get all related items and find index for clicked one

        if (value) {
          items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [];
          items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
          index = items.index($target); // Sometimes current item can not be found
          // (for example, when slider clones items)

          if (index < 0) {
            index = 0;
          }
        } else {
          items = [$target];
        }

        $.fancybox.open(items, opts, index);
      } // Create a jQuery plugin
      // ======================


      $.fn.fancybox = function (options) {
        var selector;
        options = options || {};
        selector = options.selector || false;

        if (selector) {
          $('body').off('click.fb-start', selector).on('click.fb-start', selector, {
            options: options
          }, _run);
        } else {
          this.off('click.fb-start').on('click.fb-start', {
            items: this,
            options: options
          }, _run);
        }

        return this;
      }; // Self initializing plugin
      // ========================


      $D.on('click.fb-start', '[data-fancybox]', _run);
    })(window, document, window.jQuery || jQuery); // ==========================================================================

    (function ($) {

      var format = function format(url, rez, params) {
        if (!url) {
          return;
        }

        params = params || '';

        if ($.type(params) === "object") {
          params = $.param(params, true);
        }

        $.each(rez, function (key, value) {
          url = url.replace('$' + key, value || '');
        });

        if (params.length) {
          url += (url.indexOf('?') > 0 ? '&' : '?') + params;
        }

        return url;
      }; // Object containing properties for each media type


      var defaults = {
        youtube: {
          matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: 'transparent',
            enablejsapi: 1,
            html5: 1
          },
          paramPlace: 8,
          type: 'iframe',
          url: '//www.youtube.com/embed/$4',
          thumb: '//img.youtube.com/vi/$4/hqdefault.jpg'
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
            api: 1
          },
          paramPlace: 3,
          type: 'iframe',
          url: '//player.vimeo.com/video/$2'
        },
        metacafe: {
          matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
          type: 'iframe',
          url: '//www.metacafe.com/embed/$1/?ap=1'
        },
        dailymotion: {
          matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
          params: {
            additionalInfos: 0,
            autoStart: 1
          },
          type: 'iframe',
          url: '//www.dailymotion.com/embed/video/$1'
        },
        vine: {
          matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
          type: 'iframe',
          url: '//vine.co/v/$1/embed/simple'
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: 'image',
          url: '//$1/p/$2/media/?size=l'
        },
        // Examples:
        // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
        // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
        // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
        gmap_place: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: 'iframe',
          url: function url(rez) {
            return '//maps.google.' + rez[2] + '/?ll=' + (rez[9] ? rez[9] + '&z=' + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : '') : rez[12]) + '&output=' + (rez[12] && rez[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
          }
        },
        // Examples:
        // https://www.google.com/maps/search/Empire+State+Building/
        // https://www.google.com/maps/search/?api=1&query=centurylink+field
        // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
        gmap_search: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: 'iframe',
          url: function url(rez) {
            return '//maps.google.' + rez[2] + '/maps?q=' + rez[5].replace('query=', 'q=').replace('api=1', '') + '&output=embed';
          }
        }
      };
      $(document).on('objectNeedsType.fb', function (e, instance, item) {
        var url = item.src || '',
            type = false,
            media,
            thumb,
            rez,
            params,
            urlParams,
            paramObj,
            provider;
        media = $.extend(true, {}, defaults, item.opts.media); // Look for any matching media type

        $.each(media, function (providerName, providerOpts) {
          rez = url.match(providerOpts.matcher);

          if (!rez) {
            return;
          }

          type = providerOpts.type;
          paramObj = {};

          if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
            urlParams = rez[providerOpts.paramPlace];

            if (urlParams[0] == '?') {
              urlParams = urlParams.substring(1);
            }

            urlParams = urlParams.split('&');

            for (var m = 0; m < urlParams.length; ++m) {
              var p = urlParams[m].split('=', 2);

              if (p.length == 2) {
                paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
              }
            }
          }

          params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);
          url = $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);
          thumb = $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

          if (providerName === 'vimeo') {
            url = url.replace('&%23', '#');
          }

          return false;
        }); // If it is found, then change content type and update the url

        if (type) {
          item.src = url;
          item.type = type;

          if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
            item.opts.thumb = thumb;
          }

          if (type === 'iframe') {
            $.extend(true, item.opts, {
              iframe: {
                preload: false,
                attr: {
                  scrolling: "no"
                }
              }
            });
            item.contentProvider = provider;
            item.opts.slideClass += ' fancybox-slide--' + ( 'video');
          }
        } else if (url) {
          item.type = item.opts.defaultType;
        }
      });
    })(window.jQuery || jQuery); // ==========================================================================

    (function (window, document, $) {

      var requestAFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
        function (callback) {
          return window.setTimeout(callback, 1000 / 60);
        };
      }();

      var cancelAFrame = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
          window.clearTimeout(id);
        };
      }();

      var pointers = function pointers(e) {
        var result = [];
        e = e.originalEvent || e || window.e;
        e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

        for (var key in e) {
          if (e[key].pageX) {
            result.push({
              x: e[key].pageX,
              y: e[key].pageY
            });
          } else if (e[key].clientX) {
            result.push({
              x: e[key].clientX,
              y: e[key].clientY
            });
          }
        }

        return result;
      };

      var distance = function distance(point2, point1, what) {
        if (!point1 || !point2) {
          return 0;
        }

        if (what === 'x') {
          return point2.x - point1.x;
        } else if (what === 'y') {
          return point2.y - point1.y;
        }

        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
      };

      var isClickable = function isClickable($el) {
        if ($el.is('a,area,button,[role="button"],input,label,select,summary,textarea') || $.isFunction($el.get(0).onclick) || $el.data('selectable')) {
          return true;
        } // Check for attributes like data-fancybox-next or data-fancybox-close


        for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
          if (atts[i].nodeName.substr(0, 14) === 'data-fancybox-') {
            return true;
          }
        }

        return false;
      };

      var hasScrollbars = function hasScrollbars(el) {
        var overflowY = window.getComputedStyle(el)['overflow-y'];
        var overflowX = window.getComputedStyle(el)['overflow-x'];
        var vertical = (overflowY === 'scroll' || overflowY === 'auto') && el.scrollHeight > el.clientHeight;
        var horizontal = (overflowX === 'scroll' || overflowX === 'auto') && el.scrollWidth > el.clientWidth;
        return vertical || horizontal;
      };

      var isScrollable = function isScrollable($el) {
        var rez = false;

        while (true) {
          rez = hasScrollbars($el.get(0));

          if (rez) {
            break;
          }

          $el = $el.parent();

          if (!$el.length || $el.hasClass('fancybox-stage') || $el.is('body')) {
            break;
          }
        }

        return rez;
      };

      var Guestures = function Guestures(instance) {
        var self = this;
        self.instance = instance;
        self.$bg = instance.$refs.bg;
        self.$stage = instance.$refs.stage;
        self.$container = instance.$refs.container;
        self.destroy();
        self.$container.on('touchstart.fb.touch mousedown.fb.touch', $.proxy(self, 'ontouchstart'));
      };

      Guestures.prototype.destroy = function () {
        this.$container.off('.fb.touch');
      };

      Guestures.prototype.ontouchstart = function (e) {
        var self = this;
        var $target = $(e.target);
        var instance = self.instance;
        var current = instance.current;
        var $content = current.$content;
        var isTouchDevice = e.type == 'touchstart'; // Do not respond to both events

        if (isTouchDevice) {
          self.$container.off('mousedown.fb.touch');
        } // Ignore clicks while zooming or closing


        if (!current || self.instance.isAnimating || self.instance.isClosing) {
          e.stopPropagation();
          e.preventDefault();
          return;
        } // Ignore right click


        if (e.originalEvent && e.originalEvent.button == 2) {
          return;
        } // Ignore taping on links, buttons, input elements


        if (!$target.length || isClickable($target) || isClickable($target.parent())) {
          return;
        } // Ignore clicks on the scrollbar


        if (e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
          return;
        }

        self.startPoints = pointers(e);

        if (!self.startPoints) {
          return;
        }

        self.$target = $target;
        self.$content = $content;
        self.canTap = true;
        self.opts = current.opts.touch;
        $(document).off('.fb.touch');
        $(document).on(isTouchDevice ? 'touchend.fb.touch touchcancel.fb.touch' : 'mouseup.fb.touch mouseleave.fb.touch', $.proxy(self, "ontouchend"));
        $(document).on(isTouchDevice ? 'touchmove.fb.touch' : 'mousemove.fb.touch', $.proxy(self, "ontouchmove"));

        if (!(self.opts || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
          // Prevent ghosting
          if ($target.is('img')) {
            e.preventDefault();
          }

          return;
        }

        e.stopPropagation();

        if (!($.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent())))) {
          e.preventDefault();
        }

        self.canvasWidth = Math.round(current.$slide[0].clientWidth);
        self.canvasHeight = Math.round(current.$slide[0].clientHeight);
        self.startTime = new Date().getTime();
        self.distanceX = self.distanceY = self.distance = 0;
        self.isPanning = false;
        self.isSwiping = false;
        self.isZooming = false;
        self.sliderStartPos = self.sliderLastPos || {
          top: 0,
          left: 0
        };
        self.contentStartPos = $.fancybox.getTranslate(self.$content);
        self.contentLastPos = null;

        if (self.startPoints.length === 1 && !self.isZooming) {
          self.canTap = true;

          if (current.type === 'image' && (self.contentStartPos.width > self.canvasWidth + 1 || self.contentStartPos.height > self.canvasHeight + 1)) {
            $.fancybox.stop(self.$content);
            self.$content.css('transition-duration', '');
            self.isPanning = true;
          } else {
            self.isSwiping = true;
          }

          self.$container.addClass('fancybox-controls--isGrabbing');
        }

        if (self.startPoints.length === 2 && !instance.isAnimating && !current.hasError && current.type === 'image' && (current.isLoaded || current.$ghost)) {
          self.isZooming = true;
          self.isSwiping = false;
          self.isPanning = false;
          $.fancybox.stop(self.$content);
          self.$content.css('transition-duration', '');
          self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
          self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();
          self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
          self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;
          self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
        }
      };

      Guestures.prototype.ontouchmove = function (e) {
        var self = this;
        self.newPoints = pointers(e);

        if ($.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
          e.stopPropagation();
          self.canTap = false;
          return;
        }

        if (!(self.opts || self.instance.canPan()) || !self.newPoints || !self.newPoints.length) {
          return;
        }

        self.distanceX = distance(self.newPoints[0], self.startPoints[0], 'x');
        self.distanceY = distance(self.newPoints[0], self.startPoints[0], 'y');
        self.distance = distance(self.newPoints[0], self.startPoints[0]); // Skip false ontouchmove events (Chrome)

        if (self.distance > 0 && !self.tapped) {
          if (!(self.$target.is(self.$stage) || self.$stage.find(self.$target).length)) {
            return;
          }

          e.stopPropagation();
          e.preventDefault();

          if (self.isSwiping) {
            self.onSwipe();
          } else if (self.isPanning) {
            self.onPan();
          } else if (self.isZooming) {
            self.onZoom();
          }
        }
      };

      Guestures.prototype.onSwipe = function () {
        var self = this,
            swiping = self.isSwiping,
            left = self.sliderStartPos.left || 0,
            angle;

        if (swiping === true) {
          // We need at least 10px distance to correctly calculate an angle
          if (Math.abs(self.distance) > 10) {
            self.canTap = false;

            if (self.instance.group.length < 2 && self.opts.vertical) {
              self.isSwiping = 'y';
            } else if (self.instance.isDragging || self.opts.vertical === false || self.opts.vertical === 'auto' && $(window).width() > 800) {
              self.isSwiping = 'x';
            } else {
              angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);
              self.isSwiping = angle > 45 && angle < 135 ? 'y' : 'x';
            }

            self.instance.isDragging = self.isSwiping; // Reset points to avoid jumping, because we dropped first swipes to calculate the angle

            self.startPoints = self.newPoints;
            $.each(self.instance.slides, function (index, slide) {
              $.fancybox.stop(slide.$slide);
              slide.$slide.css('transition-duration', '');
              slide.inTransition = false;

              if (slide.pos === self.instance.current.pos) {
                self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left;
              }
            }); // Stop slideshow

            if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
              self.instance.SlideShow.stop();
            }
          }

          return;
        }

        if (swiping == 'x') {
          // Sticky edges
          if (self.distanceX > 0 && (self.instance.group.length < 2 || self.instance.current.index === 0 && !self.instance.current.opts.loop)) {
            left = left + Math.pow(self.distanceX, 0.8);
          } else if (self.distanceX < 0 && (self.instance.group.length < 2 || self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop)) {
            left = left - Math.pow(-self.distanceX, 0.8);
          } else {
            left = left + self.distanceX;
          }
        }

        self.sliderLastPos = {
          top: swiping == 'x' ? 0 : self.sliderStartPos.top + self.distanceY,
          left: left
        };

        if (self.requestId) {
          cancelAFrame(self.requestId);
          self.requestId = null;
        }

        self.requestId = requestAFrame(function () {
          if (self.sliderLastPos) {
            $.each(self.instance.slides, function (index, slide) {
              var pos = slide.pos - self.instance.currPos;
              $.fancybox.setTranslate(slide.$slide, {
                top: self.sliderLastPos.top,
                left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
              });
            });
            self.$container.addClass('fancybox-is-sliding');
          }
        });
      };

      Guestures.prototype.onPan = function () {
        var self = this,
            newOffsetX,
            newOffsetY,
            newPos;
        self.canTap = false;

        if (self.contentStartPos.width > self.canvasWidth) {
          newOffsetX = self.contentStartPos.left + self.distanceX;
        } else {
          newOffsetX = self.contentStartPos.left;
        }

        newOffsetY = self.contentStartPos.top + self.distanceY;
        newPos = self.limitMovement(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);
        newPos.scaleX = self.contentStartPos.scaleX;
        newPos.scaleY = self.contentStartPos.scaleY;
        self.contentLastPos = newPos;

        if (self.requestId) {
          cancelAFrame(self.requestId);
          self.requestId = null;
        }

        self.requestId = requestAFrame(function () {
          $.fancybox.setTranslate(self.$content, self.contentLastPos);
        });
      }; // Make panning sticky to the edges


      Guestures.prototype.limitMovement = function (newOffsetX, newOffsetY, newWidth, newHeight) {
        var self = this;
        var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY;
        var canvasWidth = self.canvasWidth;
        var canvasHeight = self.canvasHeight;
        var currentOffsetX = self.contentStartPos.left;
        var currentOffsetY = self.contentStartPos.top;
        var distanceX = self.distanceX;
        var distanceY = self.distanceY; // Slow down proportionally to traveled distance

        minTranslateX = Math.max(0, canvasWidth * 0.5 - newWidth * 0.5);
        minTranslateY = Math.max(0, canvasHeight * 0.5 - newHeight * 0.5);
        maxTranslateX = Math.min(canvasWidth - newWidth, canvasWidth * 0.5 - newWidth * 0.5);
        maxTranslateY = Math.min(canvasHeight - newHeight, canvasHeight * 0.5 - newHeight * 0.5);

        if (newWidth > canvasWidth) {
          //   ->
          if (distanceX > 0 && newOffsetX > minTranslateX) {
            newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
          } //    <-


          if (distanceX < 0 && newOffsetX < maxTranslateX) {
            newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
          }
        }

        if (newHeight > canvasHeight) {
          //   \/
          if (distanceY > 0 && newOffsetY > minTranslateY) {
            newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
          } //   /\


          if (distanceY < 0 && newOffsetY < maxTranslateY) {
            newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
          }
        }

        return {
          top: newOffsetY,
          left: newOffsetX
        };
      };

      Guestures.prototype.limitPosition = function (newOffsetX, newOffsetY, newWidth, newHeight) {
        var self = this;
        var canvasWidth = self.canvasWidth;
        var canvasHeight = self.canvasHeight;

        if (newWidth > canvasWidth) {
          newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
          newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
        } else {
          // Center horizontally
          newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
        }

        if (newHeight > canvasHeight) {
          newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
          newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
        } else {
          // Center vertically
          newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
        }

        return {
          top: newOffsetY,
          left: newOffsetX
        };
      };

      Guestures.prototype.onZoom = function () {
        var self = this; // Calculate current distance between points to get pinch ratio and new width and height

        var currentWidth = self.contentStartPos.width;
        var currentHeight = self.contentStartPos.height;
        var currentOffsetX = self.contentStartPos.left;
        var currentOffsetY = self.contentStartPos.top;
        var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);
        var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;
        var newWidth = Math.floor(currentWidth * pinchRatio);
        var newHeight = Math.floor(currentHeight * pinchRatio); // This is the translation due to pinch-zooming

        var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
        var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY; //Point between the two touches

        var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
        var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop(); // And this is the translation due to translation of the centerpoint
        // between the two fingers

        var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
        var translateFromTranslatingY = centerPointEndY - self.centerPointStartY; // The new offset is the old/current one plus the total translation

        var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
        var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);
        var newPos = {
          top: newOffsetY,
          left: newOffsetX,
          scaleX: self.contentStartPos.scaleX * pinchRatio,
          scaleY: self.contentStartPos.scaleY * pinchRatio
        };
        self.canTap = false;
        self.newWidth = newWidth;
        self.newHeight = newHeight;
        self.contentLastPos = newPos;

        if (self.requestId) {
          cancelAFrame(self.requestId);
          self.requestId = null;
        }

        self.requestId = requestAFrame(function () {
          $.fancybox.setTranslate(self.$content, self.contentLastPos);
        });
      };

      Guestures.prototype.ontouchend = function (e) {
        var self = this;
        var dMs = Math.max(new Date().getTime() - self.startTime, 1);
        var swiping = self.isSwiping;
        var panning = self.isPanning;
        var zooming = self.isZooming;
        self.endPoints = pointers(e);
        self.$container.removeClass('fancybox-controls--isGrabbing');
        $(document).off('.fb.touch');

        if (self.requestId) {
          cancelAFrame(self.requestId);
          self.requestId = null;
        }

        self.isSwiping = false;
        self.isPanning = false;
        self.isZooming = false;
        self.instance.isDragging = false;

        if (self.canTap) {
          return self.onTap(e);
        }

        self.speed = 366; // Speed in px/ms

        self.velocityX = self.distanceX / dMs * 0.5;
        self.velocityY = self.distanceY / dMs * 0.5;
        self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

        if (panning) {
          self.endPanning();
        } else if (zooming) {
          self.endZooming();
        } else {
          self.endSwiping(swiping);
        }

        return;
      };

      Guestures.prototype.endSwiping = function (swiping) {
        var self = this;
        var ret = false;
        self.sliderLastPos = null; // Close if swiped vertically / navigate if horizontally

        if (swiping == 'y' && Math.abs(self.distanceY) > 50) {
          // Continue vertical movement
          $.fancybox.animate(self.instance.current.$slide, {
            top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
            opacity: 0
          }, 150);
          ret = self.instance.close(true, 300);
        } else if (swiping == 'x' && self.distanceX > 50 && self.instance.group.length > 1) {
          ret = self.instance.previous(self.speedX);
        } else if (swiping == 'x' && self.distanceX < -50 && self.instance.group.length > 1) {
          ret = self.instance.next(self.speedX);
        }

        if (ret === false && (swiping == 'x' || swiping == 'y')) {
          self.instance.jumpTo(self.instance.current.index, 150);
        }

        self.$container.removeClass('fancybox-is-sliding');
      }; // Limit panning from edges
      // ========================


      Guestures.prototype.endPanning = function () {
        var self = this;
        var newOffsetX, newOffsetY, newPos;

        if (!self.contentLastPos) {
          return;
        }

        if (self.opts.momentum === false) {
          newOffsetX = self.contentLastPos.left;
          newOffsetY = self.contentLastPos.top;
        } else {
          // Continue movement
          newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
          newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
        }

        newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);
        newPos.width = self.contentStartPos.width;
        newPos.height = self.contentStartPos.height;
        $.fancybox.animate(self.$content, newPos, 330);
      };

      Guestures.prototype.endZooming = function () {
        var self = this;
        var current = self.instance.current;
        var newOffsetX, newOffsetY, newPos, reset;
        var newWidth = self.newWidth;
        var newHeight = self.newHeight;

        if (!self.contentLastPos) {
          return;
        }

        newOffsetX = self.contentLastPos.left;
        newOffsetY = self.contentLastPos.top;
        reset = {
          top: newOffsetY,
          left: newOffsetX,
          width: newWidth,
          height: newHeight,
          scaleX: 1,
          scaleY: 1
        }; // Reset scalex/scaleY values; this helps for perfomance and does not break animation

        $.fancybox.setTranslate(self.$content, reset);

        if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
          self.instance.scaleToFit(150);
        } else if (newWidth > current.width || newHeight > current.height) {
          self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
        } else {
          newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight); // Switch from scale() to width/height or animation will not work correctly

          $.fancybox.setTranslate(self.content, $.fancybox.getTranslate(self.$content));
          $.fancybox.animate(self.$content, newPos, 150);
        }
      };

      Guestures.prototype.onTap = function (e) {
        var self = this;
        var $target = $(e.target);
        var instance = self.instance;
        var current = instance.current;
        var endPoints = e && pointers(e) || self.startPoints;
        var tapX = endPoints[0] ? endPoints[0].x - self.$stage.offset().left : 0;
        var tapY = endPoints[0] ? endPoints[0].y - self.$stage.offset().top : 0;
        var where;

        var process = function process(prefix) {
          var action = current.opts[prefix];

          if ($.isFunction(action)) {
            action = action.apply(instance, [current, e]);
          }

          if (!action) {
            return;
          }

          switch (action) {
            case "close":
              instance.close(self.startEvent);
              break;

            case "toggleControls":
              instance.toggleControls(true);
              break;

            case "next":
              instance.next();
              break;

            case "nextOrClose":
              if (instance.group.length > 1) {
                instance.next();
              } else {
                instance.close(self.startEvent);
              }

              break;

            case "zoom":
              if (current.type == 'image' && (current.isLoaded || current.$ghost)) {
                if (instance.canPan()) {
                  instance.scaleToFit();
                } else if (instance.isScaledDown()) {
                  instance.scaleToActual(tapX, tapY);
                } else if (instance.group.length < 2) {
                  instance.close(self.startEvent);
                }
              }

              break;
          }
        }; // Ignore right click


        if (e.originalEvent && e.originalEvent.button == 2) {
          return;
        } // Skip if clicked on the scrollbar


        if (tapX > $target[0].clientWidth + $target.offset().left) {
          return;
        } // Check where is clicked


        if ($target.is('.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container')) {
          where = 'Outside';
        } else if ($target.is('.fancybox-slide')) {
          where = 'Slide';
        } else if (instance.current.$content && instance.current.$content.has(e.target).length) {
          where = 'Content';
        } else {
          return;
        } // Check if this is a double tap


        if (self.tapped) {
          // Stop previously created single tap
          clearTimeout(self.tapped);
          self.tapped = null; // Skip if distance between taps is too big

          if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
            return this;
          } // OK, now we assume that this is a double-tap


          process('dblclick' + where);
        } else {
          // Single tap will be processed if user has not clicked second time within 300ms
          // or there is no need to wait for double-tap
          self.tapX = tapX;
          self.tapY = tapY;

          if (current.opts['dblclick' + where] && current.opts['dblclick' + where] !== current.opts['click' + where]) {
            self.tapped = setTimeout(function () {
              self.tapped = null;
              process('click' + where);
            }, 500);
          } else {
            process('click' + where);
          }
        }

        return this;
      };

      $(document).on('onActivate.fb', function (e, instance) {
        if (instance && !instance.Guestures) {
          instance.Guestures = new Guestures(instance);
        }
      });
      $(document).on('beforeClose.fb', function (e, instance) {
        if (instance && instance.Guestures) {
          instance.Guestures.destroy();
        }
      });
    })(window, document, window.jQuery || jQuery); // ==========================================================================

    (function (document, $) {

      $.extend(true, $.fancybox.defaults, {
        btnTpl: {
          slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M13,12 L27,20 L13,27 Z" />' + '<path d="M15,10 v19 M23,10 v19" />' + '</svg>' + '</button>'
        },
        slideShow: {
          autoStart: false,
          speed: 3000
        }
      });

      var SlideShow = function SlideShow(instance) {
        this.instance = instance;
        this.init();
      };

      $.extend(SlideShow.prototype, {
        timer: null,
        isActive: false,
        $button: null,
        init: function init() {
          var self = this;
          self.$button = self.instance.$refs.toolbar.find('[data-fancybox-play]').on('click', function () {
            self.toggle();
          });

          if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
            self.$button.hide();
          }
        },
        set: function set(force) {
          var self = this; // Check if reached last element

          if (self.instance && self.instance.current && (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)) {
            self.timer = setTimeout(function () {
              if (self.isActive) {
                self.instance.jumpTo((self.instance.currIndex + 1) % self.instance.group.length);
              }
            }, self.instance.current.opts.slideShow.speed);
          } else {
            self.stop();
            self.instance.idleSecondsCounter = 0;
            self.instance.showControls();
          }
        },
        clear: function clear() {
          var self = this;
          clearTimeout(self.timer);
          self.timer = null;
        },
        start: function start() {
          var self = this;
          var current = self.instance.current;

          if (current) {
            self.isActive = true;
            self.$button.attr('title', current.opts.i18n[current.opts.lang].PLAY_STOP).removeClass('fancybox-button--play').addClass('fancybox-button--pause');
            self.set(true);
          }
        },
        stop: function stop() {
          var self = this;
          var current = self.instance.current;
          self.clear();
          self.$button.attr('title', current.opts.i18n[current.opts.lang].PLAY_START).removeClass('fancybox-button--pause').addClass('fancybox-button--play');
          self.isActive = false;
        },
        toggle: function toggle() {
          var self = this;

          if (self.isActive) {
            self.stop();
          } else {
            self.start();
          }
        }
      });
      $(document).on({
        'onInit.fb': function onInitFb(e, instance) {
          if (instance && !instance.SlideShow) {
            instance.SlideShow = new SlideShow(instance);
          }
        },
        'beforeShow.fb': function beforeShowFb(e, instance, current, firstRun) {
          var SlideShow = instance && instance.SlideShow;

          if (firstRun) {
            if (SlideShow && current.opts.slideShow.autoStart) {
              SlideShow.start();
            }
          } else if (SlideShow && SlideShow.isActive) {
            SlideShow.clear();
          }
        },
        'afterShow.fb': function afterShowFb(e, instance, current) {
          var SlideShow = instance && instance.SlideShow;

          if (SlideShow && SlideShow.isActive) {
            SlideShow.set();
          }
        },
        'afterKeydown.fb': function afterKeydownFb(e, instance, current, keypress, keycode) {
          var SlideShow = instance && instance.SlideShow; // "P" or Spacebar

          if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is('button,a,input')) {
            keypress.preventDefault();
            SlideShow.toggle();
          }
        },
        'beforeClose.fb onDeactivate.fb': function beforeCloseFbOnDeactivateFb(e, instance) {
          var SlideShow = instance && instance.SlideShow;

          if (SlideShow) {
            SlideShow.stop();
          }
        }
      }); // Page Visibility API to pause slideshow when window is not active

      $(document).on("visibilitychange", function () {
        var instance = $.fancybox.getInstance();
        var SlideShow = instance && instance.SlideShow;

        if (SlideShow && SlideShow.isActive) {
          if (document.hidden) {
            SlideShow.clear();
          } else {
            SlideShow.set();
          }
        }
      });
    })(document, window.jQuery || jQuery); // ==========================================================================

    (function (document, $) {

      var fn = function () {
        var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], // new WebKit
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], // old WebKit (Safari 5.1)
        ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
        var val;
        var ret = {};
        var i, j;

        for (i = 0; i < fnMap.length; i++) {
          val = fnMap[i];

          if (val && val[1] in document) {
            for (j = 0; j < val.length; j++) {
              ret[fnMap[0][j]] = val[j];
            }

            return ret;
          }
        }

        return false;
      }(); // If browser does not have Full Screen API, then simply unset default button template and stop


      if (!fn) {
        if ($ && $.fancybox) {
          $.fancybox.defaults.btnTpl.fullScreen = false;
        }

        return;
      }

      var FullScreen = {
        request: function request(elem) {
          elem = elem || document.documentElement;
          elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
        },
        exit: function exit() {
          document[fn.exitFullscreen]();
        },
        toggle: function toggle(elem) {
          elem = elem || document.documentElement;

          if (this.isFullscreen()) {
            this.exit();
          } else {
            this.request(elem);
          }
        },
        isFullscreen: function isFullscreen() {
          return Boolean(document[fn.fullscreenElement]);
        },
        enabled: function enabled() {
          return Boolean(document[fn.fullscreenEnabled]);
        }
      };
      $.extend(true, $.fancybox.defaults, {
        btnTpl: {
          fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" />' + '</svg>' + '</button>'
        },
        fullScreen: {
          autoStart: false
        }
      });
      $(document).on({
        'onInit.fb': function onInitFb(e, instance) {
          var $container;

          if (instance && instance.group[instance.currIndex].opts.fullScreen) {
            $container = instance.$refs.container;
            $container.on('click.fb-fullscreen', '[data-fancybox-fullscreen]', function (e) {
              e.stopPropagation();
              e.preventDefault();
              FullScreen.toggle($container[0]);
            });

            if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
              FullScreen.request($container[0]);
            } // Expose API


            instance.FullScreen = FullScreen;
          } else if (instance) {
            instance.$refs.toolbar.find('[data-fancybox-fullscreen]').hide();
          }
        },
        'afterKeydown.fb': function afterKeydownFb(e, instance, current, keypress, keycode) {
          // "P" or Spacebar
          if (instance && instance.FullScreen && keycode === 70) {
            keypress.preventDefault();
            instance.FullScreen.toggle(instance.$refs.container[0]);
          }
        },
        'beforeClose.fb': function beforeCloseFb(instance) {
          if (instance && instance.FullScreen) {
            FullScreen.exit();
          }
        }
      });
      $(document).on(fn.fullscreenchange, function () {
        var isFullscreen = FullScreen.isFullscreen(),
            instance = $.fancybox.getInstance();

        if (instance) {
          // If image is zooming, then force to stop and reposition properly
          if (instance.current && instance.current.type === 'image' && instance.isAnimating) {
            instance.current.$content.css('transition', 'none');
            instance.isAnimating = false;
            instance.update(true, true, 0);
          }

          instance.trigger('onFullscreenChange', isFullscreen);
          instance.$refs.container.toggleClass('fancybox-is-fullscreen', isFullscreen);
        }
      });
    })(document, window.jQuery || jQuery); // ==========================================================================

    (function (document, $) {

      $.fancybox.defaults = $.extend(true, {
        btnTpl: {
          thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' + '<svg viewBox="0 0 120 120">' + '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' + '</svg>' + '</button>'
        },
        thumbs: {
          autoStart: false,
          // Display thumbnails on opening
          hideOnClose: true,
          // Hide thumbnail grid when closing animation starts
          parentEl: '.fancybox-container',
          // Container is injected into this element
          axis: 'y' // Vertical (y) or horizontal (x) scrolling

        }
      }, $.fancybox.defaults);

      var FancyThumbs = function FancyThumbs(instance) {
        this.init(instance);
      };

      $.extend(FancyThumbs.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: false,
        isActive: false,
        init: function init(instance) {
          var self = this;
          self.instance = instance;
          instance.Thumbs = self; // Enable thumbs if at least two group items have thumbnails

          var first = instance.group[0],
              second = instance.group[1];
          self.opts = instance.group[instance.currIndex].opts.thumbs;
          self.$button = instance.$refs.toolbar.find('[data-fancybox-thumbs]');

          if (self.opts && first && second && (first.type == 'image' || first.opts.thumb || first.opts.$thumb) && (second.type == 'image' || second.opts.thumb || second.opts.$thumb)) {
            self.$button.show().on('click', function () {
              self.toggle();
            });
            self.isActive = true;
          } else {
            self.$button.hide();
          }
        },
        create: function create() {
          var self = this,
              instance = self.instance,
              parentEl = self.opts.parentEl,
              list,
              src;
          self.$grid = $('<div class="fancybox-thumbs fancybox-thumbs-' + self.opts.axis + '"></div>').appendTo(instance.$refs.container.find(parentEl).addBack().filter(parentEl)); // Build list HTML

          list = '<ul>';
          $.each(instance.group, function (i, item) {
            src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr('src') : null);

            if (!src && item.type === 'image') {
              src = item.src;
            }

            if (src && src.length) {
              list += '<li data-index="' + i + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + src + '" /></li>';
            }
          });
          list += '</ul>';
          self.$list = $(list).appendTo(self.$grid).on('click', 'li', function () {
            instance.jumpTo($(this).data('index'));
          });
          self.$list.find('img').hide().one('load', function () {
            var $parent = $(this).parent().removeClass('fancybox-thumbs-loading'),
                thumbWidth = $parent.outerWidth(),
                thumbHeight = $parent.outerHeight(),
                width,
                height,
                widthRatio,
                heightRatio;
            width = this.naturalWidth || this.width;
            height = this.naturalHeight || this.height; // Calculate thumbnail dimensions; center vertically and horizontally

            widthRatio = width / thumbWidth;
            heightRatio = height / thumbHeight;

            if (widthRatio >= 1 && heightRatio >= 1) {
              if (widthRatio > heightRatio) {
                width = width / heightRatio;
                height = thumbHeight;
              } else {
                width = thumbWidth;
                height = height / widthRatio;
              }
            }

            $(this).css({
              width: Math.floor(width),
              height: Math.floor(height),
              'margin-top': height > thumbHeight ? Math.floor(thumbHeight * 0.3 - height * 0.3) : Math.floor(thumbHeight * 0.5 - height * 0.5),
              'margin-left': Math.floor(thumbWidth * 0.5 - width * 0.5)
            }).show();
          }).each(function () {
            this.src = $(this).data('src');
          });

          if (self.opts.axis === 'x') {
            self.$list.width(parseInt(self.$grid.css("padding-right")) + instance.group.length * self.$list.children().eq(0).outerWidth(true) + 'px');
          }
        },
        focus: function focus(duration) {
          var self = this,
              $list = self.$list,
              thumb,
              thumbPos;

          if (self.instance.current) {
            thumb = $list.children().removeClass('fancybox-thumbs-active').filter('[data-index="' + self.instance.current.index + '"]').addClass('fancybox-thumbs-active');
            thumbPos = thumb.position(); // Check if need to scroll to make current thumb visible

            if (self.opts.axis === 'y' && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
              $list.stop().animate({
                'scrollTop': $list.scrollTop() + thumbPos.top
              }, duration);
            } else if (self.opts.axis === 'x' && (thumbPos.left < $list.parent().scrollLeft() || thumbPos.left > $list.parent().scrollLeft() + ($list.parent().width() - thumb.outerWidth()))) {
              $list.parent().stop().animate({
                'scrollLeft': thumbPos.left
              }, duration);
            }
          }
        },
        update: function update() {
          this.instance.$refs.container.toggleClass('fancybox-show-thumbs', this.isVisible);

          if (this.isVisible) {
            if (!this.$grid) {
              this.create();
            }

            this.instance.trigger('onThumbsShow');
            this.focus(0);
          } else if (this.$grid) {
            this.instance.trigger('onThumbsHide');
          } // Update content position


          this.instance.update();
        },
        hide: function hide() {
          this.isVisible = false;
          this.update();
        },
        show: function show() {
          this.isVisible = true;
          this.update();
        },
        toggle: function toggle() {
          this.isVisible = !this.isVisible;
          this.update();
        }
      });
      $(document).on({
        'onInit.fb': function onInitFb(e, instance) {
          var Thumbs;

          if (instance && !instance.Thumbs) {
            Thumbs = new FancyThumbs(instance);

            if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
              Thumbs.show();
            }
          }
        },
        'beforeShow.fb': function beforeShowFb(e, instance, item, firstRun) {
          var Thumbs = instance && instance.Thumbs;

          if (Thumbs && Thumbs.isVisible) {
            Thumbs.focus(firstRun ? 0 : 250);
          }
        },
        'afterKeydown.fb': function afterKeydownFb(e, instance, current, keypress, keycode) {
          var Thumbs = instance && instance.Thumbs; // "G"

          if (Thumbs && Thumbs.isActive && keycode === 71) {
            keypress.preventDefault();
            Thumbs.toggle();
          }
        },
        'beforeClose.fb': function beforeCloseFb(e, instance) {
          var Thumbs = instance && instance.Thumbs;

          if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
            Thumbs.$grid.hide();
          }
        }
      });
    })(document, window.jQuery); //// ==========================================================================

    (function (document, $) {

      $.extend(true, $.fancybox.defaults, {
        btnTpl: {
          share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' + '</svg>' + '</button>'
        },
        share: {
          tpl: '<div class="fancybox-share">' + '<h1>{{SHARE}}</h1>' + '<p>' + '<a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button">' + '<svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg>' + '<span>Facebook</span>' + '</a>' + '<a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button">' + '<svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg>' + '<span>Pinterest</span>' + '</a>' + '<a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button">' + '<svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg>' + '<span>Twitter</span>' + '</a>' + '</p>' + '<p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p>' + '</div>'
        }
      });

      function escapeHtml(string) {
        var entityMap = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;',
          '`': '&#x60;',
          '=': '&#x3D;'
        };
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
          return entityMap[s];
        });
      }

      $(document).on('click', '[data-fancybox-share]', function () {
        var f = $.fancybox.getInstance(),
            url,
            tpl;

        if (f) {
          url = f.current.opts.hash === false ? f.current.src : window.location;
          tpl = f.current.opts.share.tpl.replace(/\{\{src\}\}/g, encodeURIComponent(url)).replace(/\{\{src_raw\}\}/g, escapeHtml(url)).replace(/\{\{descr\}\}/g, f.$caption ? encodeURIComponent(f.$caption.text()) : '');
          $.fancybox.open({
            src: f.translate(f, tpl),
            type: 'html',
            opts: {
              animationEffect: "fade",
              animationDuration: 250
            }
          });
        }
      });
    })(document, window.jQuery || jQuery); // ==========================================================================

    (function (document, window, $) {

      if (!$.escapeSelector) {
        $.escapeSelector = function (sel) {
          var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

          var fcssescape = function fcssescape(ch, asCodePoint) {
            if (asCodePoint) {
              // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
              if (ch === "\0") {
                return "\uFFFD";
              } // Control characters and (dependent upon position) numbers get escaped as code points


              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            } // Other potentially-special ASCII characters get backslash-escaped


            return "\\" + ch;
          };

          return (sel + "").replace(rcssescape, fcssescape);
        };
      } // Create new history entry only once


      var shouldCreateHistory = true; // Variable containing last hash value set by fancyBox
      // It will be used to determine if fancyBox needs to close after hash change is detected

      var currentHash = null; // Throttling the history change

      var timerID = null; // Get info about gallery name and current index from url

      function parseUrl() {
        var hash = window.location.hash.substr(1);
        var rez = hash.split('-');
        var index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1;
        var gallery = rez.join('-'); // Index is starting from 1

        if (index < 1) {
          index = 1;
        }

        return {
          hash: hash,
          index: index,
          gallery: gallery
        };
      } // Trigger click evnt on links to open new fancyBox instance


      function triggerFromUrl(url) {
        var $el;

        if (url.gallery !== '') {
          // If we can find element matching 'data-fancybox' atribute, then trigger click event for that ..
          $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']").eq(url.index - 1);

          if (!$el.length) {
            // .. if not, try finding element by ID
            $el = $("#" + $.escapeSelector(url.gallery) + "");
          }

          if ($el.length) {
            shouldCreateHistory = false;
            $el.trigger('click');
          }
        }
      } // Get gallery name from current instance


      function getGalleryID(instance) {
        var opts;

        if (!instance) {
          return false;
        }

        opts = instance.current ? instance.current.opts : instance.opts;
        return opts.hash || (opts.$orig ? opts.$orig.data('fancybox') : '');
      } // Start when DOM becomes ready


      $(function () {
        // Check if user has disabled this module
        if ($.fancybox.defaults.hash === false) {
          return;
        } // Update hash when opening/closing fancyBox


        $(document).on({
          'onInit.fb': function onInitFb(e, instance) {
            var url, gallery;

            if (instance.group[instance.currIndex].opts.hash === false) {
              return;
            }

            url = parseUrl();
            gallery = getGalleryID(instance); // Make sure gallery start index matches index from hash

            if (gallery && url.gallery && gallery == url.gallery) {
              instance.currIndex = url.index - 1;
            }
          },
          'beforeShow.fb': function beforeShowFb(e, instance, current) {
            var gallery;

            if (!current || current.opts.hash === false) {
              return;
            }

            gallery = getGalleryID(instance); // Update window hash

            if (gallery && gallery !== '') {
              if (window.location.hash.indexOf(gallery) < 0) {
                instance.opts.origHash = window.location.hash;
              }

              currentHash = gallery + (instance.group.length > 1 ? '-' + (current.index + 1) : '');

              if ('replaceState' in window.history) {
                if (timerID) {
                  clearTimeout(timerID);
                }

                timerID = setTimeout(function () {
                  window.history[shouldCreateHistory ? 'pushState' : 'replaceState']({}, document.title, window.location.pathname + window.location.search + '#' + currentHash);
                  timerID = null;
                  shouldCreateHistory = false;
                }, 300);
              } else {
                window.location.hash = currentHash;
              }
            }
          },
          'beforeClose.fb': function beforeCloseFb(e, instance, current) {
            var gallery, origHash;

            if (timerID) {
              clearTimeout(timerID);
            }

            if (current.opts.hash === false) {
              return;
            }

            gallery = getGalleryID(instance);
            origHash = instance && instance.opts.origHash ? instance.opts.origHash : ''; // Remove hash from location bar

            if (gallery && gallery !== '') {
              if ('replaceState' in history) {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search + origHash);
              } else {
                window.location.hash = origHash; // Keep original scroll position

                $(window).scrollTop(instance.scrollTop).scrollLeft(instance.scrollLeft);
              }
            }

            currentHash = null;
          }
        }); // Check if need to close after url has changed

        $(window).on('hashchange.fb', function () {
          var url = parseUrl();

          if ($.fancybox.getInstance()) {
            if (currentHash && currentHash !== url.gallery + '-' + url.index && !(url.index === 1 && currentHash == url.gallery)) {
              currentHash = null;
              $.fancybox.close();
            }
          } else if (url.gallery !== '') {
            triggerFromUrl(url);
          }
        }); // Check current hash and trigger click event on matching element to start fancyBox, if needed

        setTimeout(function () {
          triggerFromUrl(parseUrl());
        }, 50);
      });
    })(document, window, window.jQuery || jQuery);

    (function (document, $) {

      var prevTime = new Date().getTime();
      $(document).on({
        'onInit.fb': function onInitFb(e, instance, current) {
          instance.$refs.stage.on('mousewheel DOMMouseScroll wheel MozMousePixelScroll', function (e) {
            var current = instance.current,
                currTime,
                value,
                delta,
                isHorizontal,
                isVertical;

            if (current.opts.wheel === false || current.opts.wheel === 'auto' && current.type !== 'image') {
              return;
            }

            if (current.$slide.hasClass('fancybox-animated')) {
              return;
            }

            if (instance.group.length < 1) {
              return;
            }

            e.preventDefault();
            e.stopPropagation();
            e = e.originalEvent || e;

            if (currTime - prevTime < 250) {
              return;
            }

            prevTime = currTime;
            value = e.wheelDelta || -e.deltaY || -e.detail;
            delta = Math.max(-1, Math.min(1, value));
            isHorizontal = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
            isVertical = !isHorizontal || Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta) || Math.abs(e.deltaX) < Math.abs(e.deltaY);

            if (delta < 0) {
              instance[isVertical ? 'previous' : 'next']();
            } else {
              instance[isVertical ? 'next' : 'previous']();
            }
          });
        }
      });
    })(document, window.jQuery || jQuery);

})));

(function (factory) {
	typeof define === 'function' && define.amd ? define('jqueryLazyloadMin', factory) :
	factory();
}((function () { 'use strict';

	/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
	!function (a, b, c, d) {
	  var e = a(b);
	  a.fn.lazyload = function (f) {
	    function g() {
	      var b = 0;
	      i.each(function () {
	        var c = a(this);
	        if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j)) ;else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
	          if (++b > j.failure_limit) return !1;
	        } else c.trigger("appear"), b = 0;
	      });
	    }

	    var h,
	        i = this,
	        j = {
	      threshold: 0,
	      failure_limit: 0,
	      event: "scroll",
	      effect: "show",
	      container: b,
	      data_attribute: "original",
	      skip_invisible: !1,
	      appear: null,
	      load: null,
	      placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
	    };
	    return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
	      return g();
	    }), this.each(function () {
	      var b = this,
	          c = a(b);
	      b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function () {
	        if (!this.loaded) {
	          if (j.appear) {
	            var d = i.length;
	            j.appear.call(b, d, j);
	          }

	          a("<img />").bind("load", function () {
	            var d = c.attr("data-" + j.data_attribute);
	            c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
	            var e = a.grep(i, function (a) {
	              return !a.loaded;
	            });

	            if (i = a(e), j.load) {
	              var f = i.length;
	              j.load.call(b, f, j);
	            }
	          }).attr("src", c.attr("data-" + j.data_attribute));
	        }
	      }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
	        b.loaded || c.trigger("appear");
	      });
	    }), e.bind("resize", function () {
	      g();
	    }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
	      b.originalEvent && b.originalEvent.persisted && i.each(function () {
	        a(this).trigger("appear");
	      });
	    }), a(c).ready(function () {
	      g();
	    }), this;
	  }, a.belowthefold = function (c, f) {
	    var g;
	    return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold;
	  }, a.rightoffold = function (c, f) {
	    var g;
	    return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold;
	  }, a.abovethetop = function (c, f) {
	    var g;
	    return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height();
	  }, a.leftofbegin = function (c, f) {
	    var g;
	    return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width();
	  }, a.inviewport = function (b, c) {
	    return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c));
	  }, a.extend(a.expr[":"], {
	    "below-the-fold": function belowTheFold(b) {
	      return a.belowthefold(b, {
	        threshold: 0
	      });
	    },
	    "above-the-top": function aboveTheTop(b) {
	      return !a.belowthefold(b, {
	        threshold: 0
	      });
	    },
	    "right-of-screen": function rightOfScreen(b) {
	      return a.rightoffold(b, {
	        threshold: 0
	      });
	    },
	    "left-of-screen": function leftOfScreen(b) {
	      return !a.rightoffold(b, {
	        threshold: 0
	      });
	    },
	    "in-viewport": function inViewport(b) {
	      return a.inviewport(b, {
	        threshold: 0
	      });
	    },
	    "above-the-fold": function aboveTheFold(b) {
	      return !a.belowthefold(b, {
	        threshold: 0
	      });
	    },
	    "right-of-fold": function rightOfFold(b) {
	      return a.rightoffold(b, {
	        threshold: 0
	      });
	    },
	    "left-of-fold": function leftOfFold(b) {
	      return !a.rightoffold(b, {
	        threshold: 0
	      });
	    }
	  });
	}(jQuery, window, document);

})));

(function (factory) {
  typeof define === 'function' && define.amd ? define('jqueryMmenuMin', factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /*
   * jQuery mmenu v5.7.6
   * @requires jQuery 1.7.0 or later
   *
   * mmenu.frebsite.nl
   *	
   * Copyright (c) Fred Heusschen
   * www.frebsite.nl
   *
   * License: CC-BY-NC-4.0
   * http://creativecommons.org/licenses/by-nc/4.0/
   */
  !function (e) {
    function t() {
      e[n].glbl || (r = {
        $wndw: e(window),
        $docu: e(document),
        $html: e("html"),
        $body: e("body")
      }, i = {}, a = {}, o = {}, e.each([i, a, o], function (e, t) {
        t.add = function (e) {
          e = e.split(" ");

          for (var n = 0, s = e.length; n < s; n++) {
            t[e[n]] = t.mm(e[n]);
          }
        };
      }), i.mm = function (e) {
        return "mm-" + e;
      }, i.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), i.umm = function (e) {
        return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e;
      }, a.mm = function (e) {
        return "mm-" + e;
      }, a.add("parent child"), o.mm = function (e) {
        return e + ".mm";
      }, o.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"), e[n]._c = i, e[n]._d = a, e[n]._e = o, e[n].glbl = r);
    }

    var n = "mmenu",
        s = "5.7.6";

    if (!(e[n] && e[n].version > s)) {
      e[n] = function (e, t, n) {
        this.$menu = e, this._api = ["bind", "initPanels", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
        var s = this.$pnls.children();
        return this._initAddons(), this.initPanels(s), "function" == typeof this.___debug && this.___debug(), this;
      }, e[n].version = s, e[n].addons = {}, e[n].uniqueId = 0, e[n].defaults = {
        extensions: [],
        initMenu: function initMenu() {},
        initPanels: function initPanels() {},
        navbar: {
          add: !0,
          title: "Menu",
          titleLink: "panel"
        },
        onClick: {
          setSelected: !0
        },
        slidingSubmenus: !0
      }, e[n].configuration = {
        classNames: {
          divider: "Divider",
          inset: "Inset",
          panel: "Panel",
          selected: "Selected",
          spacer: "Spacer",
          vertical: "Vertical"
        },
        clone: !1,
        openingInterval: 25,
        panelNodetype: "ul, ol, div",
        transitionDuration: 400
      }, e[n].prototype = {
        init: function init(e) {
          this.initPanels(e);
        },
        initPanels: function initPanels(e) {
          e = e.not("." + i.nopanel), e = this._initPanels(e), this.opts.initPanels.call(this, e), this.trigger("initPanels", e), this.trigger("update");
        },
        update: function update() {
          this.trigger("update");
        },
        setSelected: function setSelected(e) {
          this.$menu.find("." + i.listview).children().removeClass(i.selected), e.addClass(i.selected), this.trigger("setSelected", e);
        },
        openPanel: function openPanel(t) {
          var s = t.parent(),
              a = this;

          if (s.hasClass(i.vertical)) {
            var o = s.parents("." + i.subopened);
            if (o.length) return void this.openPanel(o.first());
            s.addClass(i.opened), this.trigger("openPanel", t), this.trigger("openingPanel", t), this.trigger("openedPanel", t);
          } else {
            if (t.hasClass(i.current)) return;
            var r = this.$pnls.children("." + i.panel),
                l = r.filter("." + i.current);
            r.removeClass(i.highest).removeClass(i.current).not(t).not(l).not("." + i.vertical).addClass(i.hidden), e[n].support.csstransitions || l.addClass(i.hidden), t.hasClass(i.opened) ? t.nextAll("." + i.opened).addClass(i.highest).removeClass(i.opened).removeClass(i.subopened) : (t.addClass(i.highest), l.addClass(i.subopened)), t.removeClass(i.hidden).addClass(i.current), a.trigger("openPanel", t), setTimeout(function () {
              t.removeClass(i.subopened).addClass(i.opened), a.trigger("openingPanel", t), a.__transitionend(t, function () {
                a.trigger("openedPanel", t);
              }, a.conf.transitionDuration);
            }, this.conf.openingInterval);
          }
        },
        closePanel: function closePanel(e) {
          var t = e.parent();
          t.hasClass(i.vertical) && (t.removeClass(i.opened), this.trigger("closePanel", e), this.trigger("closingPanel", e), this.trigger("closedPanel", e));
        },
        closeAllPanels: function closeAllPanels() {
          this.$menu.find("." + i.listview).children().removeClass(i.selected).filter("." + i.vertical).removeClass(i.opened);
          var e = this.$pnls.children("." + i.panel),
              t = e.first();
          this.$pnls.children("." + i.panel).not(t).removeClass(i.subopened).removeClass(i.opened).removeClass(i.current).removeClass(i.highest).addClass(i.hidden), this.openPanel(t);
        },
        togglePanel: function togglePanel(e) {
          var t = e.parent();
          t.hasClass(i.vertical) && this[t.hasClass(i.opened) ? "closePanel" : "openPanel"](e);
        },
        getInstance: function getInstance() {
          return this;
        },
        bind: function bind(e, t) {
          e = "init" == e ? "initPanels" : e, this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t);
        },
        trigger: function trigger() {
          var e = this,
              t = Array.prototype.slice.call(arguments),
              n = t.shift();
          if (n = "init" == n ? "initPanels" : n, this.cbck[n]) for (var s = 0, i = this.cbck[n].length; s < i; s++) {
            this.cbck[n][s].apply(e, t);
          }
        },
        _initMenu: function _initMenu() {
          this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function () {
            e(this).attr("id", i.mm(e(this).attr("id")));
          })), this.opts.initMenu.call(this, this.$menu, this.$orig), this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.$pnls = e('<div class="' + i.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(i.wrapper);
          var t = [i.menu];
          this.opts.slidingSubmenus || t.push(i.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && t.push(this.opts.extensions), this.$menu.addClass(t.join(" "));
        },
        _initPanels: function _initPanels(t) {
          var n = this,
              s = this.__findAddBack(t, "ul, ol");

          this.__refactorClass(s, this.conf.classNames.inset, "inset").addClass(i.nolistview + " " + i.nopanel), s.not("." + i.nolistview).addClass(i.listview);

          var o = this.__findAddBack(t, "." + i.listview).children();

          this.__refactorClass(o, this.conf.classNames.selected, "selected"), this.__refactorClass(o, this.conf.classNames.divider, "divider"), this.__refactorClass(o, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(t, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
          var r = e(),
              l = t.add(t.find("." + i.panel)).add(this.__findAddBack(t, "." + i.listview).children().children(this.conf.panelNodetype)).not("." + i.nopanel);
          this.__refactorClass(l, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || l.addClass(i.vertical), l.each(function () {
            var t = e(this),
                s = t;
            t.is("ul, ol") ? (t.wrap('<div class="' + i.panel + '" />'), s = t.parent()) : s.addClass(i.panel);
            var a = t.attr("id");
            t.removeAttr("id"), s.attr("id", a || n.__getUniqueId()), t.hasClass(i.vertical) && (t.removeClass(n.conf.classNames.vertical), s.add(s.parent()).addClass(i.vertical)), r = r.add(s);
          });
          var d = e("." + i.panel, this.$menu);
          r.each(function (t) {
            var s,
                o,
                r = e(this),
                l = r.parent(),
                d = l.children("a, span").first();

            if (l.is("." + i.panels) || (l.data(a.child, r), r.data(a.parent, l)), l.children("." + i.next).length || l.parent().is("." + i.listview) && (s = r.attr("id"), o = e('<a class="' + i.next + '" href="#' + s + '" data-target="#' + s + '" />').insertBefore(d), d.is("span") && o.addClass(i.fullsubopen)), !r.children("." + i.navbar).length && !l.hasClass(i.vertical)) {
              l.parent().is("." + i.listview) ? l = l.closest("." + i.panel) : (d = l.closest("." + i.panel).find('a[href="#' + r.attr("id") + '"]').first(), l = d.closest("." + i.panel));
              var c = !1,
                  p = e('<div class="' + i.navbar + '" />');

              if (n.opts.navbar.add && r.addClass(i.hasnavbar), l.length) {
                switch (s = l.attr("id"), n.opts.navbar.titleLink) {
                  case "anchor":
                    c = d.attr("href");
                    break;

                  case "panel":
                  case "parent":
                    c = "#" + s;
                    break;

                  default:
                    c = !1;
                }

                p.append('<a class="' + i.btn + " " + i.prev + '" href="#' + s + '" data-target="#' + s + '" />').append(e('<a class="' + i.title + '"' + (c ? ' href="' + c + '"' : "") + " />").text(d.text())).prependTo(r);
              } else n.opts.navbar.title && p.append('<a class="' + i.title + '">' + n.opts.navbar.title + "</a>").prependTo(r);
            }
          });

          var c = this.__findAddBack(t, "." + i.listview).children("." + i.selected).removeClass(i.selected).last().addClass(i.selected);

          c.add(c.parentsUntil("." + i.menu, "li")).filter("." + i.vertical).addClass(i.opened).end().each(function () {
            e(this).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).addClass(i.subopened);
          }), c.children("." + i.panel).not("." + i.vertical).addClass(i.opened).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).addClass(i.subopened);
          var p = d.filter("." + i.opened);
          return p.length || (p = r.first()), p.addClass(i.opened).last().addClass(i.current), r.not("." + i.vertical).not(p.last()).addClass(i.hidden).end().filter(function () {
            return !e(this).parent().hasClass(i.panels);
          }).appendTo(this.$pnls), r;
        },
        _initAnchors: function _initAnchors() {
          var t = this;
          r.$body.on(o.click + "-oncanvas", "a[href]", function (s) {
            var a = e(this),
                o = !1,
                r = t.$menu.find(a).length;

            for (var l in e[n].addons) {
              if (e[n].addons[l].clickAnchor.call(t, a, r)) {
                o = !0;
                break;
              }
            }

            var d = a.attr("href");
            if (!o && r && d.length > 1 && "#" == d.slice(0, 1)) try {
              var c = e(d, t.$menu);
              c.is("." + i.panel) && (o = !0, t[a.parent().hasClass(i.vertical) ? "togglePanel" : "openPanel"](c));
            } catch (p) {}

            if (o && s.preventDefault(), !o && r && a.is("." + i.listview + " > li > a") && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
              t.__valueOrFn(t.opts.onClick.setSelected, a) && t.setSelected(e(s.target).parent());

              var h = t.__valueOrFn(t.opts.onClick.preventDefault, a, "#" == d.slice(0, 1));

              h && s.preventDefault(), t.__valueOrFn(t.opts.onClick.close, a, h) && t.close();
            }
          });
        },
        _initAddons: function _initAddons() {
          var t;

          for (t in e[n].addons) {
            e[n].addons[t].add.call(this), e[n].addons[t].add = function () {};
          }

          for (t in e[n].addons) {
            e[n].addons[t].setup.call(this);
          }
        },
        _getOriginalMenuId: function _getOriginalMenuId() {
          var e = this.$menu.attr("id");
          return e && e.length && this.conf.clone && (e = i.umm(e)), e;
        },
        __api: function __api() {
          var t = this,
              n = {};
          return e.each(this._api, function (e) {
            var s = this;

            n[s] = function () {
              var e = t[s].apply(t, arguments);
              return "undefined" == typeof e ? n : e;
            };
          }), n;
        },
        __valueOrFn: function __valueOrFn(e, t, n) {
          return "function" == typeof e ? e.call(t[0]) : "undefined" == typeof e && "undefined" != typeof n ? n : e;
        },
        __refactorClass: function __refactorClass(e, t, n) {
          return e.filter("." + t).removeClass(t).addClass(i[n]);
        },
        __findAddBack: function __findAddBack(e, t) {
          return e.find(t).add(e.filter(t));
        },
        __filterListItems: function __filterListItems(e) {
          return e.not("." + i.divider).not("." + i.hidden);
        },
        __transitionend: function __transitionend(t, n, s) {
          var i = !1,
              a = function a(s) {
            if ("undefined" != typeof s) {
              if (!e(s.target).is(t)) return !1;
              t.unbind(o.transitionend), t.unbind(o.webkitTransitionEnd);
            }

            i || n.call(t[0]), i = !0;
          };

          t.on(o.transitionend, a), t.on(o.webkitTransitionEnd, a), setTimeout(a, 1.1 * s);
        },
        __getUniqueId: function __getUniqueId() {
          return i.mm(e[n].uniqueId++);
        }
      }, e.fn[n] = function (s, i) {
        t(), s = e.extend(!0, {}, e[n].defaults, s), i = e.extend(!0, {}, e[n].configuration, i);
        var a = e();
        return this.each(function () {
          var t = e(this);

          if (!t.data(n)) {
            var o = new e[n](t, s, i);
            o.$menu.data(n, o.__api()), a = a.add(o.$menu);
          }
        }), a;
      }, e[n].support = {
        touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
        csstransitions: function () {
          if ("undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransitions) return Modernizr.csstransitions;
          var e = document.body || document.documentElement,
              t = e.style,
              n = "transition";
          if ("string" == typeof t[n]) return !0;
          var s = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
          n = n.charAt(0).toUpperCase() + n.substr(1);

          for (var i = 0; i < s.length; i++) {
            if ("string" == typeof t[s[i] + n]) return !0;
          }

          return !1;
        }(),
        csstransforms: function () {
          return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms || Modernizr.csstransforms;
        }(),
        csstransforms3d: function () {
          return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d;
        }()
      };
      var i, a, o, r;
    }
  }(jQuery),
  /*	
  * jQuery mmenu offCanvas addon
  * mmenu.frebsite.nl
  *
  * Copyright (c) Fred Heusschen
  */
  function (e) {
    var t = "mmenu",
        n = "offCanvas";
    e[t].addons[n] = {
      setup: function setup() {
        if (this.opts[n]) {
          var i = this.opts[n],
              a = this.conf[n];
          o = e[t].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), "top" != i.position && "bottom" != i.position || (i.zposition = "front"), "string" != typeof a.pageSelector && (a.pageSelector = "> " + a.pageNodetype), o.$allMenus = (o.$allMenus || e()).add(this.$menu), this.vars.opened = !1;
          var r = [s.offcanvas];
          "left" != i.position && r.push(s.mm(i.position)), "back" != i.zposition && r.push(s.mm(i.zposition)), this.$menu.addClass(r.join(" ")).parent().removeClass(s.wrapper), e[t].support.csstransforms || this.$menu.addClass(s["no-csstransforms"]), e[t].support.csstransforms3d || this.$menu.addClass(s["no-csstransforms3d"]), this.setPage(o.$page), this._initBlocker(), this["_initWindow_" + n](), this.$menu[a.menuInjectMethod + "To"](a.menuWrapperSelector);
          var l = window.location.hash;

          if (l) {
            var d = this._getOriginalMenuId();

            d && d == l.slice(1) && this.open();
          }
        }
      },
      add: function add() {
        s = e[t]._c, i = e[t]._d, a = e[t]._e, s.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"), i.add("style"), a.add("resize");
      },
      clickAnchor: function clickAnchor(e, t) {
        var i = this;

        if (this.opts[n]) {
          var a = this._getOriginalMenuId();

          if (a && e.is('[href="#' + a + '"]')) {
            if (t) return !0;
            var r = e.closest("." + s.menu);

            if (r.length) {
              var l = r.data("mmenu");
              if (l && l.close) return l.close(), i.__transitionend(r, function () {
                i.open();
              }, i.conf.transitionDuration), !0;
            }

            return this.open(), !0;
          }

          if (o.$page) return a = o.$page.first().attr("id"), a && e.is('[href="#' + a + '"]') ? (this.close(), !0) : void 0;
        }
      }
    }, e[t].defaults[n] = {
      position: "left",
      zposition: "back",
      blockUI: !0,
      moveBackground: !0
    }, e[t].configuration[n] = {
      pageNodetype: "div",
      pageSelector: null,
      noPageSelector: [],
      wrapPageIfNeeded: !0,
      menuWrapperSelector: "body",
      menuInjectMethod: "prepend"
    }, e[t].prototype.open = function () {
      if (!this.vars.opened) {
        var e = this;
        this._openSetup(), setTimeout(function () {
          e._openFinish();
        }, this.conf.openingInterval), this.trigger("open");
      }
    }, e[t].prototype._openSetup = function () {
      var t = this,
          r = this.opts[n];
      this.closeAllOthers(), o.$page.each(function () {
        e(this).data(i.style, e(this).attr("style") || "");
      }), o.$wndw.trigger(a.resize + "-" + n, [!0]);
      var l = [s.opened];
      r.blockUI && l.push(s.blocking), "modal" == r.blockUI && l.push(s.modal), r.moveBackground && l.push(s.background), "left" != r.position && l.push(s.mm(this.opts[n].position)), "back" != r.zposition && l.push(s.mm(this.opts[n].zposition)), this.opts.extensions && l.push(this.opts.extensions), o.$html.addClass(l.join(" ")), setTimeout(function () {
        t.vars.opened = !0;
      }, this.conf.openingInterval), this.$menu.addClass(s.current + " " + s.opened);
    }, e[t].prototype._openFinish = function () {
      var e = this;
      this.__transitionend(o.$page.first(), function () {
        e.trigger("opened");
      }, this.conf.transitionDuration), o.$html.addClass(s.opening), this.trigger("opening");
    }, e[t].prototype.close = function () {
      if (this.vars.opened) {
        var t = this;
        this.__transitionend(o.$page.first(), function () {
          t.$menu.removeClass(s.current + " " + s.opened);
          var a = [s.opened, s.blocking, s.modal, s.background, s.mm(t.opts[n].position), s.mm(t.opts[n].zposition)];
          t.opts.extensions && a.push(t.opts.extensions), o.$html.removeClass(a.join(" ")), o.$page.each(function () {
            e(this).attr("style", e(this).data(i.style));
          }), t.vars.opened = !1, t.trigger("closed");
        }, this.conf.transitionDuration), o.$html.removeClass(s.opening), this.trigger("close"), this.trigger("closing");
      }
    }, e[t].prototype.closeAllOthers = function () {
      o.$allMenus.not(this.$menu).each(function () {
        var n = e(this).data(t);
        n && n.close && n.close();
      });
    }, e[t].prototype.setPage = function (t) {
      var i = this,
          a = this.conf[n];
      t && t.length || (t = o.$body.find(a.pageSelector), a.noPageSelector.length && (t = t.not(a.noPageSelector.join(", "))), t.length > 1 && a.wrapPageIfNeeded && (t = t.wrapAll("<" + this.conf[n].pageNodetype + " />").parent())), t.each(function () {
        e(this).attr("id", e(this).attr("id") || i.__getUniqueId());
      }), t.addClass(s.page + " " + s.slideout), o.$page = t, this.trigger("setPage", t);
    }, e[t].prototype["_initWindow_" + n] = function () {
      o.$wndw.off(a.keydown + "-" + n).on(a.keydown + "-" + n, function (e) {
        if (o.$html.hasClass(s.opened) && 9 == e.keyCode) return e.preventDefault(), !1;
      });
      var e = 0;
      o.$wndw.off(a.resize + "-" + n).on(a.resize + "-" + n, function (t, n) {
        if (1 == o.$page.length && (n || o.$html.hasClass(s.opened))) {
          var i = o.$wndw.height();
          (n || i != e) && (e = i, o.$page.css("minHeight", i));
        }
      });
    }, e[t].prototype._initBlocker = function () {
      var t = this;
      this.opts[n].blockUI && (o.$blck || (o.$blck = e('<div id="' + s.blocker + '" class="' + s.slideout + '" />')), o.$blck.appendTo(o.$body).off(a.touchstart + "-" + n + " " + a.touchmove + "-" + n).on(a.touchstart + "-" + n + " " + a.touchmove + "-" + n, function (e) {
        e.preventDefault(), e.stopPropagation(), o.$blck.trigger(a.mousedown + "-" + n);
      }).off(a.mousedown + "-" + n).on(a.mousedown + "-" + n, function (e) {
        e.preventDefault(), o.$html.hasClass(s.modal) || (t.closeAllOthers(), t.close());
      }));
    };
    var s, i, a, o;
  }(jQuery),
  /*	
  * jQuery mmenu scrollBugFix addon
  * mmenu.frebsite.nl
  *
  * Copyright (c) Fred Heusschen
  */
  function (e) {
    var t = "mmenu",
        n = "scrollBugFix";
    e[t].addons[n] = {
      setup: function setup() {
        var i = this,
            r = this.opts[n];
        this.conf[n];

        if (o = e[t].glbl, e[t].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof r && (r = {
          fix: r
        }), "object" != _typeof(r) && (r = {}), r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r), r.fix)) {
          var l = this.$menu.attr("id"),
              d = !1;
          this.bind("opening", function () {
            this.$pnls.children("." + s.current).scrollTop(0);
          }), o.$docu.on(a.touchmove, function (e) {
            i.vars.opened && e.preventDefault();
          }), o.$body.on(a.touchstart, "#" + l + "> ." + s.panels + "> ." + s.current, function (e) {
            i.vars.opened && (d || (d = !0, 0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1), d = !1));
          }).on(a.touchmove, "#" + l + "> ." + s.panels + "> ." + s.current, function (t) {
            i.vars.opened && e(this)[0].scrollHeight > e(this).innerHeight() && t.stopPropagation();
          }), o.$wndw.on(a.orientationchange, function () {
            i.$pnls.children("." + s.current).scrollTop(0).css({
              "-webkit-overflow-scrolling": "auto"
            }).css({
              "-webkit-overflow-scrolling": "touch"
            });
          });
        }
      },
      add: function add() {
        s = e[t]._c, i = e[t]._d, a = e[t]._e;
      },
      clickAnchor: function clickAnchor(e, t) {}
    }, e[t].defaults[n] = {
      fix: !0
    };
    var s, i, a, o;
  }(jQuery);

})));

(function (factory) {
  typeof define === 'function' && define.amd ? define('owlCarouselMin', factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * Owl Carousel v2.3.4
   * Copyright 2013-2018 David Deutsch
   * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
   */
  !function (a, b, c, d) {
    function e(b, c) {
      this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: {
          start: null,
          current: null
        },
        direction: null
      }, this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"]
        }
      }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
        this._handlers[c] = a.proxy(this[c], this);
      }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
        this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
      }, this)), a.each(e.Workers, a.proxy(function (b, c) {
        this._pipe.push({
          filter: c.filter,
          run: a.proxy(c.run, this)
        });
      }, this)), this.setup(), this.initialize();
    }

    e.Defaults = {
      items: 3,
      loop: !1,
      center: !1,
      rewind: !1,
      checkVisibility: !0,
      mouseDrag: !0,
      touchDrag: !0,
      pullDrag: !0,
      freeDrag: !1,
      margin: 0,
      stagePadding: 0,
      merge: !1,
      mergeFit: !0,
      autoWidth: !1,
      startPosition: 0,
      rtl: !1,
      smartSpeed: 250,
      fluidSpeed: !1,
      dragEndSpeed: !1,
      responsive: {},
      responsiveRefreshRate: 200,
      responsiveBaseElement: b,
      fallbackEasing: "swing",
      slideTransition: "",
      info: !1,
      nestedItemSelector: !1,
      itemElement: "div",
      stageElement: "div",
      refreshClass: "owl-refresh",
      loadedClass: "owl-loaded",
      loadingClass: "owl-loading",
      rtlClass: "owl-rtl",
      responsiveClass: "owl-responsive",
      dragClass: "owl-drag",
      itemClass: "owl-item",
      stageClass: "owl-stage",
      stageOuterClass: "owl-stage-outer",
      grabClass: "owl-grab"
    }, e.Width = {
      Default: "default",
      Inner: "inner",
      Outer: "outer"
    }, e.Type = {
      Event: "event",
      State: "state"
    }, e.Plugins = {}, e.Workers = [{
      filter: ["width", "settings"],
      run: function run() {
        this._width = this.$element.width();
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run(a) {
        a.current = this._items && this._items[this.relative(this._current)];
      }
    }, {
      filter: ["items", "settings"],
      run: function run() {
        this.$stage.children(".cloned").remove();
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run(a) {
        var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
          width: "auto",
          "margin-left": d ? b : "",
          "margin-right": d ? "" : b
        };
        !c && this.$stage.children().css(e), a.css = e;
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run(a) {
        var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];

        for (a.items = {
          merge: !1,
          width: b
        }; d--;) {
          c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
        }

        this._widths = f;
      }
    }, {
      filter: ["items", "settings"],
      run: function run() {
        var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
            h = "",
            i = "";

        for (g /= 2; g > 0;) {
          b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;
        }

        this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage);
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run() {
        for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) {
          d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
        }

        this._coordinates = f;
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run() {
        var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
          width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
          "padding-left": a || "",
          "padding-right": a || ""
        };
        this.$stage.css(c);
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run(a) {
        var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
        if (c && a.items.merge) for (; b--;) {
          a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
        } else c && (a.css.width = a.items.width, d.css(a.css));
      }
    }, {
      filter: ["items"],
      run: function run() {
        this._coordinates.length < 1 && this.$stage.removeAttr("style");
      }
    }, {
      filter: ["width", "items", "settings"],
      run: function run(a) {
        a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current);
      }
    }, {
      filter: ["position"],
      run: function run() {
        this.animate(this.coordinates(this._current));
      }
    }, {
      filter: ["width", "position", "items", "settings"],
      run: function run() {
        var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];

        for (c = 0, d = this._coordinates.length; c < d; c++) {
          a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
        }

        this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
      }
    }], e.prototype.initializeStage = function () {
      this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
        "class": this.settings.stageClass
      }).wrap(a("<div/>", {
        "class": this.settings.stageOuterClass
      })), this.$element.append(this.$stage.parent()));
    }, e.prototype.initializeItems = function () {
      var b = this.$element.find(".owl-item");
      if (b.length) return this._items = b.get().map(function (b) {
        return a(b);
      }), this._mergers = this._items.map(function () {
        return 1;
      }), void this.refresh();
      this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
    }, e.prototype.initialize = function () {
      if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
        var a, b, c;
        a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a);
      }

      this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
    }, e.prototype.isVisible = function () {
      return !this.settings.checkVisibility || this.$element.is(":visible");
    }, e.prototype.setup = function () {
      var b = this.viewport(),
          c = this.options.responsive,
          d = -1,
          e = null;
      c ? (a.each(c, function (a) {
        a <= b && a > d && (d = Number(a));
      }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
        property: {
          name: "settings",
          value: e
        }
      }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
        property: {
          name: "settings",
          value: this.settings
        }
      });
    }, e.prototype.optionsLogic = function () {
      this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
    }, e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", {
        content: b
      });
      return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
        content: c.data
      }), c.data;
    }, e.prototype.update = function () {
      for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
        return this[a];
      }, this._invalidated), e = {}; b < c;) {
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
      }

      this._invalidated = {}, !this.is("valid") && this.enter("valid");
    }, e.prototype.width = function (a) {
      switch (a = a || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;

        default:
          return this._width - 2 * this.settings.stagePadding + this.settings.margin;
      }
    }, e.prototype.refresh = function () {
      this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed");
    }, e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
    }, e.prototype.onResize = function () {
      return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")));
    }, e.prototype.registerEventHandlers = function () {
      a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
        return !1;
      })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)));
    }, e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
        x: d[16 === d.length ? 12 : 4],
        y: d[16 === d.length ? 13 : 5]
      }) : (d = this.$stage.position(), d = {
        x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
        y: d.top
      }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = new Date().getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
        var d = this.difference(this._drag.pointer, this.pointer(b));
        a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"));
      }, this)));
    }, e.prototype.onDragMove = function (a) {
      var b = null,
          c = null,
          d = null,
          e = this.difference(this._drag.pointer, this.pointer(a)),
          f = this.difference(this._drag.stage.start, e);
      this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x));
    }, e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
          e = this._drag.stage.current,
          f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
        return !1;
      })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
    }, e.prototype.closest = function (b, c) {
      var e = -1,
          f = 30,
          g = this.width(),
          h = this.coordinates();
      return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
        return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e;
      }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e;
    }, e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
        transform: "translate3d(" + b + "px,0px,0px)",
        transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
      }) : c ? this.$stage.animate({
        left: b + "px"
      }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
        left: b + "px"
      });
    }, e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }, e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;

      if (a = this.normalize(a), this._current !== a) {
        var b = this.trigger("change", {
          property: {
            name: "position",
            value: a
          }
        });
        b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
          property: {
            name: "position",
            value: this._current
          }
        });
      }

      return this._current;
    }, e.prototype.invalidate = function (b) {
      return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
        return b;
      });
    }, e.prototype.reset = function (a) {
      (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]));
    }, e.prototype.normalize = function (a, b) {
      var c = this._items.length,
          e = b ? 0 : this._clones.length;
      return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a;
    }, e.prototype.relative = function (a) {
      return a -= this._clones.length / 2, this.normalize(a, !0);
    }, e.prototype.maximum = function (a) {
      var b,
          c,
          d,
          e = this.settings,
          f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;else if (e.autoWidth || e.merge) {
        if (b = this._items.length) for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d);) {
        }
        f = b + 1;
      } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }, e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }, e.prototype.items = function (a) {
      return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]);
    }, e.prototype.mergers = function (a) {
      return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]);
    }, e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
          e = c + this._items.length,
          f = function f(a) {
        return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
      };

      return b === d ? a.map(this._clones, function (a, b) {
        return f(b);
      }) : a.map(this._clones, function (a, c) {
        return a === b ? f(c) : null;
      });
    }, e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }, e.prototype.coordinates = function (b) {
      var c,
          e = 1,
          f = b - 1;
      return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
        return this.coordinates(b);
      }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c));
    }, e.prototype.duration = function (a, b, c) {
      return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
    }, e.prototype.to = function (a, b) {
      var c = this.current(),
          d = null,
          e = a - this.relative(c),
          f = (e > 0) - (e < 0),
          g = this._items.length,
          h = this.minimum(),
          i = this.maximum();
      this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update();
    }, e.prototype.next = function (a) {
      a = a || !1, this.to(this.relative(this.current()) + 1, a);
    }, e.prototype.prev = function (a) {
      a = a || !1, this.to(this.relative(this.current()) - 1, a);
    }, e.prototype.onTransitionEnd = function (a) {
      if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
      this.leave("animating"), this.trigger("translated");
    }, e.prototype.viewport = function () {
      var d;
      return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d;
    }, e.prototype.replace = function (b) {
      this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
        return 1 === this.nodeType;
      }).each(a.proxy(function (a, b) {
        b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
      }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items");
    }, e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
        content: b,
        position: c
      }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
        content: b,
        position: c
      });
    }, e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
        content: this._items[a],
        position: a
      }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
        content: null,
        position: a
      }));
    }, e.prototype.preloadAutoWidthImages = function (b) {
      b.each(a.proxy(function (b, c) {
        this.enter("pre-loading"), c = a(c), a(new Image()).one("load", a.proxy(function (a) {
          c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
        }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"));
      }, this));
    }, e.prototype.destroy = function () {
      this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));

      for (var d in this._plugins) {
        this._plugins[d].destroy();
      }

      this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
    }, e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;

      switch (b) {
        case "<":
          return d ? a > c : a < c;

        case ">":
          return d ? a < c : a > c;

        case ">=":
          return d ? a <= c : a >= c;

        case "<=":
          return d ? a >= c : a <= c;
      }
    }, e.prototype.on = function (a, b, c, d) {
      a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
    }, e.prototype.off = function (a, b, c, d) {
      a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
    }, e.prototype.trigger = function (b, c, d, f, g) {
      var h = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
          i = a.camelCase(a.grep(["on", b, d], function (a) {
        return a;
      }).join("-").toLowerCase()),
          j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
        relatedTarget: this
      }, h, c));
      return this._supress[b] || (a.each(this._plugins, function (a, b) {
        b.onTrigger && b.onTrigger(j);
      }), this.register({
        type: e.Type.Event,
        name: b
      }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j;
    }, e.prototype.enter = function (b) {
      a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
        this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++;
      }, this));
    }, e.prototype.leave = function (b) {
      a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
        this._states.current[b]--;
      }, this));
    }, e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
          var c = a.event.special[b.name]._default;
          a.event.special[b.name]._default = function (a) {
            return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments);
          }, a.event.special[b.name].owl = !0;
        }
      } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
        return a.inArray(c, this._states.tags[b.name]) === d;
      }, this)));
    }, e.prototype.suppress = function (b) {
      a.each(b, a.proxy(function (a, b) {
        this._supress[b] = !0;
      }, this));
    }, e.prototype.release = function (b) {
      a.each(b, a.proxy(function (a, b) {
        delete this._supress[b];
      }, this));
    }, e.prototype.pointer = function (a) {
      var c = {
        x: null,
        y: null
      };
      return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c;
    }, e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }, e.prototype.difference = function (a, b) {
      return {
        x: a.x - b.x,
        y: a.y - b.y
      };
    }, a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
            f = d.data("owl.carousel");
        f || (f = new e(this, "object" == _typeof(b) && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
          f.register({
            type: e.Type.Event,
            name: c
          }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
            a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]));
          }, f));
        })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }, a.fn.owlCarousel.Constructor = e;
  }(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function e(b) {
      this._core = b, this._interval = null, this._visible = null, this._handlers = {
        "initialized.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.autoRefresh && this.watch();
        }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
    };

    e.Defaults = {
      autoRefresh: !0,
      autoRefreshInterval: 500
    }, e.prototype.watch = function () {
      this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval));
    }, e.prototype.refresh = function () {
      this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
    }, e.prototype.destroy = function () {
      var a, c;
      b.clearInterval(this._interval);

      for (a in this._handlers) {
        this._core.$element.off(a, this._handlers[a]);
      }

      for (c in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[c] && (this[c] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e;
  }(window.Zepto || window.jQuery, window), function (a, b, c, d) {
    var e = function e(b) {
      this._core = b, this._loaded = [], this._handlers = {
        "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
          if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
            var c = this._core.settings,
                e = c.center && Math.ceil(c.items / 2) || c.items,
                f = c.center && -1 * e || 0,
                g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
                h = this._core.clones().length,
                i = a.proxy(function (a, b) {
              this.load(b);
            }, this);

            for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) {
              this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++;
            }
          }
        }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
    };

    e.Defaults = {
      lazyLoad: !1,
      lazyLoadEager: 0
    }, e.prototype.load = function (c) {
      var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");

      !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
        var e,
            f = a(d),
            g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
        this._core.trigger("load", {
          element: f,
          url: g
        }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
          f.css("opacity", 1), this._core.trigger("loaded", {
            element: f,
            url: g
          }, "lazy");
        }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
          this._core.trigger("loaded", {
            element: f,
            url: g
          }, "lazy");
        }, this)).attr("srcset", g) : (e = new Image(), e.onload = a.proxy(function () {
          f.css({
            "background-image": 'url("' + g + '")',
            opacity: "1"
          }), this._core.trigger("loaded", {
            element: f,
            url: g
          }, "lazy");
        }, this), e.src = g);
      }, this)), this._loaded.push(d.get(0)));
    }, e.prototype.destroy = function () {
      var a, b;

      for (a in this.handlers) {
        this._core.$element.off(a, this.handlers[a]);
      }

      for (b in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[b] && (this[b] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e;
  }(window.Zepto || window.jQuery, window), function (a, b, c, d) {
    var e = function e(c) {
      this._core = c, this._previousHeight = null, this._handlers = {
        "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.autoHeight && this.update();
        }, this),
        "changed.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update();
        }, this),
        "loaded.owl.lazy": a.proxy(function (a) {
          a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
        }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
      var d = this;
      a(b).on("load", function () {
        d._core.settings.autoHeight && d.update();
      }), a(b).resize(function () {
        d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function () {
          d.update();
        }, 250));
      });
    };

    e.Defaults = {
      autoHeight: !1,
      autoHeightClass: "owl-height"
    }, e.prototype.update = function () {
      var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.settings.lazyLoad,
          e = this._core.$stage.children().toArray().slice(b, c),
          f = [],
          g = 0;

      a.each(e, function (b, c) {
        f.push(a(c).height());
      }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass);
    }, e.prototype.destroy = function () {
      var a, b;

      for (a in this._handlers) {
        this._core.$element.off(a, this._handlers[a]);
      }

      for (b in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[b] && (this[b] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e;
  }(window.Zepto || window.jQuery, window), function (a, b, c, d) {
    var e = function e(b) {
      this._core = b, this._videos = {}, this._playing = null, this._handlers = {
        "initialized.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.register({
            type: "state",
            name: "playing",
            tags: ["interacting"]
          });
        }, this),
        "resize.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault();
        }, this),
        "refreshed.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
        }, this),
        "changed.owl.carousel": a.proxy(function (a) {
          a.namespace && "position" === a.property.name && this._playing && this.stop();
        }, this),
        "prepared.owl.carousel": a.proxy(function (b) {
          if (b.namespace) {
            var c = a(b.content).find(".owl-video");
            c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
          }
        }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
        this.play(a);
      }, this));
    };

    e.Defaults = {
      video: !1,
      videoHeight: !1,
      videoWidth: !1
    }, e.prototype.fetch = function (a, b) {
      var c = function () {
        return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube";
      }(),
          d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");

      if (!g) throw new Error("Missing video URL.");
      if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";else if (d[3].indexOf("vimeo") > -1) c = "vimeo";else {
        if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
        c = "vzaar";
      }
      d = d[6], this._videos[g] = {
        type: c,
        id: d,
        width: e,
        height: f
      }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
    }, e.prototype.thumbnail = function (b, c) {
      var d,
          e,
          f,
          g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function l(c) {
        e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
          "class": "owl-video-tn " + j,
          srcType: c
        }) : a("<div/>", {
          "class": "owl-video-tn",
          style: "opacity:1;background-image:url(" + c + ")"
        }), b.after(d), b.after(e);
      };

      if (b.wrap(a("<div/>", {
        "class": "owl-video-wrapper",
        style: g
      })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
      "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
        type: "GET",
        url: "//vimeo.com/api/v2/video/" + c.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function success(a) {
          f = a[0].thumbnail_large, l(f);
        }
      }) : "vzaar" === c.type && a.ajax({
        type: "GET",
        url: "//vzaar.com/api/videos/" + c.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function success(a) {
          f = a.framegrab_url, l(f);
        }
      });
    }, e.prototype.stop = function () {
      this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video");
    }, e.prototype.play = function (b) {
      var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();

      this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"));
    }, e.prototype.isInFullScreen = function () {
      var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
      return b && a(b).parent().hasClass("owl-video-frame");
    }, e.prototype.destroy = function () {
      var a, b;

      this._core.$element.off("click.owl.video");

      for (a in this._handlers) {
        this._core.$element.off(a, this._handlers[a]);
      }

      for (b in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[b] && (this[b] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e;
  }(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
    var e = function e(b) {
      this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
        "change.owl.carousel": a.proxy(function (a) {
          a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value);
        }, this),
        "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
          a.namespace && (this.swapping = "translated" == a.type);
        }, this),
        "translate.owl.carousel": a.proxy(function (a) {
          a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
        }, this)
      }, this.core.$element.on(this.handlers);
    };

    e.Defaults = {
      animateOut: !1,
      animateIn: !1
    }, e.prototype.swap = function () {
      if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
        this.core.speed(0);
        var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
        this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
          left: b + "px"
        }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f));
      }
    }, e.prototype.clear = function (b) {
      a(b.target).css({
        left: ""
      }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
    }, e.prototype.destroy = function () {
      var a, b;

      for (a in this.handlers) {
        this.core.$element.off(a, this.handlers[a]);
      }

      for (b in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[b] && (this[b] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e;
  }(window.Zepto || window.jQuery), function (a, b, c, d) {
    var e = function e(b) {
      this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
        "changed.owl.carousel": a.proxy(function (a) {
          a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0);
        }, this),
        "initialized.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.autoplay && this.play();
        }, this),
        "play.owl.autoplay": a.proxy(function (a, b, c) {
          a.namespace && this.play(b, c);
        }, this),
        "stop.owl.autoplay": a.proxy(function (a) {
          a.namespace && this.stop();
        }, this),
        "mouseover.owl.autoplay": a.proxy(function () {
          this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
        }, this),
        "mouseleave.owl.autoplay": a.proxy(function () {
          this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
        }, this),
        "touchstart.owl.core": a.proxy(function () {
          this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
        }, this),
        "touchend.owl.core": a.proxy(function () {
          this._core.settings.autoplayHoverPause && this.play();
        }, this)
      }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options);
    };

    e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1
    }, e.prototype._next = function (d) {
      this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed);
    }, e.prototype.read = function () {
      return new Date().getTime() - this._time;
    }, e.prototype.play = function (c, d) {
      var e;
      this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e);
    }, e.prototype.stop = function () {
      this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"));
    }, e.prototype.pause = function () {
      this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call));
    }, e.prototype.destroy = function () {
      var a, b;
      this.stop();

      for (a in this._handlers) {
        this._core.$element.off(a, this._handlers[a]);
      }

      for (b in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[b] && (this[b] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e;
  }(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {

    var e = function e(b) {
      this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
        next: this._core.next,
        prev: this._core.prev,
        to: this._core.to
      }, this._handlers = {
        "prepared.owl.carousel": a.proxy(function (b) {
          b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
        }, this),
        "added.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop());
        }, this),
        "remove.owl.carousel": a.proxy(function (a) {
          a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1);
        }, this),
        "changed.owl.carousel": a.proxy(function (a) {
          a.namespace && "position" == a.property.name && this.draw();
        }, this),
        "initialized.owl.carousel": a.proxy(function (a) {
          a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"));
        }, this),
        "refreshed.owl.carousel": a.proxy(function (a) {
          a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
        }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers);
    };

    e.Defaults = {
      nav: !1,
      navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1
    }, e.prototype.initialize = function () {
      var b,
          c = this._core.settings;
      this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
        this.prev(c.navSpeed);
      }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
        this.next(c.navSpeed);
      }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function (b) {
        var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
        b.preventDefault(), this.to(d, c.dotsSpeed);
      }, this));

      for (b in this._overrides) {
        this._core[b] = a.proxy(this[b], this);
      }
    }, e.prototype.destroy = function () {
      var a, b, c, d, e;
      e = this._core.settings;

      for (a in this._handlers) {
        this.$element.off(a, this._handlers[a]);
      }

      for (b in this._controls) {
        "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
      }

      for (d in this.overides) {
        this._core[d] = this._overrides[d];
      }

      for (c in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[c] && (this[c] = null);
      }
    }, e.prototype.update = function () {
      var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;

      if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
        if (b >= h || 0 === b) {
          if (this._pages.push({
            start: Math.min(f, a - d),
            end: a - d + h - 1
          }), Math.min(f, a - d) === f) break;
          b = 0, ++c;
        }

        b += this._core.mergers(this._core.relative(a));
      }
    }, e.prototype.draw = function () {
      var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;

      this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"));
    }, e.prototype.onTrigger = function (b) {
      var c = this._core.settings;
      b.page = {
        index: a.inArray(this.current(), this._pages),
        count: this._pages.length,
        size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
      };
    }, e.prototype.current = function () {
      var b = this._core.relative(this._core.current());

      return a.grep(this._pages, a.proxy(function (a, c) {
        return a.start <= b && a.end >= b;
      }, this)).pop();
    }, e.prototype.getPosition = function (b) {
      var c,
          d,
          e = this._core.settings;
      return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c;
    }, e.prototype.next = function (b) {
      a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
    }, e.prototype.prev = function (b) {
      a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
    }, e.prototype.to = function (b, c, d) {
      var e;
      !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c);
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e;
  }(window.Zepto || window.jQuery), function (a, b, c, d) {

    var e = function e(c) {
      this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
        "initialized.owl.carousel": a.proxy(function (c) {
          c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
        }, this),
        "prepared.owl.carousel": a.proxy(function (b) {
          if (b.namespace) {
            var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
            if (!c) return;
            this._hashes[c] = b.content;
          }
        }, this),
        "changed.owl.carousel": a.proxy(function (c) {
          if (c.namespace && "position" === c.property.name) {
            var d = this._core.items(this._core.relative(this._core.current())),
                e = a.map(this._hashes, function (a, b) {
              return a === d ? b : null;
            }).join();

            if (!e || b.location.hash.slice(1) === e) return;
            b.location.hash = e;
          }
        }, this)
      }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
        var c = b.location.hash.substring(1),
            e = this._core.$stage.children(),
            f = this._hashes[c] && e.index(this._hashes[c]);

        f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0);
      }, this));
    };

    e.Defaults = {
      URLhashListener: !1
    }, e.prototype.destroy = function () {
      var c, d;
      a(b).off("hashchange.owl.navigation");

      for (c in this._handlers) {
        this._core.$element.off(c, this._handlers[c]);
      }

      for (d in Object.getOwnPropertyNames(this)) {
        "function" != typeof this[d] && (this[d] = null);
      }
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e;
  }(window.Zepto || window.jQuery, window), function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
          f = b.charAt(0).toUpperCase() + b.slice(1);
      return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
        if (g[b] !== d) return e = !c || b, !1;
      }), e;
    }

    function f(a) {
      return e(a, !0);
    }

    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
      transition: {
        end: {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd",
          transition: "transitionend"
        }
      },
      animation: {
        end: {
          WebkitAnimation: "webkitAnimationEnd",
          MozAnimation: "animationend",
          OAnimation: "oAnimationEnd",
          animation: "animationend"
        }
      }
    },
        j = {
      csstransforms: function csstransforms() {
        return !!e("transform");
      },
      csstransforms3d: function csstransforms3d() {
        return !!e("perspective");
      },
      csstransitions: function csstransitions() {
        return !!e("transition");
      },
      cssanimations: function cssanimations() {
        return !!e("animation");
      }
    };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d());
  }(window.Zepto || window.jQuery);

})));

//# sourceMappingURL=../maps/script/plugins.js.map
