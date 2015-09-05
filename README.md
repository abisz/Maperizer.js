# Maperizer
Maperizer is an easy to use javascript library, created with the jQuery UI widget factory, for using the Google Maps API and a focus on the management of markers. 

The basic idea comes from David East, who made a [tutorial](https://code.tutsplus.com/courses/custom-interactive-maps-with-the-google-maps-api/) showing how to create custom interactive maps. I modified a few things and added some useful features.

## Getting Started

This widget requires a few other ressources

* jQuery
* jQuery UI
* Google Maps JS (http://maps.googleapis.com/maps/api/js?key=[yourKey]&sensor=false&signed_in=true&libraries=geometry,places)
* [Marker Clusterer Script] (https://github.com/googlemaps/js-marker-clusterer/) - optional

This widget contains the following files:

* List.js
* Maperizer.js
* jqueryui.maperizer.js

You need to create an object containing all the configuration your map needs. Additionally to the [default options] (https://developers.google.com/maps/documentation/javascript/3.exp/reference), there are some new configuration possibilities:

| Name | Type | Description 
| --- | --- | --- 
| geolocation | boolean | if true and client allows it, the center of the map will be the location of the client 
| center | object containing lat and lng | the center of the map, fallback if geolocation is denied 
| searchbox | boolean | true if searchbox is wanted 
| cluster | boolean | if true markerclustering is activated 
| geocoder | boolean | if true geocoding functionality is enabled 

Example:
```javascript
    maperizer.MAP_OPTIONS = {
        geolocation: false, 
        center: {
            lat: 0,
            lng: 0
        },
        searchbox: true,
        createSingleMarker: true,
        cluster: true,
        geocoder: true
    }
```

## Documentation

### Creating a map

To set up your map you need a div with an id of 'map-canvas' and an input field with an id of 'pac-input' (in case you want to include a searchbox). The container of the map must have a width and height!
Now in your script you simply create the map by calling: 

```javascript
    var $maperizer = $('#map-canvas').maperizer(Maperizer.MAP_OPTIONS);
```

#### Center Map
To change the view of the map pass an object with 'lat' and 'lng' attribute or a 'location' attribute, if geocoding is enabled

```javascript
    $maperizer.maperizer('setCenter', {
        lat: 1.2345678,
        lng: 1.9101112
    });
    
    $maperizer.maperizer('setCenter', {
        location: 'Berlin'
    });
```

#### Zoom
To get the current zoom level call: 

```javascript
    var zoomLvl = $maperizer.maperizer('getZoom');
```

To set the zoom level of the map:

```javascript
   $maperizer.maperizer('setZoom', 10);
```

### Add EventListeners to the Map
You can add multiple eventlisteners at once. The function expects an array with objects. The objects need two attributes: The name of the event. Check out the Google Maps [documentation](https://developers.google.com/maps/documentation/javascript/events) to see the full list of possible events. The second attribute is the callback function that should be executed.

```javascript
    $maperizer.maperizer('attachEventsToMap', [{
            name: 'click',
            callback: function(event){

            }
        }]
    );
```

### Markers
This library has a big focus on working with markers. The management of markers allow to save individual attributes which gives you the chance to build complex map applications.

#### Marker Management

##### Add marker(s)
To add a Marker to the map you have to call 'addMarker' within the maperizer function and hand over an object. This object has to have an attribute for latitude ('lat') and one for longitude ('lng'). Besides the standard attributes provided by the Google Maps API ([documentation](https://developers.google.com/maps/documentation/javascript/markers)), you can pass any attributes you want to the markers, like an id or category to manage your markers the way you want.

> if you want to use the geolocation feature you just have to pass a 'location' attribute with the name of the location you want to set your marker. Try being as precise about the location as possible, because in case of ambiguities the script will pick the first result that is available. If there are no results an error will occur.  

```javascript
    $maperizer.maperizer('addMarker', {
                    lat: 0.1234567,
                    lng: 0.8910111,
                    id: 1,
                    category: 'hotel'
                });
```

###### Add multiple markers at once
Instead of adding markers one per one you can also pass an array to create any numbers of markers. Simply call the function 'addArray' within the widget function and pass an array, containing objects like for the creation of single markers.

```javascript
    $maperizer.maperizer('addArray', arrayOfObjects);
```

##### Get All Markers

```javascript
    var result = $maperizer.maperizer('markers');
```


##### Find Markers
Returns an array of markers that match a certain criteria. Just pass a callback function that every marker should be checked 

```javascript
    // capture every marker with the category 'hotel'
    var result = $maperizer.maperizer('findMarkers', function(marker){
        return marker.category == 'hotel'; 
    });
```

##### Remove Markers
To remove certain markers pass a callback function that checks every marker, like the finding functionality.

```javascript
    // remove every marker with the category 'hotel'
    var result = $maperizer.maperizer('removeMarkers', function(marker){
        return marker.category == 'hotel'; 
    });
```

###### Remove all Markers
 
 ```javascript
     $maperizer.maperizer('removeAllMarkers');
 ```

##### Show/hide Markers
To hide markers without removing them from the array, you can use the 'showOnly' function. It expects a callback like the find and remove functions. Every marker that doesn't match these criterias won't be displayed. 
> There is still a problem with the markerClusterer. It won't consider the possibilities of hidden markers and will behave like they are normally displayed!

```javascript
    $maperizer.maperizer('showOnly', function(marker){
        return marker.category == 'hotel'; 
    });
```

#### Marker Events
To add EventListener to markers, the options object when adding the marker has to have an array called 'events', which contains objects, that each has a 'name' and 'callback' attribute. The 'name' refers to the eventtype (e.g. 'click', 'dragend', 'rightclick',...) and the 'callback' to the function that should be executed.

```javascript
    $maperizer.maperizer('addMarker', {
        lat: 0.123456,
        lng: 1.789101,
        events: [
            {
                name: 'click',
                callback: function(e){
                    console.log('Marker was clicked!');
                }
            },
            {
                name: 'dblclick',
                callback: function(e){
                    console.log('Marker was doubleclicked!');
                }
            }
        ]
    });
```

##### Infoboxes
Infoboxes are little boxes that appear above a marker if it was clicked. To add them simply add a 'content' attribute to the options object of the marker, which refers to the text that will be written inside the box. It's possible to use html tags inside the infoboxes

```javascript
    $maperizer.maperizer('addMarker', {
        lat: 0.123456,
        lng: 1.789101,
        content: 'This will be the text inside the infobox'
    });
```

### Utilities for Single Marker Applications
There are use cases of this library that will only require one marker (e.g. a map input for a form). 

### Add one marker and focus the view
Adds marker to the map and sets the center of the map to the same position

```javascript
   $maperizer.maperizer('addFocusedMarker', {
       lat: 11.2345,
       lng: 1.6789
   });
```

### Get Position of single Marker
Returns an object with the lat and lng of the marker on the map. This will also work if there are multiple markers on the map, but it will only return the position of the first on the lit.
```javascript
    var position = $maperizer.maperizer('getPosition');
```