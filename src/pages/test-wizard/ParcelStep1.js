import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import MapModal from './../../components/MapModal';
import RouteMap from './../../components/RouteMap';

const ParcelStep1 = ({ formData, handleChange }) => {
    const [isPickupModalOpen, setPickupModalOpen] = useState(false);
    const [isDestinationModalOpen, setDestinationModalOpen] = useState(false);
    const [pickupAddress, setPickupAddress] = useState(formData.pickupAddress || '');
    const [destinationAddress, setDestinationAddress] = useState(formData.destinationAddress || '');
    const [pickupCoordinates, setPickupCoordinates] = useState(formData.pickupCoordinates || null);
    const [destinationCoordinates, setDestinationCoordinates] = useState(formData.destinationCoordinates || null);

    // Обработчики для открытия и закрытия модальных окон
    const handleOpenPickupModal = () => setPickupModalOpen(true);
    const handleClosePickupModal = () => setPickupModalOpen(false);

    const handleOpenDestinationModal = () => setDestinationModalOpen(true);
    const handleCloseDestinationModal = () => setDestinationModalOpen(false);

    // Обновление адреса "откуда" из модального окна
    const updatePickupAddressFromMap = (location) => {
        const { address, coordinates } = location;
        setPickupAddress(address);
        setPickupCoordinates(coordinates);
        handleChange('pickupAddress', address);
        handleChange('pickupCoordinates', coordinates);
        handleClosePickupModal();
    };

    // Обновление адреса "куда" из модального окна
    const updateDestinationAddressFromMap = (location) => {
        const { address, coordinates } = location;
        setDestinationAddress(address);
        setDestinationCoordinates(coordinates);
        handleChange('destinationAddress', address);
        handleChange('destinationCoordinates', coordinates);
        handleCloseDestinationModal();
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 1: Местоположение и тип доставки
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <input
                    type="text"
                    value={pickupAddress}
                    readOnly
                    placeholder="Адрес отправления"
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
                <Button variant="contained" onClick={handleOpenPickupModal}>
                    Указать
                </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input
                    type="text"
                    value={destinationAddress}
                    readOnly
                    placeholder="Адрес назначения"
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
                <Button variant="contained" onClick={handleOpenDestinationModal}>
                    Указать
                </Button>
            </Box>

            {/* Модальные окна для выбора "Откуда" и "Куда" */}
            <MapModal
                isOpen={isPickupModalOpen}
                onClose={handleClosePickupModal}
                setAddress={updatePickupAddressFromMap}
            />
            <MapModal
                isOpen={isDestinationModalOpen}
                onClose={handleCloseDestinationModal}
                setAddress={updateDestinationAddressFromMap}
            />

            {/* Отображение карты с маршрутом */}
            <RouteMap
                pickupCoordinates={pickupCoordinates}
                destinationCoordinates={destinationCoordinates}
            />
        </Box>
    );
};

export default ParcelStep1;
