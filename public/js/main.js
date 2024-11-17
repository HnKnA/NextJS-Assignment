/* ===================================================================
 * Abstract - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  var cfg = {
      defAnimation: "fadeInUp", // default css animation
      scrollDuration: 800, // smoothscroll duration
      statsDuration: 4000, // stats animation duration
      mailChimpURL:
        "http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d",
    },
    $WIN = $(window);

  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function () {
    $(document).ready(function () {
      console.log("Initializing Preloader in ssPreloader");
      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });
    });
  };

  /* audio controls
   * -------------------------------------------------- */
  var ssMediaElementPlayer = function () {
    $("audio").mediaelementplayer({
      features: ["playpause", "progress", "tracks", "volume"],
    });
    console.log("Initializing audio controls in ssMediaElementPlayer");
  };

  /* FitVids
	------------------------------------------------------ */
  var ssFitVids = function () {
    $(".fluid-video-wrapper").fitVids();
    console.log("Initializing FitVids in ssFitVids");
  };

  /* pretty print
   * -------------------------------------------------- */
  var ssPrettyPrint = function () {
    $("pre").addClass("prettyprint");
    $(document).ready(function () {
      prettyPrint();
      console.log("Initializing pretty print in ssPrettyPrint");
    });
  };

  /* Alert Boxes **
  	------------------------------------------------------- */
  var ssAlertBoxes = function () {
    $(".alert-box").on("click", ".close", function () {
      $(this).parent().fadeOut(500);
      console.log("Initializing Alert Boxes in ssAlertBoxes");
    });
  };

  /* superfish
   * -------------------------------------------------- */
  var ssSuperFish = function () {
    $("ul.sf-menu").superfish({
      animation: { height: "show" }, // slide-down effect without fade-in
      animationOut: { height: "hide" }, // slide-up effect without fade-in
      cssArrows: false, // disable css arrows
      delay: 600, // .6 second delay on mouseout
    });
    console.log("Initializing superfish in ssSuperFish");
  };

  /* Mobile Menu
   ------------------------------------------------------ */
  var ssMobileNav = function () {
    var toggleButton = $(".menu-toggle"),
      nav = $(".main-navigation");

    toggleButton.on("click", function (event) {
      event.preventDefault();

      toggleButton.toggleClass("is-clicked");
      nav.slideToggle();
      console.log("Initializing Mobile Menu in ssMobileNav");
    });

    if (toggleButton.is(":visible")) nav.addClass("mobile");

    $WIN.resize(function () {
      if (toggleButton.is(":visible")) nav.addClass("mobile");
      else nav.removeClass("mobile");
      console.log("Initializing Mobile Menu in ssMobileNav");
    });

    $("#main-nav-wrap li a").on("click", function () {
      if (nav.hasClass("mobile")) {
        toggleButton.toggleClass("is-clicked");
        nav.fadeOut();
        console.log("Initializing Mobile Menu in ssMobileNav");
      }
    });
  };

  /* search
   * ------------------------------------------------------ */
  var ssSearch = function () {
    var searchWrap = $(".search-wrap");
    var searchField = searchWrap.find(".search-field");
    var closeSearch = $("#close-search");
    var searchTrigger = $(".search-trigger");
    var body = $("body");

    // Open the search
    searchTrigger.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      body.addClass("search-visible");
      setTimeout(function () {
        searchField.focus();
      }, 100);
      console.log("Search opened in ssSearch");
    });

    // Close the search
    closeSearch.on("click", function () {
      if (body.hasClass("search-visible")) {
        body.removeClass("search-visible");
        setTimeout(function () {
          searchField.blur();
        }, 100);
        console.log("Search closed in ssSearch");
      }
    });

    // Prevent the loop by checking if the target is closeSearch itself before triggering
    searchWrap.on("click", function (e) {
      if (!$(e.target).is(".search-field") && !$(e.target).is(closeSearch)) {
        body.removeClass("search-visible");
        setTimeout(function () {
          searchField.blur();
        }, 100);
        console.log("Search closed in ssSearch via searchWrap click");
      }
    });

    // Prevent propagation on the search field itself
    searchField.on("click", function (e) {
      e.stopPropagation();
    });

    // Set placeholder and autocomplete
    searchField.attr({
      placeholder: "Type Your Keywords",
      autocomplete: "off",
    });
  };

  /*	Masonry
	------------------------------------------------------ */
  var ssMasonryFolio = function () {
    var containerBricks = $(".bricks-wrapper");

    containerBricks.imagesLoaded(function () {
      containerBricks.masonry({
        itemSelector: ".entry",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        resize: true,
      });
      console.log("Initializing Masonry in ssMasonryFolio");
    });
  };

  /* animate bricks
   * ------------------------------------------------------ */
  var ssBricksAnimate = function () {
    var animateEl = $(".animate-this");

    $WIN.on("load", function () {
      console.log("Initializing animate bricks in ssBricksAnimate");
      setTimeout(function () {
        animateEl.each(function (ctr) {
          var el = $(this);

          setTimeout(function () {
            el.addClass("animated fadeInUp");
          }, ctr * 200);
        });
      }, 200);
    });

    $WIN.on("resize", function () {
      console.log("Remove animate bricks in ssBricksAnimate");
      // remove animation classes
      animateEl.removeClass("animate-this animated fadeInUp");
    });
  };

  /* Flex Slider
   * ------------------------------------------------------ */
  var ssFlexSlider = function () {
    $(document).ready(function () {
      console.log("Initializing Flex Slider in ssFlexSlider");

      $("#featured-post-slider").flexslider({
        namespace: "flex-",
        controlsContainer: "", // ".flex-content",
        animation: "fade",
        controlNav: false,
        directionNav: true,
        smoothHeight: false,
        slideshowSpeed: 5000,
        animationSpeed: 500,
        randomize: false,
        touch: true,
      });

      $(".post-slider").flexslider({
        namespace: "flex-",
        controlsContainer: "",
        animation: "fade",
        controlNav: true,
        directionNav: false,
        smoothHeight: false,
        slideshowSpeed: 5000,
        animationSpeed: 500,
        randomize: false,
        touch: true,
        start: function (slider) {
          if (typeof slider.container === "object") {
            slider.container.on("click", function (e) {
              if (!slider.animating) {
                slider.flexAnimate(slider.getTarget("next"));
              }
            });
          }

          $(".bricks-wrapper").masonry("layout");
        },
      });
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          console.log("Initializing Smooth Scrolling in ssSmoothScroll");
          // check if menu is open
          if ($("body").hasClass("menu-is-open")) {
            $("#header-menu-trigger").trigger("click");
          }

          window.location.hash = target;
        });
    });
  };

  /* Placeholder Plugin Settings
   * ------------------------------------------------------ */
  var ssPlaceholder = function () {
    $("input, textarea, select").placeholder();
    console.log("Initializing Placeholder Plugin in ssPlaceholder");
  };

  /* AjaxChimp
   * ------------------------------------------------------ */
  var ssAjaxChimp = function () {
    $("#mc-form").ajaxChimp({
      language: "es",
      url: cfg.mailChimpURL,
    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
      submit: "Submitting...",
      0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
      1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
      5: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    };
    console.log("Initializing AjaxChimp in ssAjaxChimp");
  };

  /* Back to Top
   * ------------------------------------------------------ */
  var ssBackToTop = function () {
    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $("#go-top");

    // Show or hide the sticky footer button
    $(window).on("scroll", function () {
      console.log("Initializing Back to Top in ssBackToTop");
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };

  // Suppress specific Google Maps API errors and warnings
  (function () {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = function (message, ...args) {
      if (!message.includes("Google Maps JavaScript API error")) {
        originalConsoleError.apply(console, [message, ...args]);
      }
    };

    console.warn = function (message, ...args) {
      if (!message.includes("Google Maps JavaScript API warning")) {
        originalConsoleWarn.apply(console, [message, ...args]);
      }
    };
  })();

  /* Map **
   * ------------------------------------------------------ */
  var ssGoogleMap = function () {
    if (typeof google === "object" && typeof google.maps === "object") {
      var latitude = 14.549072,
        longitude = 121.046958,
        map_zoom = 15,
        main_color = "#d8ac00",
        saturation_value = -30,
        brightness_value = 5,
        marker_url = null,
        winWidth = $(window).width();

      // show controls
      $("#map-zoom-in, #map-zoom-out").show();

      // marker url
      if (winWidth > 480) {
        marker_url = "images/icon-location@2x.png";
      } else {
        marker_url = "images/icon-location.png";
      }

      // map style
      var style = [
        {
          // set saturation for the labels on the map
          elementType: "labels",
          stylers: [{ saturation: saturation_value }],
        },
        {
          // poi stands for point of interest - don't show these lables on the map
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          // don't show highways lables on the map
          featureType: "road.highway",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          // don't show local road lables on the map
          featureType: "road.local",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          // don't show arterial road lables on the map
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          // don't show road lables on the map
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        // style different elements on the map
        {
          featureType: "transit",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "poi.government",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "poi.business",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "transit.station",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "landscape",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            { hue: main_color },
            { visibility: "on" },
            { lightness: brightness_value },
            { saturation: saturation_value },
          ],
        },
      ];

      // map options
      var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 15,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
      };

      // inizialize the map
      var mapContainer = document.getElementById("map-container");
      if (mapContainer) {
        var map = new google.maps.Map(
          document.getElementById("map-container"),
          map_options
        );

        // add a custom marker to the map
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          map: map,
          visible: true,
          icon: marker_url,
        });

        // add custom buttons for the zoom-in/zoom-out on the map
        function CustomZoomControl(controlDiv, map) {
          // grap the zoom elements from the DOM and insert them in the map
          var controlUIzoomIn = document.getElementById("map-zoom-in"),
            controlUIzoomOut = document.getElementById("map-zoom-out");

          controlDiv.appendChild(controlUIzoomIn);
          controlDiv.appendChild(controlUIzoomOut);

          // Setup the click event listeners and zoom-in or out according to the clicked element
          google.maps.event.addDomListener(
            controlUIzoomIn,
            "click",
            function () {
              map.setZoom(map.getZoom() + 1);
            }
          );
          google.maps.event.addDomListener(
            controlUIzoomOut,
            "click",
            function () {
              map.setZoom(map.getZoom() - 1);
            }
          );
        }

        var zoomControlDiv = document.createElement("div");
        var zoomControl = new CustomZoomControl(zoomControlDiv, map);

        // insert the zoom div on the top right of the map
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
          zoomControlDiv
        );
      }
    }
  };

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMediaElementPlayer();
    ssFitVids();
    ssPrettyPrint();
    ssAlertBoxes();
    ssSuperFish();
    ssMobileNav();
    ssSearch();
    ssMasonryFolio();
    ssBricksAnimate();
    ssFlexSlider();
    ssSmoothScroll();
    ssPlaceholder();
    ssAjaxChimp();
    ssBackToTop();
    ssGoogleMap();
  })();
})(jQuery);
