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
            $('#main_page').append('<h1>Hello world!!</h1>');
        }

        return that;

    }

    var myApp = Application({

    });

    // run like cordova application
    if ( myApp.isCordova() ) {

        document.addEventListener('deviceready', function () {

            $( function () {
    
                /**
                *  If you want to replace standard alerts for more native notifications 
                *  install this and remove slashes
                * 
                *  $ cordova plugin add org.apache.cordova.dialogs
                *
                **/
                // if (navigator.notification) { // Override default HTML alert with native dialog
                //     window.alert = function (message) {
                //         navigator.notification.alert(
                //             message,    // message
                //             null,       // callback
                //             "Error",    // title
                //             'OK'        // buttonName
                //         );
                //     };
                // }


                /**
                *  If you want to show splashcreen install plugin amd remove slashes
                *
                *  $ cordova plugin add org.apache.cordova.splashscreen
                * 
                **/
                // navigator.splashscreen.show();

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