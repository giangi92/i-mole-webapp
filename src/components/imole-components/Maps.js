import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVhY2hpZXBwYSIsImEiOiJjazhiejRkbGEwZ3RoM2V0cXoyOWxqbGZnIn0.G7IbIk6wElRVIhWgZREyQg';
const transportSteps = [
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


class Maps extends React.Component {
    
    currentMarkers = [];
    
    constructor(props) {
        super(props);
        this.state = {
            lng: 19.03991,
            lat: 47.49801,
            zoom: 3
        };
    }
    
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        
        map.on('load', () => {
            // map.resize();
            // map.addControl(new mapboxgl.NavigationControl());
            this.getMatch(transportSteps, map);
        })
    }
    
    // make a directions request
    getMatch(transportSteps, map) {
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
                // console.log(data);
                addWaypoint(data.waypoints, transportSteps, map)
            })
            
        }
        
        addWaypoints(waypoints, transportSteps, map) {
            var transportInfo = transportSteps;
            // console.log(transportInfo);
            var currentMarkers = [];
            // remove markers 
            // if (this.currentMarkers !== null && this.currentMarkers.length > 0) {
            //     for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
            //         this.currentMarkers[i].remove();
            //     }
            // }
            
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
                map.fitBounds([boundingBox[0],boundingBox[boundingBox.length-1]],{padding:{top:200,bottom:100}});
            }
            
            
            render() {
                return (
                    <div>
                    <div ref={el => this.mapContainer = el} className="mapContainer" />
                    </div>
                    )
                }
            }
            
            export default Maps;
            