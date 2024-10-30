// TripStep3.js
import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const TripStep3 = ({ formData, handleChange }) => {
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 3: Подробности и завершение
            </Typography>
            <TextField
                label="Заголовок заявки"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
            />
            <TextField
                label="Описание"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
            />
            <TextField
                label="Дата отправления"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.departureDate || ''}
                onChange={(e) => handleChange('departureDate', e.target.value)}
            />
            <TextField
                label="Дата прибытия"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.destinationDate || ''}
                onChange={(e) => handleChange('destinationDate', e.target.value)}
            />
        </Box>
    );
};

export default TripStep3;
