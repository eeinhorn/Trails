/* Implementation of AR-Experience (aka "World"). */
var World = {
    /* True once data was fetched. */
    initiallyLoadedData: false,

    /* pOI-Marker asset. */
    markerDrawableIdle: null,

    /* Called to inject new POI data. */
    loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {

        /*
            The example Image Recognition already explained how images are loaded and displayed in the augmented
            reality view. This sample loads an AR.ImageResource when the World variable was defined. It will be
            reused for each marker that we will create afterwards.
        */
        World.markerDrawableIdle = new AR.ImageResource("marker_idle.png", {
            onError: World.onError
        });
        var coords = poiData.points;
        /*
            For creating the marker a new object AR.GeoObject will be created at the specified geolocation. An
            AR.GeoObject connects one or more AR.GeoLocations with multiple AR.Drawables. The AR.Drawables can be
            defined for multiple targets. A target can be the camera, the radar or a direction indicator. Both the
            radar and direction indicators will be covered in more detail in later examples.
        */
        var i = 0;
        for (i=0; i<coords.length; i++) {
            var markerLocation = new AR.GeoLocation(coords[i].latitude, coords[i].longitude, 100);
            var markerImageDrawableIdle = new AR.ImageDrawable(World.markerDrawableIdle, 2.5, {
                zOrder: 0,
                opacity: 1.0
            });
//        var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
//        var markerImageDrawableIdle = new AR.ImageDrawable(World.markerDrawableIdle, 20, {
//            zOrder: 0,
//            opacity: 1.0
//        });

            /* Create GeoObject. */
            var markerObject = new AR.GeoObject(markerLocation, {
                drawables: {
                    cam: [markerImageDrawableIdle]
                }
             });
        }
//        var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
//        var markerImageDrawableIdle = new AR.ImageDrawable(World.markerDrawableIdle, 2.5, {
//            zOrder: 0,
//            opacity: 1.0
//        });
//
//        /* Create GeoObject. */
//        var markerObject = new AR.GeoObject(markerLocation, {
//            drawables: {
//                cam: [markerImageDrawableIdle]
//            }
//        });

        /* Updates status message as a user feedback that everything was loaded properly. */
        World.updateStatusMessage(i + " places loaded");
    },

    /* Updates status message shown in small "i"-button aligned bottom center. */
    updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

        var themeToUse = isWarning ? "e" : "c";
        var iconToUse = isWarning ? "alert" : "info";

        $("#status-message").html(message);
        $("#popupInfoButton").buttonMarkup({
            theme: themeToUse,
            icon: iconToUse
        });
    },

    /* Location updates, fired every time you call architectView.setLocation() in native environment. */
    locationChanged: function locationChangedFn(lat, lon, alt, acc) {

        /*
            The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the
            function was already called. With the first call of World.onLocationChanged an object that contains geo
            information will be created which will be later used to create a marker using the
            World.loadPoisFromJsonData function.
        */
        if (!World.initiallyLoadedData) {
            /* Creates a poi object with a random location near the user's location. */
//            var poiData = {
//                "id": [1, 2],
//                "longitude": [-75.5105456, -75.5100843],
//                "latitude": [40.5972745, 40.5974252],
//                "altitude": [100.0, 100.0]
//            };

            //World.loadPoisFromJsonData(poiData);
//            var poiData = {
//                "id": 1,
//                "longitude": 40.5971978,
//                "latitude": -75.5111743,
//                "altitude": 100.0
//            };
//            counter++;
//            World.loadPoisFromJsonData(poiData);
//            World.initiallyLoadedData = true;
//            World.updateStatusMessage(counter + ' places loaded');
        }
    },

    onError: function onErrorFn(error) {
        alert(error)
    }
};


/*
    Set a custom function where location changes are forwarded to. There is also a possibility to set
    AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further
    location updates will be received.
*/
AR.context.onLocationChanged = World.locationChanged;