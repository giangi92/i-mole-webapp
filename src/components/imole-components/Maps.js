import React from 'react';
import mapboxgl from 'mapbox-gl';
import TruckSearchfield from './TruckSearchfield'
import CompassControl from 'mapbox-gl-controls/lib/compass';
import ZoomControl from 'mapbox-gl-controls/lib/zoom';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVhY2hpZXBwYSIsImEiOiJjazhiejRkbGEwZ3RoM2V0cXoyOWxqbGZnIn0.G7IbIk6wElRVIhWgZREyQg';
const transportSteps_ = [
    {
        "name": "Bari",
        "date": "15/04/2020",
        "time": "18:02",
        "lat": 41.1187,
        "lon": 16.852
    },
    {
        "name": "Foggia",
        "date": "15/04/2020",
        "time": "19:35",
        "lat": 41.4619,
        "lon": 15.5501
    },
    {
        "name": "Pescara",
        "date": "15/04/2020",
        "time": "22:15",
        "lat": 42.4612,
        "lon": 14.2111
    },
    {
        "name": "Milano",
        "date": "16/04/2020",
        "time": "6:13",
        "lat": 45.4773,
        "lon": 9.1815
    }
]

const camion = [
    {
        "id":"Truck - AB39F",
        "track":[
            {
                "name": "Bari",
                "date": "15/04/2020",
                "time": "18:02",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Foggia",
                "date": "15/04/2020",
                "time": "19:35",
                "lat": 41.4619,
                "lon": 15.5501
            },
            {
                "name": "Pescara",
                "date": "15/04/2020",
                "time": "22:15",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Milano",
                "date": "16/04/2020",
                "time": "6:13",
                "lat": 45.4773,
                "lon": 9.1815
            }
        ]
    },
    {
        "id":"Truck - TR75L",
        "track":[
            {
                "name": "Bari",
                "date":"12/04/2020",
                "time": "10:15",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Melfi",
                "date":"12/04/2020",
                "time": "12:15",
                "lat": 40.9975,
                "lon": 15.6522
            },
            {
                "name": "Salerno",
                "date":"12/04/2020",
                "time": "18:17",
                "lat": 40.6642,
                "lon": 14.8046
            }
        ]
    },
    {
        "id":"Truck - MB07F",
        "track":[
            {
                "name": "Pescara",
                "date":"22/04/2020",
                "time":"8:13",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Ancona",
                "date":"22/04/2020",
                "time":"10:17",
                "lat": 43.5991,
                "lon": 13.511
            },
            {
                "name": "Rimini",
                "date":"22/04/2020",
                "time":"12:22",
                "lat": 44.0693,
                "lon": 12.5566
            },
            {
                "name": "Modena",
                "date":"22/04/2020",
                "time":"15:58",
                "lat": 44.6568,
                "lon": 10.9202
            }
        ]
    },
    {
        "id":"Truck - AB39F",
        "track":[
            {
                "name": "Bari",
                "date": "15/04/2020",
                "time": "18:02",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Foggia",
                "date": "15/04/2020",
                "time": "19:35",
                "lat": 41.4619,
                "lon": 15.5501
            },
            {
                "name": "Pescara",
                "date": "15/04/2020",
                "time": "22:15",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Milano",
                "date": "16/04/2020",
                "time": "6:13",
                "lat": 45.4773,
                "lon": 9.1815
            }
        ]
    },
    {
        "id":"Truck - TR75L",
        "track":[
            {
                "name": "Bari",
                "date":"12/04/2020",
                "time": "10:15",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Melfi",
                "date":"12/04/2020",
                "time": "12:15",
                "lat": 40.9975,
                "lon": 15.6522
            },
            {
                "name": "Salerno",
                "date":"12/04/2020",
                "time": "18:17",
                "lat": 40.6642,
                "lon": 14.8046
            }
        ]
    },
    {
        "id":"Truck - MB07F",
        "track":[
            {
                "name": "Pescara",
                "date":"22/04/2020",
                "time":"8:13",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Ancona",
                "date":"22/04/2020",
                "time":"10:17",
                "lat": 43.5991,
                "lon": 13.511
            },
            {
                "name": "Rimini",
                "date":"22/04/2020",
                "time":"12:22",
                "lat": 44.0693,
                "lon": 12.5566
            },
            {
                "name": "Modena",
                "date":"22/04/2020",
                "time":"15:58",
                "lat": 44.6568,
                "lon": 10.9202
            }
        ]
    },
    {
        "id":"Truck - AB39F",
        "track":[
            {
                "name": "Bari",
                "date": "15/04/2020",
                "time": "18:02",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Foggia",
                "date": "15/04/2020",
                "time": "19:35",
                "lat": 41.4619,
                "lon": 15.5501
            },
            {
                "name": "Pescara",
                "date": "15/04/2020",
                "time": "22:15",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Milano",
                "date": "16/04/2020",
                "time": "6:13",
                "lat": 45.4773,
                "lon": 9.1815
            }
        ]
    },
    {
        "id":"Truck - TR75L",
        "track":[
            {
                "name": "Bari",
                "date":"12/04/2020",
                "time": "10:15",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Melfi",
                "date":"12/04/2020",
                "time": "12:15",
                "lat": 40.9975,
                "lon": 15.6522
            },
            {
                "name": "Salerno",
                "date":"12/04/2020",
                "time": "18:17",
                "lat": 40.6642,
                "lon": 14.8046
            }
        ]
    },
    {
        "id":"Truck - MB07F",
        "track":[
            {
                "name": "Pescara",
                "date":"22/04/2020",
                "time":"8:13",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Ancona",
                "date":"22/04/2020",
                "time":"10:17",
                "lat": 43.5991,
                "lon": 13.511
            },
            {
                "name": "Rimini",
                "date":"22/04/2020",
                "time":"12:22",
                "lat": 44.0693,
                "lon": 12.5566
            },
            {
                "name": "Modena",
                "date":"22/04/2020",
                "time":"15:58",
                "lat": 44.6568,
                "lon": 10.9202
            }
        ]
    },
    {
        "id":"Truck - AB39F",
        "track":[
            {
                "name": "Bari",
                "date": "15/04/2020",
                "time": "18:02",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Foggia",
                "date": "15/04/2020",
                "time": "19:35",
                "lat": 41.4619,
                "lon": 15.5501
            },
            {
                "name": "Pescara",
                "date": "15/04/2020",
                "time": "22:15",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Milano",
                "date": "16/04/2020",
                "time": "6:13",
                "lat": 45.4773,
                "lon": 9.1815
            }
        ]
    },
    {
        "id":"Truck - TR75L",
        "track":[
            {
                "name": "Bari",
                "date":"12/04/2020",
                "time": "10:15",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Melfi",
                "date":"12/04/2020",
                "time": "12:15",
                "lat": 40.9975,
                "lon": 15.6522
            },
            {
                "name": "Salerno",
                "date":"12/04/2020",
                "time": "18:17",
                "lat": 40.6642,
                "lon": 14.8046
            }
        ]
    },
    {
        "id":"Truck - MB07F",
        "track":[
            {
                "name": "Pescara",
                "date":"22/04/2020",
                "time":"8:13",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Ancona",
                "date":"22/04/2020",
                "time":"10:17",
                "lat": 43.5991,
                "lon": 13.511
            },
            {
                "name": "Rimini",
                "date":"22/04/2020",
                "time":"12:22",
                "lat": 44.0693,
                "lon": 12.5566
            },
            {
                "name": "Modena",
                "date":"22/04/2020",
                "time":"15:58",
                "lat": 44.6568,
                "lon": 10.9202
            }
        ]
    },
    {
        "id":"Truck - AB39F",
        "track":[
            {
                "name": "Bari",
                "date": "15/04/2020",
                "time": "18:02",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Foggia",
                "date": "15/04/2020",
                "time": "19:35",
                "lat": 41.4619,
                "lon": 15.5501
            },
            {
                "name": "Pescara",
                "date": "15/04/2020",
                "time": "22:15",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Milano",
                "date": "16/04/2020",
                "time": "6:13",
                "lat": 45.4773,
                "lon": 9.1815
            }
        ]
    },
    {
        "id":"Truck - TR75L",
        "track":[
            {
                "name": "Bari",
                "date":"12/04/2020",
                "time": "10:15",
                "lat": 41.1187,
                "lon": 16.852
            },
            {
                "name": "Melfi",
                "date":"12/04/2020",
                "time": "12:15",
                "lat": 40.9975,
                "lon": 15.6522
            },
            {
                "name": "Salerno",
                "date":"12/04/2020",
                "time": "18:17",
                "lat": 40.6642,
                "lon": 14.8046
            }
        ]
    },
    {
        "id":"Truck - MB07F",
        "track":[
            {
                "name": "Pescara",
                "date":"22/04/2020",
                "time":"8:13",
                "lat": 42.4612,
                "lon": 14.2111
            },
            {
                "name": "Ancona",
                "date":"22/04/2020",
                "time":"10:17",
                "lat": 43.5991,
                "lon": 13.511
            },
            {
                "name": "Rimini",
                "date":"22/04/2020",
                "time":"12:22",
                "lat": 44.0693,
                "lon": 12.5566
            },
            {
                "name": "Modena",
                "date":"22/04/2020",
                "time":"15:58",
                "lat": 44.6568,
                "lon": 10.9202
            }
        ]
    }
]

var currentMarkers = [];

class Maps extends React.Component {
    
    currentMap;
    
    constructor(props) {
        super(props);
        this.state = {
            lng: 19.03991,
            lat: 47.49801,
            zoom: 3
        };

        this.getMatch = this.getMatch.bind(this);
    }
    
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.addControl(new CompassControl(), 'bottom-right');
        map.addControl(new ZoomControl(), 'bottom-right');

        this.currentMap = map;
        
    }

    addRoute(coords, map) {
        // check if the route is already loaded
        if (map.getSource('route')) {
            map.removeLayer('route')
            map.removeSource('route')
        } 
        map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": coords
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#3b9ddd",
                "line-width": 8,
                "line-opacity": 0.8
            }
        });
    }
    
    // make a directions request
    getMatch(transportSteps, map) {
        if(!map) map = this.currentMap;
        if(transportSteps && transportSteps.length > 0){

            if(map.getLayer('places')){
                map.removeLayer('places')
            }
            
        let pathsString = "";
        if (transportSteps.length > 0) {
            let i = 0;
            transportSteps.map((step) => {
                pathsString += step.lon + "," + step.lat;
                pathsString += transportSteps[i + 1] ? ";" : "";
                i++;
            })
        }
        
        var addWaypoint = this.addWaypoints;
        var addRoutes = this.addRoute;
        // console.log(pathsString);
        // https://www.mapbox.com/api-documentation/#directions
        var url =
        'https://api.mapbox.com/directions/v5/mapbox/driving/' +
        pathsString +
        '?geometries=geojson&steps=true&access_token=pk.eyJ1Ijoic2Fyc2lsZ2lhIiwiYSI6ImNrOThhYWxqbzA0dGIzbms0Z2p0aGVvcG8ifQ.XHpwrFboIFlxoKXz26b1DA';
        fetch(url,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (res) {
                if (res.status === 404) {
                    alert("Problema di connessione con il server. Riprovare più tardi")
                } else {
                    return res.json();
                }
            })
            .then(function (data) {
            console.log({'data': data});
                    
            map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                // Add an image to use as a custom marker
                function(error, image) {
                    if (error) throw error;
                    if(!map.hasImage('custom-marker'))
                        map.addImage('custom-marker', image);
                    
                })
                
                const features = [];

                if(map.getSource('places')){
                    map.removeSource('places')
                }
                
                data.waypoints.map((wp)=>{
                    features.push(
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                '<strong>Questo è un popup</strong><p>E dovrebbe uscire se ci passi il mouse sopra 👍</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': wp.location
                            }
                        }
                    )
                })
                    
                map.addSource('places', {'type': 'geojson',
                'data': {
                    "type": "FeatureCollection","features":features}});
                    
                // Add a layer showing the places.
                
                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': 'custom-marker',
                        'icon-allow-overlap': true,
                        'icon-size': 0.25
                    }
                });
                    
                var dynamicPopup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });
                    
                map.on('mouseenter', 'places', function(e) {
                        // Change the cursor style as a UI indicator.
                        map.getCanvas().style.cursor = 'pointer';
                        
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var description = e.features[0].properties.description;
                        
                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                        
                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        dynamicPopup
                        .setLngLat(coordinates)
                        .setHTML(description)
                        .addTo(map);
                    });
                    
                    map.on('mouseleave', 'places', function() {
                        map.getCanvas().style.cursor = '';
                        dynamicPopup.remove();
                });
                        
                        
                        
                addWaypoint(data.waypoints, transportSteps, map, currentMarkers)

                addRoutes(data.routes[0].geometry, map)
            })                
        }else{
            if (currentMarkers !== null && currentMarkers.length > 0) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                    currentMarkers[i].remove();
                }
            }

            if(map.getLayer('places')){
                map.removeLayer('places')
            }
        }
    }
                    
    addWaypoints(waypoints, transportSteps, map, currentMarkers) {
        var transportInfo = transportSteps;
        // console.log(transportInfo);
        // remove markers 
        if (currentMarkers && currentMarkers.length > 0) {
            for (var i = currentMarkers.length - 1; i >= 0; i--) {
                currentMarkers[i].remove();
            }
        }
        
        let j = 0;
        
        var boundingBox = [];
        
        waypoints.map((waypoint) => {
            // create a HTML element for each feature
            let marker = document.createElement('div');
            //set marker CSS
            waypoints[j + 1] ? j == 0 ? marker.className = 'start-marker' : marker.className = 'normal-marker' : marker.className = 'last-marker';
            
            var popup = new mapboxgl.Popup({ offset: 25 }).setText('Posizione:'+transportSteps[j].name+'          \nRilevazione effettuata il  alle ore ');
            
            console.log('waypont location:',waypoint.location);
            
            const singleMarker = new mapboxgl.Marker(marker)
            .setPopup(
                popup
                )
                .setLngLat(waypoint.location).addTo(map);                
                
                // // save tmp marker into this.currentMarkers
                currentMarkers.push(singleMarker);
                boundingBox.push([waypoint.location[0], waypoint.location[1]])
                j++;
            })
            
            // console.log(boundingBox)
            map.fitBounds([boundingBox[0],boundingBox[boundingBox.length-1]],{padding:{top:200,bottom:100,left:400,right:100}});
    }
                        
                        
    render() {
        return (
            <div>
            
            <div ref={el => this.mapContainer = el} className="mapContainer" />
            <TruckSearchfield elemList = {camion} getMatch={this.getMatch} currentMap={this.currentMap} style={{position:'absolute'}}></TruckSearchfield>
            </div>
            )
        }
    }
    
    export default Maps;
                        