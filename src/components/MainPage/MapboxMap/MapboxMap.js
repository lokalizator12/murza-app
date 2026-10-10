// MapboxMap.js
import React, { useRef } from "react";
import useMapbox from "./useMapbox";
import MarkerLayer from "./MarkerLayer";
import "./MapboxMap.css";

const MapboxMap = ({
  mapParcels,
  mapDrivers,
  selectedType,
  onRequestSelect,
}) => {
  const mapContainerRef = useRef(null);
  const { map, mapLoaded, mapError } = useMapbox(
    mapContainerRef,
    [37.618423, 55.751244],
    3,
  );

  return (
    <div ref={mapContainerRef} className="map-container">
      {mapError && (
        <div className="murza-map-fallback" role="status">
          <h2>The map couldn’t load</h2>
          <p>
            Browse the list to open a request, or try another browser to view
            the map.
          </p>
        </div>
      )}
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
