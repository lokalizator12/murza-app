// ParcelStep1.js
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MapModal from './../../components/MapModal';
import RouteMap from './../../components/RouteMap';

const ParcelStep1 = ({ formData, handleChange, setIsNextEnabled }) => {
    const [isPickupModalOpen, setPickupModalOpen] = useState(false);
    const [isDestinationModalOpen, setDestinationModalOpen] = useState(false);
    const [pickupAddress, setPickupAddress] = useState(formData.pickupAddress || '');
    const [destinationAddress, setDestinationAddress] = useState(formData.destinationAddress || '');
    const [pickupCoordinates, setPickupCoordinates] = useState(formData.pickupCoordinates || null);
    const [destinationCoordinates, setDestinationCoordinates] = useState(formData.destinationCoordinates || null);

    useEffect(() => {
        setIsNextEnabled(!!pickupAddress && !!destinationAddress);
    }, [pickupAddress, destinationAddress, setIsNextEnabled]);

    const handleOpenPickupModal = () => setPickupModalOpen(true);
    const handleClosePickupModal = () => setPickupModalOpen(false);

    const handleOpenDestinationModal = () => setDestinationModalOpen(true);
    const handleCloseDestinationModal = () => setDestinationModalOpen(false);

    const updatePickupAddressFromMap = (location) => {
        const { address, coordinates } = location;
        setPickupAddress(address);
        setPickupCoordinates(coordinates);
        handleChange('pickupAddress', address);
        handleChange('pickupLatitude', coordinates[1]);
        handleChange('pickupLongitude', coordinates[0]);
        handleClosePickupModal();
    };

    const updateDestinationAddressFromMap = (location) => {
        const { address, coordinates } = location;
        setDestinationAddress(address);
        setDestinationCoordinates(coordinates);
        handleChange('deliveryAddress', address);
        handleChange('deliveryLatitude', coordinates[1]);
        handleChange('deliveryLongitude', coordinates[0]);
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

            <RouteMap pickupCoordinates={pickupCoordinates} destinationCoordinates={destinationCoordinates} />
        </Box>
    );
};

export default ParcelStep1;
