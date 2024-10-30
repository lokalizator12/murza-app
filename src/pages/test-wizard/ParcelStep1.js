// ParcelStep1.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MapSearchInput from './../../components/MapSearchInput';
import MapModal from './../../components/MapModal';
import RouteMap from './../../components/RouteMap';

const ParcelStep1 = ({ formData, handleChange }) => {
    const [isPickupModalOpen, setPickupModalOpen] = useState(false);
    const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);
    const [pickupCoords, setPickupCoords] = useState({ lat: null, lng: null });
    const [deliveryCoords, setDeliveryCoords] = useState({ lat: null, lng: null });

    // Обработка выбора адреса через AddressAutofill
    const handleAddressSelect = (type, result) => {
        const { latitude, longitude, fullAddress } = result.features[0].properties;

        if (type === 'pickup') {
            setPickupCoords({ lat: latitude, lng: longitude });
            handleChange('pickupAddress', fullAddress);
        } else if (type === 'delivery') {
            setDeliveryCoords({ lat: latitude, lng: longitude });
            handleChange('deliveryAddress', fullAddress);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 1: Местоположение и тип доставки
            </Typography>

            <MapSearchInput
                label="Адрес отправления"
                address={formData.pickupAddress || ''}
                onAddressChange={(value) => handleChange('pickupAddress', value)}
                onMapOpen={() => setPickupModalOpen(true)}
                onAddressSelect={(result) => handleAddressSelect('pickup', result)}
            />

            <MapSearchInput
                label="Адрес доставки"
                address={formData.deliveryAddress || ''}
                onAddressChange={(value) => handleChange('deliveryAddress', value)}
                onMapOpen={() => setDeliveryModalOpen(true)}
                onAddressSelect={(result) => handleAddressSelect('delivery', result)}
            />

            <MapModal
                isOpen={isPickupModalOpen}
                onClose={() => setPickupModalOpen(false)}
                setCoords={(coords) => setPickupCoords(coords)}
                setAddress={(address) => handleChange('pickupAddress', address)}
            />

            <MapModal
                isOpen={isDeliveryModalOpen}
                onClose={() => setDeliveryModalOpen(false)}
                setCoords={(coords) => setDeliveryCoords(coords)}
                setAddress={(address) => handleChange('deliveryAddress', address)}
            />

            <RouteMap pickupCoords={pickupCoords} deliveryCoords={deliveryCoords} />
        </Box>
    );
};

export default ParcelStep1;
