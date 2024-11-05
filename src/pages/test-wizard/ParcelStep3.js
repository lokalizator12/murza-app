// ParcelStep3.js
import React, { useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const ParcelStep3 = ({ formData, handleChange, setIsNextEnabled }) => {
    // Validation function to enable or disable the "Next" button
    const validateForm = () => {
        const { title, description, pickupDate, deliveryDate, price } = formData;

        // All required fields must be filled and price must be positive
        const isValid = title && description && pickupDate && deliveryDate && price > 0;

        // Update the "Next" button status
        setIsNextEnabled(isValid);
    };

    // Run validation whenever formData changes
    useEffect(() => {
        validateForm();
    }, [formData]);

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
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Дата доставки"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.deliveryDate || ''}
                onChange={(e) => handleChange('deliveryDate', e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Итоговая цена"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.price || ''}
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    handleChange('price', value >= 0 ? value : ''); // Ensure price is non-negative
                }}
            />
        </Box>
    );
};

export default ParcelStep3;
