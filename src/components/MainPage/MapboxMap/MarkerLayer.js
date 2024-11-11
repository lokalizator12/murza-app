import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MarkerLayer.css';
import { ICON_URLS } from '../../../utils/contstants';

const MarkerLayer = ({ map, mapLoaded, mapParcels, mapDrivers, selectedType }) => {
    const [popup, setPopup] = useState(null);
    const [markers, setMarkers] = useState([]);
    let animationFrameId = null;

    useEffect(() => {
        if (!map || !mapLoaded) {
            console.log('Map is not fully loaded yet.');
            return;
        }

        console.log('MarkerLayer useEffect executed after map and style are loaded');
        console.log('Selected type:', selectedType);

        // Очищаем предыдущие маркеры и маршруты
        markers.forEach(marker => marker.remove());
        setMarkers([]);

        if (popup) popup.remove();

        const removeExistingRoute = () => {
            if (map.getLayer('route-border-layer')) {
                map.removeLayer('route-border-layer');
            }
            if (map.getLayer('route-layer')) {
                map.removeLayer('route-layer');
            }
            if (map.getSource('route')) {
                map.removeSource('route');
            }

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        removeExistingRoute();

        const requests = selectedType === 'parcel' ? mapParcels : mapDrivers;

        console.log('Requests:', requests);

        // Проверка наличия данных
        if (!requests || requests.length === 0) {
            console.warn('No requests available');
            return;
        }

        // Проверка на валидность координат
        const isValidCoordinates = (coordinates) => {
            return Array.isArray(coordinates) &&
                coordinates.length === 2 &&
                typeof coordinates[0] === 'number' &&
                typeof coordinates[1] === 'number' &&
                !isNaN(coordinates[0]) &&
                !isNaN(coordinates[1]);
        };

        const getRoute = async (coordinates) => {
            try {
                // Удаляем предыдущий маршрут и его слои перед добавлением нового маршрута
                removeExistingRoute();

                // Убедитесь, что все координаты валидные
                const validCoordinates = coordinates.filter(isValidCoordinates);
                if (validCoordinates.length < 2) {
                    console.warn('Not enough valid coordinates for route');
                    return;
                }

                const waypoints = validCoordinates.map(coord => `${coord[0]},${coord[1]}`).join(';');
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0].geometry;

                    // Добавляем маршрут на карту как GeoJSON слой с поддержкой lineMetrics
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: route,
                        },
                        lineMetrics: true, // Добавляем поддержку line metrics
                    });

                    // Добавляем слой границы маршрута (широкий слой)
                    map.addLayer({
                        id: 'route-border-layer',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-cap': 'round',
                            'line-join': 'round',
                        },
                        paint: {
                            'line-color': '#000000', // Черный цвет для границы маршрута
                            'line-width': 7,         // Ширина границы
                            'line-opacity': 0.6,
                        },
                    });

                    // Добавляем слой с градиентом, который будет анимирован
                    map.addLayer({
                        id: 'route-layer',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-cap': 'round',
                            'line-join': 'round',
                        },
                        paint: {
                            'line-gradient': [
                                'interpolate',
                                ['linear'],
                                ['line-progress'],
                                0, '#FFFFFF',         // Белый в начале линии
                                0.45, '#FFFFFF',      // Белый до пучка
                                0.5, '#D2691E',       // Шоколадный цвет "пучка"
                                0.55, '#FFFFFF',      // Белый после "пучка"
                                1, '#FFFFFF'          // Белый до конца
                            ],
                            'line-width': 5,
                            'line-opacity': 1.0,
                        },
                    });

                    // Масштабируем карту, чтобы охватить весь маршрут
                    const bounds = new mapboxgl.LngLatBounds();
                    route.coordinates.forEach(coord => bounds.extend(coord));
                    map.fitBounds(bounds, {
                        padding: 50,
                        animate: true,
                        duration: 1000,
                    });

                    // Анимация "пучка" по маршруту
                    let lineProgress = 0.0;

                    const animateLine = () => {
                        lineProgress += 0.01; // Скорость анимации (можно изменить)
                        if (lineProgress > 1.0) {
                            lineProgress = 0.0; // Перезапускаем анимацию
                        }

                        // Обновляем градиент линии для создания эффекта движения пучка
                        map.setPaintProperty('route-layer', 'line-gradient', [
                            'interpolate',
                            ['linear'],
                            ['line-progress'],
                            0, '#FFFFFF',
                            Math.max(0, lineProgress - 0.05), '#FFFFFF', // Белый до пучка
                            lineProgress, '#D2691E',                   // Шоколадный цвет в текущем положении "пучка"
                            Math.min(1, lineProgress + 0.05), '#FFFFFF', // Белый после пучка
                            1, '#FFFFFF'
                        ]);

                        // Запрашиваем следующий кадр анимации
                        animationFrameId = requestAnimationFrame(animateLine);
                    };

                    // Запускаем анимацию
                    animateLine();
                } else {
                    console.error('No route found');
                }
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        // Добавляем все маркеры для каждой пары отправления и назначения
        requests.forEach((request) => {
            let startCoordinates, endCoordinates;

            if (selectedType === 'parcel') {
                startCoordinates = [request.pickupLongitude, request.pickupLatitude];
                endCoordinates = [request.deliveryLongitude, request.deliveryLatitude];
            } else if (selectedType === 'trip') {
                startCoordinates = [request.departureLongitude, request.departureLatitude];
                endCoordinates = [request.destinationLongitude, request.destinationLatitude];
            }

            const intermediateCoordinates = request.intermediateLocations
                ? request.intermediateLocations
                    .filter(loc => typeof loc.longitude !== 'undefined' && typeof loc.latitude !== 'undefined')
                    .map(loc => [loc.longitude, loc.latitude])
                : [];

            // Все координаты маршрута (начальная, промежуточные, конечная)
            const allCoordinates = [startCoordinates, ...intermediateCoordinates, endCoordinates];

            // Создаем кастомные маркеры для начальных и конечных точек
            const createCustomMarker = (coordinates, type) => {
                if (!isValidCoordinates(coordinates)) {
                    console.warn(`Invalid coordinates for ${type}:`, coordinates);
                    return;
                }

                const el = document.createElement('div');
                el.className = `marker ${type} ${selectedType}`;

                // Создаем и добавляем кастомный маркер на карту
                const marker = new mapboxgl.Marker(el)
                    .setLngLat(coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(`<h3>${request.departureAddress}</h3><p>${request.departureAddress}</p>`)
                    )
                    .addTo(map);

                setMarkers(prevMarkers => [...prevMarkers, marker]);

                // Добавляем событие клика для маркера
                el.addEventListener('click', () => handleClick(coordinates, type, allCoordinates));
            };

            createCustomMarker(startCoordinates, 'start');
            createCustomMarker(endCoordinates, 'end');

            intermediateCoordinates.forEach((coord, index) => {
                if (isValidCoordinates(coord)) {
                    createCustomMarker(coord, 'intermediate');
                } else {
                    console.warn('Invalid intermediate coordinates:', coord);
                }
            });

            // Обработчик для построения маршрута, отображения попапа и приближения
            const handleClick = (coordinates, pointType, allCoordinates) => {
                // Удаляем предыдущий попап, если он существует
                if (popup) popup.remove();

                // Создаем новое всплывающее окно с информацией
                const newPopup = new mapboxgl.Popup({ offset: 25 })
                    .setLngLat(coordinates)
                    .setHTML(`
                        <div>
                            <strong>${pointType === 'start' ? 'Отправление' : 'Прибытие'}:</strong><br/>
                            ${pointType === 'start' ? request.startLocation || 'Не указано' : request.endLocation || 'Не указано'}
                            <br/>
                            <strong>Стоимость:</strong> ${request.cost || 'Не указана'} €
                        </div>
                    `)
                    .addTo(map);

                setPopup(newPopup);

                // Строим маршрут при клике на маркер
                getRoute(allCoordinates);
            };
        });

        console.log('Markers and popups added successfully.');

        // Очистка при размонтировании
        return () => {
            if (map) {
                if (popup) popup.remove();
                markers.forEach(marker => marker.remove());
                setMarkers([]);

                removeExistingRoute();
            }
        };
    }, [map, mapLoaded, mapParcels, mapDrivers, selectedType]);

    return null;
};

// Константы для кастомных иконок маркеров
document.documentElement.style.setProperty('--parcel-start-icon', `url(${ICON_URLS.PARCEL_START})`);
document.documentElement.style.setProperty('--trip-start-icon', `url(${ICON_URLS.TRIP_START})`);
document.documentElement.style.setProperty('--parcel-end-icon', `url(${ICON_URLS.PARCEL_END})`);
document.documentElement.style.setProperty('--trip-end-icon', `url(${ICON_URLS.TRIP_END})`);
document.documentElement.style.setProperty('--trip-intermediate-icon', `url(${ICON_URLS.INTERMEDIATE})`);

export default MarkerLayer;
