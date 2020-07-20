import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVhY2hpZXBwYSIsImEiOiJjazhiejRkbGEwZ3RoM2V0cXoyOWxqbGZnIn0.G7IbIk6wElRVIhWgZREyQg';

class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        lng: 5,
        lat: 34,
        zoom: 2
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
            map.resize();
            map.addControl(new mapboxgl.NavigationControl());
        })
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
