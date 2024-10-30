// TripStep1.js
import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const TripStep1 = ({ formData, handleChange }) => {
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 1: Местоположение и тип доставки
            </Typography>
            <TextField
                label="Адрес отправления"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.departureAddress || ''}
                onChange={(e) => handleChange('departureAddress', e.target.value)}
            />
            <TextField
                label="Адрес назначения"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.destinationAddress || ''}
                onChange={(e) => handleChange('destinationAddress', e.target.value)}
            />
            <TextField
                label="Промежуточные точки"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.intermediateLocations || ''}
                onChange={(e) => handleChange('intermediateLocations', e.target.value)}
            />
        </Box>
    );
};

export default TripStep1;
