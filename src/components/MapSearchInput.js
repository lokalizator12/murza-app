// MapSearchInput.js
import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {AddressAutofill} from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';

// Временно вставьте ваш Mapbox Access Token напрямую для отладки
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapSearchInput = ({label, address, onAddressChange, onAddressSelect}) => {
    const [isMapOpen, setMapOpen] = useState(false);
    const mapContainerRef = useRef(null); // ссылка на контейнер для карты

    const handleRetrieve = (result) => {
        if (result && result.features && result.features.length > 0) {
            const feature = result.features[0];
            const placeName = feature.place_name;
            const coords = feature.geometry.coordinates;

            onAddressChange(placeName);
            setMapOpen(true);
        }
    };

    // Инициализация карты при открытии модального окна
    useEffect(() => {
        if (isMapOpen && mapContainerRef.current) {
            console.log("Инициализация карты в контейнере:", mapContainerRef.current);
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [37.6173, 55.7558], // Координаты по умолчанию (например, Москва)
                zoom: 10,
            });

            // Удаление карты при закрытии модального окна
            return () => {
                console.log("Удаление карты из DOM");
                map.remove();
            };
        }
    }, [isMapOpen]);

    return (
        <Box>
            <AddressAutofill accessToken={mapboxgl.accessToken} onRetrieve={handleRetrieve}>
                <TextField
                    label={label}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={address}
                    onChange={(e) => onAddressChange(e.target.value)}
                />
            </AddressAutofill>
            <Button variant="contained" onClick={() => setMapOpen(true)}>
                Подтвердить адрес на карте
            </Button>

            {/* Модальное окно с картой для подтверждения */}
            <Dialog open={isMapOpen} onClose={() => setMapOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Подтвердите адрес на карте</DialogTitle>
                <DialogContent>
                    <Box ref={mapContainerRef} sx={{width: '100%', height: '400px'}}/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setMapOpen(false)}
                        color="primary"
                    >
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MapSearchInput;
