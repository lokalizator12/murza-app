// MapboxMap.js
import React, {useRef} from 'react';
import useMapbox from './useMapbox';
import MarkerLayer from './MarkerLayer';
import './MapboxMap.css';

const MapboxMap = ({mapParcels, mapDrivers, selectedType}) => {
    const mapContainerRef = useRef(null);
    const {map, mapLoaded} = useMapbox(mapContainerRef, [37.618423, 55.751244], 3);

    return (
        <div ref={mapContainerRef} className="map-container">
            <MarkerLayer
                map={map}
                mapLoaded={mapLoaded}
                mapParcels={mapParcels}
                mapDrivers={mapDrivers}
                selectedType={selectedType}
            />
        </div>
    );
};

export default MapboxMap;
