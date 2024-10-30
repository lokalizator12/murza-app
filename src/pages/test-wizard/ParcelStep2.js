// ParcelStep2.js
import React from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';

const ParcelStep2 = ({ formData, handleChange }) => {
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 2: Данные о посылке
            </Typography>
            <TextField
                label="Масса (кг)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.weight || ''}
                onChange={(e) => handleChange('weight', e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <TextField
                    label="Длина"
                    type="number"
                    variant="outlined"
                    value={formData.length || ''}
                    onChange={(e) => handleChange('length', e.target.value)}
                />
                <TextField
                    label="Ширина"
                    type="number"
                    variant="outlined"
                    value={formData.width || ''}
                    onChange={(e) => handleChange('width', e.target.value)}
                />
                <TextField
                    label="Высота"
                    type="number"
                    variant="outlined"
                    value={formData.height || ''}
                    onChange={(e) => handleChange('height', e.target.value)}
                />
            </Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange('declaration', e.target.checked)}
                    />
                }
                label="Декларация"
            />
        </Box>
    );
};

export default ParcelStep2;
