// MarkerLayer.js
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MarkerLayer = ({ map, mapLoaded, mapParcels, mapDrivers, selectedType }) => {
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        if (!map || !mapLoaded) {
            console.log('Map is not fully loaded yet.');
            return;
        }

        console.log('MarkerLayer useEffect executed after map and style are loaded');
        console.log('Selected type:', selectedType);

        const isParcel = selectedType === 'parcel';
        const requests = isParcel ? mapParcels : mapDrivers;

        console.log('Requests:', requests);

        // Проверка наличия данных
        if (!requests || requests.length === 0) {
            console.warn('No requests available');
            return;
        }
        try {
            // Формируем GeoJSON данные для маршрутов и точек
            const routeFeatures = [];
            const pointFeatures = [];

            requests.forEach((request) => {
                const coordinates = isParcel
                    ? [
                        [request.pickupLongitude, request.pickupLatitude],
                        [request.deliveryLongitude, request.deliveryLatitude],
                    ]
                    : [
                        [request.departureLongitude, request.departureLatitude],
                        ...(request.intermediateLocations || []).map(loc => [loc.longitude, loc.latitude]),
                        [request.destinationLongitude, request.destinationLatitude],
                    ];

                // Исправление порядка координат для всех точек
                const correctedCoordinates = coordinates;

                console.log('Corrected Coordinates for request', request.idParcel || request.idTrip, ':', correctedCoordinates);

                // Проверяем валидность координат
                const validCoordinates = correctedCoordinates.every(coord =>
                    Array.isArray(coord) &&
                    coord.length === 2 &&
                    typeof coord[0] === 'number' &&
                    typeof coord[1] === 'number' &&
                    !isNaN(coord[0]) &&
                    !isNaN(coord[1])
                );

                if (!validCoordinates) {
                    console.warn('Invalid coordinates for request:', request);
                    return;
                }

                // Добавляем маршрут
                routeFeatures.push({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: correctedCoordinates,
                    },
                    properties: {
                        id: request.idParcel || request.idTrip,
                        title: request.title || `Trip by ${request.driverFirstName}`,
                        previewPhoto: request.previewPhoto || request.driverPhoto,
                        type: selectedType,
                    },
                });

                // Добавляем точки (начальная и конечная)
                pointFeatures.push(
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: correctedCoordinates[0],
                        },
                        properties: {
                            ...request,
                            pointType: 'start',
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: correctedCoordinates[correctedCoordinates.length - 1],
                        },
                        properties: {
                            ...request,
                            pointType: 'end',
                        },
                    }
                );
            });

            console.log('Route Features:', routeFeatures);
            console.log('Point Features:', pointFeatures);

            const routesData = {
                type: 'FeatureCollection',
                features: routeFeatures,
            };

            const pointsData = {
                type: 'FeatureCollection',
                features: pointFeatures,
            };

            console.log('routesData:', routesData);
            console.log('pointsData:', pointsData);

            // Добавляем или обновляем источники и слои

                // Добавляем или обновляем источники
                if (map.getSource('routes')) {
                    map.getSource('routes').setData(routesData);
                    console.log('Updated routes source');
                } else {
                    map.addSource('routes', {
                        type: 'geojson',
                        data: routesData,
                    });
                    console.log('Added routes source');
                }

                if (map.getSource('points')) {
                    map.getSource('points').setData(pointsData);
                    console.log('Updated points source');
                } else {
                    map.addSource('points', {
                        type: 'geojson',
                        data: pointsData,
                    });
                    console.log('Added points source');
                }

                // Добавляем или обновляем слои
                if (!map.getLayer('routes-layer')) {
                    map.addLayer({
                        id: 'routes-layer',
                        type: 'line',
                        source: 'routes',
                        layout: {
                            'line-cap': 'round',
                            'line-join': 'round',
                        },
                        paint: {
                            'line-color': isParcel ? '#0000FF' : '#008000',
                            'line-width': 3,
                            'line-opacity': 0.5,
                        },
                    });
                    console.log('Added routes layer');
                }

                if (!map.getLayer('points-layer')) {
                    map.addLayer({
                        id: 'points-layer',
                        type: 'circle',
                        source: 'points',
                        paint: {
                            'circle-color': [
                                'match',
                                ['get', 'pointType'],
                                'start', '#FF0000',
                                'end', '#00FF00',
                                '#000000',
                            ],
                            'circle-radius': 6,
                            'circle-stroke-width': 1,
                            'circle-stroke-color': '#fff',
                        },
                    });
                    console.log('Added points layer');


                // Добавляем слой для выделенного маршрута
                if (!map.getLayer('highlighted-route')) {
                    map.addLayer({
                        id: 'highlighted-route',
                        type: 'line',
                        source: 'routes',
                        layout: {},
                        paint: {
                            'line-color': '#FFA500',
                            'line-width': 5,
                        },
                        filter: ['==', 'id', ''],
                    });
                    console.log('Added highlighted-route layer');
                }

                // Добавляем обработчики событий
                map.on('mouseenter', 'points-layer', handleMouseEnter);
                map.on('mouseleave', 'points-layer', handleMouseLeave);
                map.on('click', 'points-layer', handleClick);
            } else {
                console.warn('Map style is not loaded yet.');
            } console.log('Sources and layers added successfully.');
        } catch (error) {
            console.error('Error in MarkerLayer useEffect:', error);
        }

        // Функции обработчиков событий
        const handleMouseEnter = (e) => {
            map.getCanvas().style.cursor = 'pointer';

            const feature = e.features[0];
            const routeId = feature.properties.id;

            // Выделяем соответствующий маршрут
            map.setFilter('highlighted-route', ['==', 'id', routeId]);
        };

        const handleMouseLeave = () => {
            map.getCanvas().style.cursor = '';
            // Снимаем выделение маршрута
            map.setFilter('highlighted-route', ['==', 'id', '']);
        };

        const handleClick = (e) => {
            const feature = e.features[0];
            const coordinates = feature.geometry.coordinates.slice();
            const { title, previewPhoto } = feature.properties;

            if (popup) popup.remove();

            const newPopup = new mapboxgl.Popup({ offset: 25 })
                .setLngLat(coordinates)
                .setHTML(
                    `<div>
                        <strong>${title}</strong><br/>
                        <img src="${previewPhoto}" style="width:100px; height:auto;"/>
                    </div>`
                )
                .addTo(map);

            setPopup(newPopup);
        };

        // Очистка при размонтировании
        return () => {
            if (map) {
                // Удаляем слои и источники
                if (map.getLayer('routes-layer')) map.removeLayer('routes-layer');
                if (map.getLayer('points-layer')) map.removeLayer('points-layer');
                if (map.getLayer('highlighted-route')) map.removeLayer('highlighted-route');
                if (map.getSource('routes')) map.removeSource('routes');
                if (map.getSource('points')) map.removeSource('points');

                // Удаляем обработчики событий
                map.off('mouseenter', 'points-layer', handleMouseEnter);
                map.off('mouseleave', 'points-layer', handleMouseLeave);
                map.off('click', 'points-layer', handleClick);
            }

            if (popup) popup.remove();
        };
    }, [map, mapLoaded, mapParcels, mapDrivers, selectedType]);

    return null;
};

export default MarkerLayer;