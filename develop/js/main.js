(function () {
    "use strict"

    var Application = function (options) {

        var that = {};

        /** 
        * @return   true   if we started index.html on devices
        *           false  if that is browser on PC
        **/
        that.isCordova = function () {
            return (window.cordova || window.PhoneGap || window.phonegap)
                && /^file:\/{3}[^\/]/i.test(window.location.href)
                && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
        }
        /**
        *  Check connection with internet on device
        *  $ cordova plugin add org.apache.cordova.network-information
        * 
        *  @return      true    if connection establishment
        *               false   if not
        *
        *  P.S.: if you have problems with this plugin on android 4.0.* or else
        *  try to fix this file: platforms/android/platform_www/cordova.js
        *
        *  function clobber(obj, key, value) {
        *        exports.replaceHookForTesting(obj, key);
        *   -    obj[key] = value;
        *   +    var needsProperty = false;
        *   +    try {
        *   +        obj[key] = value;
        *   +    } catch (e) {
        *   +        needsProperty = true;
        *   +    }
        *        // Getters can only be overridden by getters.
        *   -    if (obj[key] !== value) {
        *   +    if (needsProperty || obj[key] !== value) {
        *            utils.defineGetter(obj, key, function() {
        *                return value;
        *            });
        *        }
        *    } 
        **/
        that.checkConnectionWithInternet = function () {
            var networkState = navigator.connection.type;
            if (networkState == Connection.NONE){
                return false;
            }
            return true;
        }

        /**
        *   Inittialization of application
        **/  
        that.init = function () {
            // Put your code here ...
            //$('#main_page').append('<h1>Hello my fat world!!</h1>');
           
            $( document ).on( "swipeleft swiperight", "#learn_1", function( e ) {
                if ( e.type === "swipeleft" ) {
                    $.mobile.navigate("#learn_2", {
                        transition: "slide"
                    });
                }
            });

            $( document ).on( "swipeleft swiperight", "#learn_2", function( e ) {
                if ( e.type === "swipeleft" ) {
                    $.mobile.navigate("#learn_3", {
                        transition: "slide"
                    });
                } else if ( e.type === "swiperight" ) {
                    $.mobile.navigate("#learn_1", {
                        transition: "slide",
                        reverse: true
                    });
                }
            });

            $( document ).on( "swipeleft swiperight", "#learn_3", function( e ) {
                if ( e.type === "swipeleft" ) {
                    $.mobile.changePage("#learn_4", {
                        transition: "slide"
                    });
                } else if ( e.type === "swiperight" ) {
                    $.mobile.changePage("#learn_2", {
                        transition: "slide",
                        reverse: true
                    });
                }
            });

            $( document ).on( "swipeleft swiperight", "#learn_4", function( e ) {
                if ( e.type === "swipeleft" ) {
                    $.mobile.changePage("#main_page", {
                        transition: "slide"
                    });
                } else if ( e.type === "swiperight" ) {
                    $.mobile.changePage("#learn_3", {
                        transition: "slide",
                        reverse: true
                    });
                }
            });

            $(document).bind("mobileinit", function(){
             $.extend(  $.mobile , {
             defaultPageTransition: 'none' 
            });

             $.mobile.defaultPageTransition = 'none';
             $.mobile.defaultDialogTransition = 'none';
            });

            $.mobile.transitionFallbacks.slideout = "none";


            $.event.special.swipe.horizontalDistanceThreshold = (screen.availWidth) / 80; 

            $.event.special.swipe.verticalDistanceThreshold = (screen.availHeight) / 13; 
            $.event.special.swipe.durationThreshold = 1000; // (default: 1000) (milliseconds) – More time than this, and it isn't a swipe.



            $("#sit_timer_stop").hide();


            $('#eat, #tv, #sit').bind('pageshow', function() {
                var link = "." + $(this).attr("id") + "_footer";
                $(".ui-navbar a").each(function(){
                    $(this).removeClass("active");
                })
                $(link).addClass("active");
                if(link !== "tv"){
                    $('#countdown').timeTo("reset");
                    $("#sit_timer_start").show();
                    $("#sit_timer_stop").hide();
                }
            });

            $("#sit_timer_start").on("click",function(){
                $("#sit_timer_stop").show();
                $("#sit_timer_start").hide();
                $('#countdown').timeTo({ 
                    seconds: 100,
                    fontSize: 38,
                }, function(){ 
                    alert('Countdown finished'); 
                });
            });

            $("#sit_timer_stop").on("click",function(){
                $("#sit_timer_start").show();
                $("#sit_timer_stop").hide();
                $('#countdown').timeTo("reset");
            });



            

        }


        return that;

    }

    var myApp = Application({

    });

    // run like cordova application
    if ( myApp.isCordova() ) {

        document.addEventListener('deviceready', function () {

            $( function () {
    
                if (navigator.notification) { // Override default HTML alert with native dialog
                    window.alert = function (message) {
                        navigator.notification.alert(
                            message,    // message
                            null,       // callback
                            "Error",    // title
                            'OK'        // buttonName
                        );
                    };
                }


                /**
                *  If you want to show splashcreen install plugin amd remove slashes
                *
                *  $ cordova plugin add org.apache.cordova.splashscreen
                * 
                **/
                navigator.splashscreen.show();

                // register FastClick
                if (FastClick) {
                    FastClick.attach(document.body);
                }
                
               
            });

        }, false);


     } else {
        // run like web page
        $( function() {
            // if you need to imitate some action or data from device
            // you can add this before application is started
        });
    }  

    myApp.init();



}());