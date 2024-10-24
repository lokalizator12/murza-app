// components/Map.js
import React, {useState} from 'react';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyMap = () => {
    const [viewState, setViewState] = useState({
        longitude: 30.5238, // Долгота (например, Киев)
        latitude: 50.4547,  // Широта
        zoom: 12
    });

    return (
        <div style={{width: '100%', height: '500px'}}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{width: '100%', height: '100%'}}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} // Токен доступа
            >

                <Marker longitude={30.5238} latitude={50.4547} color="red"/>
            </Map>
        </div>
    );
};

export default MyMap;
