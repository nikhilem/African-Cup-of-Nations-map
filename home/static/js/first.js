mapboxgl.accessToken = 'pk.eyJ1IjoibmlraGlsZW0iLCJhIjoiY2o0Y3p3ZXhkMHMzeTMzcDQybjVkdHRzcCJ9.8yPYHj1w1dVystaR6-e5mQ';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v9',
    center: [15, 1],
    zoom: 2.2,
    minZoom: 2.2
});

let borders = [], stadiums = [], stadium_markers = [];
const countryLayerThresholdZoom = 4;


$.ajax({
    url: "/api/borders/?format=json",
    dataType: 'json',
    type: 'GET',
    success: function (data) {
        borders = data;
        displayBorders(borders);
    }
});


$.ajax({
    url: "/api/stadiums/?format=json",
    dataType: 'json',
    type: 'GET',
    success: function (data) {
        stadiums = data;
        displayStadiums(stadiums);
    }
});

function displayBorders() {
    map.on('load', function () {
        for(let i=0; i<borders.length; i++){
            map.addLayer({
                'id': borders[i]["country_id"],
                'type': 'fill',
                'maxzoom': countryLayerThresholdZoom,
                'source': {
                    'type': 'geojson',
                    'data': JSON.parse(borders[i]["border_data"])
                },
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.8
                }
            });
        }
    });
}


function displayStadiums(){
    let stadiumFeatures = [];
    for(let i=0;i<stadiums.length;i++){
        stadiumFeatures.push({
            "type": "Feature",
            "properties": {
                "message": stadiums[i].name,
                "iconSize": [60, 60],
                "photo": stadiums[i].photo
            },
            "geometry": {
                "type": "Point",
                "coordinates": [stadiums[i].longitude, stadiums[i].latitude]
            }
        });
    }

    stadiumFeatures.forEach(function(marker) {
        // create a DOM element for the marker
        let el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(' + marker.properties.photo + ')';
        el.style.backgroundPosition = 'center center';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        el.addEventListener('hover', function() {
            window.alert(marker.properties.message);
        });
        el.style.display = 'none';
        stadium_markers.push(el);
        let popup = new mapboxgl.Popup({offset: 25})
        .setText(marker.properties.message);
        // add marker to map
        new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup)
            .addTo(map);
    });
}

map.on('zoom', function () {
    if(map.getZoom()>=countryLayerThresholdZoom){
        stadium_markers.forEach(function (this_stadium) {
            this_stadium.style.display = 'block';
        });
    }
    else{
        stadium_markers.forEach(function (this_stadium) {
            this_stadium.style.display = 'none';
        });
    }
});
