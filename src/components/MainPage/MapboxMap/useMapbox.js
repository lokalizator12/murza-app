// useMapbox.js
import {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';

const useMapbox = (mapContainerRef, center = [0, 0], zoom = 2) => {
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(false);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        try {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center,
                zoom,
            });
        } catch (error) {
            console.warn('Map preview is unavailable in this browser', error);
            setMapError(true);
            return undefined;
        }
        const navigationControl = new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true
        });
        mapRef.current.addControl(navigationControl, 'top-right');

        const onStyleLoad = () => {
            setMapLoaded(true);
        };

        // Используем событие 'style.load' для установки mapLoaded
        mapRef.current.on('style.load', onStyleLoad);
        const onMapError = (event) => {
            if (!mapLoaded && /WebGL/i.test(String(event?.error?.message || ''))) setMapError(true);
        };
        mapRef.current.on('error', onMapError);

        return () => {
            if (mapRef.current) {
                mapRef.current.off('style.load', onStyleLoad);
                mapRef.current.off('error', onMapError);
                mapRef.current.remove();
            }
        };
    }, []);

    return {map: mapRef.current, mapLoaded, mapError};
};

export default useMapbox;
