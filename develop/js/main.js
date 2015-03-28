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
            $.event.special.swipe.durationThreshold = 1000; 



            $("#sit_timer_stop, #countdown").hide();


            $('#eat, #tv, #sit').bind('pageshow', function() {
                var link = "." + $(this).attr("id") + "_footer";
                $(".ui-navbar a").each(function(){
                    $(this).removeClass("active");
                })
                $(link).addClass("active");
                if(link !== "sit"){
                    //$('#countdown').timeTo("restart");
                    $("#sit_timer_start").show();
                    $("#sit_timer_stop").hide();
                }
            });


            var acc_init = {};
            var watchID;
            var isFirst = true;
            var acc_check = {}; 


            $("#sit_timer_start").on("click",function(){
               
                $("#sit_timer_start").hide();
                $("#sit_timer_stop").show();

                $('#countdown').show().timeTo({ 
                    seconds: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
                    fontSize: 38
                });


                // }, function(){ 
                //     if(that.isCordova()) {
                //        navigator.accelerometer.clearWatch(watchID);
                //        acc_init = {};
                //        acc_check = {};
                //        isFirst = true;
                //     }
                // });


                if(that.isCordova()) {

                    var options = { frequency: 2000 };  // Update every 2 seconds

                    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

                    function onSuccess(acceleration){
                        if(isFirst) {
                            isFirst = false;
                            acc_init.x = acceleration.x > 0 ? true : false;
                            acc_init.y = acceleration.y > 0 ? true : false;
                            acc_init.z = acceleration.z > 0 ? true : false;
                        } else {
                            acc_check.x = acceleration.x > 0 ? true : false;
                            acc_check.y = acceleration.y > 0 ? true : false;
                            acc_check.z = acceleration.z > 0 ? true : false;

                            if( acc_check.x != acc_init.x ||
                                acc_check.y != acc_init.y ||
                                acc_check.z != acc_init.z ) {
                                    navigator.accelerometer.clearWatch(watchID);
                                    $("#sit_timer_start").show();
                                    $("#sit_timer_stop").hide();
                                    $("#countdown").hide();
                                    isFirst = true;
                                    alert("Failed");

                            }
                        }
                    }

                    function onError(){
                        navigator.accelerometer.clearWatch(watchID);
                    }
                }
            });

            $("#sit_timer_stop").on("click",function(){
                $("#sit_timer_start").show();
                $("#sit_timer_stop").hide();
                //$('#countdown').timeTo("stop");
                $("#countdown").hide();

            });


           $( document ).on( "pagecreate", "#eat", function() {
               // Swipe to remove list item
                $( document ).on( "swipeleft swiperight", "#list li", function( event ) {
                    var listitem = $( this ),
                        // These are the classnames used for the CSS transition
                        dir = event.type === "swipeleft" ? "left" : "right",
                        // Check if the browser supports the transform (3D) CSS transition
                        transition = $.support.cssTransform3d ? dir : false;
                        confirmAndDelete( listitem, transition );
                    });
               // If it's not a touch device...
               if ( ! $.mobile.support.touch ) {
                   // Remove the class that is used to hide the delete button on touch devices
                   $( "#list" ).removeClass( "touch" );
                   // Click delete split-button to remove list item
                   $( ".delete" ).on( "click", function() {
                       var listitem = $( this ).parent( "li" );
                       confirmAndDelete( listitem );
                   });
               }
               function confirmAndDelete( listitem, transition ) {
                   // Highlight the list item that will be removed
                   listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
                   // Inject topic in confirmation popup after removing any previous injected topics
                   $( "#confirm .topic" ).remove();
                   listitem.find( ".topic" ).clone().insertAfter( "#question" );
                   // Show the confirmation popup
                   $( "#confirm" ).popup( "open" );
                   // Proceed when the user confirms
                   $( "#confirm #yes" ).on( "click", function() {
                       // Remove with a transition
                       if ( transition ) {
                           listitem
                               // Add the class for the transition direction
                               .addClass( transition )
                               // When the transition is done...
                               .on( "webkitTransitionEnd transitionend otransitionend", function() {
                                   // ...the list item will be removed
                                   listitem.remove();
                                   // ...the list will be refreshed and the temporary class for border styling removed
                                   $( "#list" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
                               })
                               // During the transition the previous button gets bottom border
                               .prev( "li" ).children( "a" ).addClass( "border-bottom" )
                               // Remove the highlight
                               .end().end().children( ".ui-btn" ).removeClass( "ui-btn-active" );
                       }
                       // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
                       else {
                           listitem.remove();
                           $( "#list" ).listview( "refresh" );
                       }
                            
                   });
                   // Remove active state and unbind when the cancel button is clicked
                   $( "#confirm #cancel" ).on( "click", function() {
                       listitem.children( ".ui-btn" ).removeClass( "ui-btn-active" );
                       $( "#confirm #yes" ).off();
                   });
               }
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