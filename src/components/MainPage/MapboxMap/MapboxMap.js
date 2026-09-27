// MapboxMap.js
import React, {useRef} from 'react';
import useMapbox from './useMapbox';
import MarkerLayer from './MarkerLayer';
import './MapboxMap.css';

const MapboxMap = ({mapParcels, mapDrivers, selectedType, onRequestSelect}) => {
    const mapContainerRef = useRef(null);
    const {map, mapLoaded, mapError} = useMapbox(mapContainerRef, [37.618423, 55.751244], 3);

    return (
        <div ref={mapContainerRef} className="map-container">
            {mapError && <div className="murza-map-fallback" role="status">
                <span aria-hidden="true">✦</span>
                <h2>Map preview is unavailable</h2>
                <p>You can still browse parcels and trips in the list, open their details and send a message.</p>
            </div>}
            <MarkerLayer
                map={map}
                mapLoaded={mapLoaded}
                mapParcels={mapParcels}
                mapDrivers={mapDrivers}
                selectedType={selectedType}
                onRequestSelect={onRequestSelect}
            />
        </div>
    );
};

export default MapboxMap;
