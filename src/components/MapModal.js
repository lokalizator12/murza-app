// components/MapModal.js
import React, { useRef, useEffect } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapModal = ({ isOpen, onClose, setCoords, setAddress }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (isOpen && mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.5, 40],
                zoom: 9,
            });

            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: {
                    color: 'red',
                },
            });

            map.addControl(geocoder);

            geocoder.on('result', (e) => {
                const { center, place_name } = e.result;
                setCoords({ lat: center[1], lng: center[0] });
                setAddress(place_name);
            });

            map.on('click', (e) => {
                const { lng, lat } = e.lngLat;
                setCoords({ lat, lng });
            });

            return () => map.remove();
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Укажите адрес на карте</DialogTitle>
            <DialogContent>
                <Box ref={mapContainerRef} sx={{ width: '100%', height: '400px' }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MapModal;
