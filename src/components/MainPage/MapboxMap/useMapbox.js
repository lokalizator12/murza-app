// useMapbox.js
import {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';

const useMapbox = (mapContainerRef, center = [0, 0], zoom = 2) => {
    const mapRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center,
            zoom,
        });
        const navigationControl = new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true
        });
        mapRef.current.addControl(navigationControl, 'top-right');

        const onStyleLoad = () => {
            console.log('Map style loaded');
            setMapLoaded(true);
        };

        // Используем событие 'style.load' для установки mapLoaded
        mapRef.current.on('style.load', onStyleLoad);

        return () => {
            if (mapRef.current) {
                mapRef.current.off('style.load', onStyleLoad);
                mapRef.current.remove();
            }
        };
    }, []);

    return {map: mapRef.current, mapLoaded};
};

export default useMapbox;
