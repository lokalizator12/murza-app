import React, {useCallback, useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const ensureLngLatArray = (coord) => {
    if (Array.isArray(coord) && coord.length === 2) {
        return coord;
    } else if (coord && coord.lng !== undefined && coord.lat !== undefined) {
        return [coord.lng, coord.lat];
    } else if (coord && coord.lon !== undefined && coord.lat !== undefined) {
        return [coord.lon, coord.lat];
    }
    return null;
};

const RouteMap = ({pickupCoordinates, destinationCoordinates, waypoints = [], transportType = 'driving'}) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const markersRef = useRef([]); // Используем ref для хранения маркеров, чтобы избежать зависимости от markers

    // Инициализация карты
    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: ensureLngLatArray(pickupCoordinates) || [30.5, 50.5],
                zoom: 1,
            }, [pickupCoordinates]);
        }

        const mapInstance = mapRef.current;

        // Удаление карты при размонтировании компонента
        return () => {
            if (mapInstance) {
                mapInstance.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Функция для получения маршрута
    const getRoute = useCallback(async (start, end, waypoints) => {
        if (!start || !end) return;

        const waypointString = waypoints
            .map(wp => ensureLngLatArray(wp))
            .filter(Boolean)
            .map(wp => `${wp[0]},${wp[1]}`)
            .join(';');

        const url = `https://api.mapbox.com/directions/v5/mapbox/${transportType}/${start[0]},${start[1]};${waypointString ? `${waypointString};` : ''}${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

        try {
            const response = await fetch(url);
            const json = await response.json();

            if (!json.routes || !json.routes[0]) return;

            const data = json.routes[0];
            setDistance((data.distance / 1000).toFixed(2));
            setDuration((data.duration / 60).toFixed(2));

            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: data.geometry.coordinates,
                },
            };

            if (mapRef.current && mapRef.current.isStyleLoaded()) {
                if (mapRef.current.getSource('route')) {
                    mapRef.current.getSource('route').setData(geojson);
                } else {
                    mapRef.current.addSource('route', {type: 'geojson', data: geojson});
                    mapRef.current.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': '#3b9ddd',
                            'line-width': 5,
                        },
                    });
                }

                mapRef.current.fitBounds([start, end, ...waypoints.map(wp => ensureLngLatArray(wp))].filter(Boolean), {
                    padding: 50,
                    maxZoom: 15,
                });
            }
        } catch (error) {
            console.error('Failed to fetch route:', error);
        }
    }, [transportType]);

    // Обновление маркеров и маршрута
    useEffect(() => {
        if (!mapRef.current) return;

        const start = ensureLngLatArray(pickupCoordinates);
        const end = ensureLngLatArray(destinationCoordinates);

        // Очистка предыдущих маркеров
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (start) {
            markersRef.current.push(new mapboxgl.Marker({color: 'green'}).setLngLat(start).addTo(mapRef.current));
        }
        if (end) {
            markersRef.current.push(new mapboxgl.Marker({color: 'red'}).setLngLat(end).addTo(mapRef.current));
        }
        waypoints.forEach(wp => {
            const waypoint = ensureLngLatArray(wp);
            if (waypoint) {
                markersRef.current.push(new mapboxgl.Marker({color: 'blue'}).setLngLat(waypoint).addTo(mapRef.current));
            }
        });

        // Проверка, что карта загрузилась перед вызовом getRoute
        if (start && end) {
            if (mapRef.current.isStyleLoaded()) {
                getRoute(start, end, waypoints);
            } else {
                mapRef.current.once('load', () => getRoute(start, end, waypoints));
            }
        }
    }, [pickupCoordinates, destinationCoordinates, waypoints, getRoute]);

    return (
        <div>
            <div ref={mapContainerRef} style={{width: '100%', height: '400px', marginTop: '20px'}}/>
            <div style={{marginTop: '20px'}}>
                {distance && <p>Total distance: {distance} km</p>}
                {duration && <p>Estimated travel time: {duration} minutes</p>}
            </div>
        </div>
    );
};

export default RouteMap;
