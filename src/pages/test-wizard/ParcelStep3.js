// ParcelStep3.js
import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const ParcelStep3 = ({ formData, handleChange }) => {
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
                label="Полное описание заявки"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
            />
            <TextField
                label="Дата забора"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.pickupDate || ''}
                onChange={(e) => handleChange('pickupDate', e.target.value)}
            />
            <TextField
                label="Дата доставки"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.deliveryDate || ''}
                onChange={(e) => handleChange('deliveryDate', e.target.value)}
            />
            <TextField
                label="Итоговая цена"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', e.target.value)}
            />
        </Box>
    );
};

export default ParcelStep3;
