import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const RouteMap = ({ pickupCoordinates, destinationCoordinates }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    // States for storing route information
    const [distance, setDistance] = useState(null); // Total distance
    const [duration, setDuration] = useState(null); // Total travel time
    const [steps, setSteps] = useState([]); // Step-by-step instructions
    const [markers, setMarkers] = useState([]); // Array to store markers

    useEffect(() => {
        // Map initialization on first render
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: pickupCoordinates || [30.5, 50.5],
            zoom: 5,
        });

        return () => mapRef.current.remove();
    }, []);

    useEffect(() => {
        // Function to fetch and display the route
        const getRoute = async (start, end) => {
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
            );
            const json = await query.json();
            const data = json.routes[0];

            // Extracting route information
            const route = data.geometry.coordinates;
            setDistance((data.distance / 1000).toFixed(2)); // In kilometers
            setDuration((data.duration / 60).toFixed(2)); // In minutes

            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route,
                },
            };

            if (mapRef.current.getSource('route')) {
                mapRef.current.getSource('route').setData(geojson);
            } else {
                mapRef.current.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson,
                    },
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

            // Adjust zoom and position to fit the entire route
            mapRef.current.fitBounds([start, end], {
                padding: 50,
                maxZoom: 15,
            });
        };

        // Clear existing markers from the map
        markers.forEach(marker => marker.remove());
        setMarkers([]);

        // Add new markers for pickup and destination
        const newMarkers = [];

        if (pickupCoordinates) {
            const pickupMarker = new mapboxgl.Marker({ color: "green" })
                .setLngLat(pickupCoordinates)
                .addTo(mapRef.current);
            newMarkers.push(pickupMarker);
        }

        if (destinationCoordinates) {
            const destinationMarker = new mapboxgl.Marker({ color: "red" })
                .setLngLat(destinationCoordinates)
                .addTo(mapRef.current);
            newMarkers.push(destinationMarker);
        }

        // Update the state with new markers
        setMarkers(newMarkers);

        // Build the route if both coordinates are set
        if (pickupCoordinates && destinationCoordinates) {
            getRoute(pickupCoordinates, destinationCoordinates);
        }
    }, [pickupCoordinates, destinationCoordinates]);

    return (
        <div>
            <div
                ref={mapContainerRef}
                style={{ width: '100%', height: '400px', marginTop: '20px' }}
            />

            {/* Additional route information */}
            <div style={{ marginTop: '20px' }}>
                {distance && (
                    <p>Total distance: {distance} km</p>
                )}
                {duration && (
                    <p>Estimated travel time: {duration} minutes</p>
                )}
            </div>
        </div>
    );
};

export default RouteMap;
