// components/RouteMap.js
import React, {useEffect, useRef} from 'react';
import {Box} from '@mui/material';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const RouteMap = ({pickupCoords, deliveryCoords}) => {
    const routeMapRef = useRef(null);

    useEffect(() => {
        if (pickupCoords.lat && deliveryCoords.lat) {
            const map = new mapboxgl.Map({
                container: routeMapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [(pickupCoords.lng + deliveryCoords.lng) / 2, (pickupCoords.lat + deliveryCoords.lat) / 2],
                zoom: 10,
            });

            const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords.lng},${pickupCoords.lat};${deliveryCoords.lng},${deliveryCoords.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

            fetch(routeUrl)
                .then((response) => response.json())
                .then((data) => {
                    const route = data.routes[0].geometry.coordinates;
                    map.on('load', () => {
                        map.addSource('route', {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: route,
                                },
                            },
                        });

                        map.addLayer({
                            id: 'route',
                            type: 'line',
                            source: 'route',
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round',
                            },
                            paint: {
                                'line-color': '#3887be',
                                'line-width': 5,
                            },
                        });
                    });
                });

            return () => map.remove();
        }
    }, [pickupCoords, deliveryCoords]);

    return <Box sx={{width: '100%', height: '400px'}} ref={routeMapRef}/>;
};

export default RouteMap;
