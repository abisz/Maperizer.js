(function(window, google, $) {


    /*
     *  This script is an example of the Maperizer library
     *  By clicking on the map a marker occurs, the second click will move the marker to the new position.
     *  This could be used to as a map location input in a form.
     *
     */

    var $maperizer = $('#map-canvas').maperizer(Maperizer.MAP_OPTIONS);

    $maperizer.maperizer('attachEventsToMap', [{
            name: 'click',
            callback: function(event){

                $maperizer.maperizer('removeMarkers', function(marker){
                    return marker.newMarker === true;
                });

                $maperizer.maperizer('addMarker', {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    newMarker: true
                });

            }
        }]
    );



}(window, google, jQuery));