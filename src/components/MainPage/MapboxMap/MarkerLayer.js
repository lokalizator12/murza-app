// MarkerLayer.js
import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './MarkerLayer.css';
import {ICON_URLS} from '../../../utils/constants';
import PopupContent from './PopupContent';

const MarkerLayer = ({map, mapLoaded, mapParcels, mapDrivers, selectedType, onRequestSelect}) => {
    const [popup, setPopup] = useState(null);
    const [markers, setMarkers] = useState([]);
    const animationFrameId = useRef(null); // Use ref to persist across renders
    const isMounted = useRef(true); // Track if the component is mounted

    useEffect(() => {
        isMounted.current = true; // Mark as mounted when the component is loaded

        if (!map || !mapLoaded) {
            console.log('Map is not fully loaded yet.');
            return;
        }

        console.log('MarkerLayer useEffect executed after map and style are loaded');
        console.log('Selected type:', selectedType);

        // Clear previous markers and routes
        markers.forEach(marker => marker.remove());
        setMarkers([]);

        if (popup) {
            popup.remove();
            setPopup(null);
        }

        const removeExistingRoute = () => {
            if (!map || !map.getStyle || !map.getSource) {
                return;
            }

            if (!map.isStyleLoaded()) {
                return;
            }

            if (map.getLayer('route-layer')) {
                map.removeLayer('route-layer');
            }
            if (map.getLayer('route-border-layer')) {
                map.removeLayer('route-border-layer');
            }
            if (map.getSource('route')) {
                map.removeSource('route');
            }

            // Cancel the animation frame if it exists
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };

        removeExistingRoute();

        const requests = selectedType === 'parcel' ? mapParcels : mapDrivers;

        console.log('Requests:', requests);

        if (!requests || requests.length === 0) {
            console.warn('No requests available');
            return;
        }

        // Function to check if coordinates are valid
        const isValidCoordinates = (coordinates) => {
            return Array.isArray(coordinates) &&
                coordinates.length === 2 &&
                typeof coordinates[0] === 'number' &&
                typeof coordinates[1] === 'number' &&
                !isNaN(coordinates[0]) &&
                !isNaN(coordinates[1]);
        };

        // Function to get and display the route
        const getRoute = async (coordinates) => {
            try {
                // Remove previous route
                removeExistingRoute();

                // Ensure all coordinates are valid
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

                    // Add route source with lineMetrics enabled
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: route,
                        },
                        lineMetrics: true, // Enable line metrics for animation
                    });

                    // Add route border layer
                    map.addLayer({
                        id: 'route-border-layer',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-cap': 'round',
                            'line-join': 'round',
                        },
                        paint: {
                            'line-color': '#000000', // Black border
                            'line-width': 7,          // Border width
                            'line-opacity': 0.6,
                        },
                    });

                    // Add animated route layer with line-gradient
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
                                0, '#FFFFFF',         // White start
                                0.45, '#FFFFFF',      // White before beam
                                0.5, '#D2691E',       // Chocolate beam
                                0.55, '#FFFFFF',      // White after beam
                                1, '#FFFFFF'          // White end
                            ],
                            'line-width': 5,
                            'line-opacity': 1.0,
                        },
                    });

                    // Fit map to route
                    const bounds = new mapboxgl.LngLatBounds();
                    route.coordinates.forEach(coord => bounds.extend(coord));
                    map.fitBounds(bounds, {
                        padding: 50,
                        animate: true,
                        duration: 1000,
                    });

                    // Animation loop
                    let lineProgress = 0.0;

                    const animateLine = () => {
                        if (!isMounted.current || !map || !map.getLayer('route-layer')) {
                            // Stop animation if the component is not mounted, the map is not available, or the layer is missing
                            if (animationFrameId.current) {
                                cancelAnimationFrame(animationFrameId.current);
                                animationFrameId.current = null;
                            }
                            return;
                        }

                        lineProgress += 0.01; // Animation speed
                        if (lineProgress > 1.0) {
                            lineProgress = 0.0; // Restart animation
                        }

                        // Define beam positions
                        const beamStart = lineProgress - 0.05;
                        const beamEnd = lineProgress + 0.05;

                        // Construct gradient array ensuring strictly ascending inputs
                        let gradientArray = [
                            'interpolate',
                            ['linear'],
                            ['line-progress'],
                        ];

                        if (lineProgress <= 0.05) {
                            // At the start, no beamStart
                            gradientArray.push(
                                0, '#D2691E',
                                beamEnd, '#FFFFFF',
                                1, '#FFFFFF'
                            );
                        } else if (lineProgress >= 0.95) {
                            // At the end, no beamEnd
                            gradientArray.push(
                                0, '#FFFFFF',
                                beamStart, '#FFFFFF',
                                1, '#D2691E'
                            );
                        } else {
                            // Middle of the line
                            gradientArray.push(
                                0, '#FFFFFF',
                                beamStart, '#FFFFFF',
                                lineProgress, '#D2691E',
                                beamEnd, '#FFFFFF',
                                1, '#FFFFFF'
                            );
                        }

                        try {
                            map.setPaintProperty('route-layer', 'line-gradient', gradientArray);
                        } catch (error) {
                            console.error('Error setting line-gradient:', error);
                        }

                        // Request next animation frame
                        animationFrameId.current = requestAnimationFrame(animateLine);
                    };

                    // Start the animation
                    animateLine();
                } else {
                    console.error('No route found');
                }
            } catch (error) {
                console.error('Error fetching route:', error);
            }
        };

        // Function to display the popup
        const showPopup = (request, coordinates) => {
            // Remove existing popup
            if (popup) {
                popup.remove();
                setPopup(null);
            }

            // Create a container for the popup content
            const popupNode = document.createElement('div');

            // Define handlers
            const handleClose = () => {
                if (popup) {
                    popup.remove();
                    ReactDOM.unmountComponentAtNode(popupNode);
                    setPopup(null);
                }
                removeExistingRoute();
                map.flyTo({center: [0, 0], zoom: 2});
            };

            const handleDetails = () => {
                const requestId = selectedType === 'parcel' ? request.idParcel : request.idTrip;
                console.log('Request object:', request);
                console.log('Request ID:', requestId);
                if (!requestId) {
                    console.error('Request ID is undefined');
                    return;
                }
                onRequestSelect(requestId, selectedType);
            };

            // Render the React component into the popupNode
            ReactDOM.render(
                <PopupContent
                    request={request}
                    selectedType={selectedType}
                    onClose={handleClose}
                    onDetails={handleDetails}
                />,
                popupNode
            );

            // Create and show the popup
            const newPopup = new mapboxgl.Popup({closeOnClick: false, closeButton: false})
                .setLngLat(coordinates[Math.floor(coordinates.length / 2)])
                .setDOMContent(popupNode)
                .addTo(map);

            setPopup(newPopup);

            // Ensure React component is unmounted when the popup is closed
            newPopup.on('close', () => {
                ReactDOM.unmountComponentAtNode(popupNode);
                setPopup(null);
                removeExistingRoute();
                map.flyTo({center: [0, 0], zoom: 2});
            });
        };

        // Handler for marker click
        const handleMarkerClick = (request, allCoordinates) => {
            removeExistingRoute();
            getRoute(allCoordinates);
            showPopup(request, allCoordinates);
        };

        // Add markers for each request
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

            // All coordinates (start, intermediate, end)
            const allCoordinates = [startCoordinates, ...intermediateCoordinates, endCoordinates];

            // Function to create a custom marker
            const createCustomMarker = (coordinates, type) => {
                if (!isValidCoordinates(coordinates)) {
                    console.warn(`Invalid coordinates for ${type}:`, coordinates);
                    return;
                }

                const el = document.createElement('div');
                el.className = `marker ${type} ${selectedType}`;

                // Add click handler to the marker
                el.addEventListener('click', () => handleMarkerClick(request, allCoordinates));

                // Create and add the marker to the map
                const marker = new mapboxgl.Marker(el)
                    .setLngLat(coordinates)
                    .addTo(map);

                setMarkers(prevMarkers => [...prevMarkers, marker]);
            };

            // Create markers for start and end points
            createCustomMarker(startCoordinates, 'start');
            createCustomMarker(endCoordinates, 'end');

            // Create markers for intermediate points
            intermediateCoordinates.forEach((coord) => {
                createCustomMarker(coord, 'intermediate');
            });
        });

        // Cleanup on unmount
        return () => {
            isMounted.current = false; // Mark as unmounted
            if (popup) {
                popup.remove();
                setPopup(null);
            }
            markers.forEach(marker => marker.remove());
            setMarkers([]);

            removeExistingRoute();
        };
    }, [map, mapLoaded, mapParcels, mapDrivers, selectedType]);

    return null;
};

// Constants for custom marker icons
document.documentElement.style.setProperty('--parcel-start-icon', `url(${ICON_URLS.PARCEL_START})`);
document.documentElement.style.setProperty('--trip-start-icon', `url(${ICON_URLS.TRIP_START})`);
document.documentElement.style.setProperty('--parcel-end-icon', `url(${ICON_URLS.PARCEL_END})`);
document.documentElement.style.setProperty('--trip-end-icon', `url(${ICON_URLS.TRIP_END})`);
document.documentElement.style.setProperty('--trip-intermediate-icon', `url(${ICON_URLS.INTERMEDIATE})`);

export default MarkerLayer;
