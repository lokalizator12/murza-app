import React from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import ItemSelection from '../../components/ItemSelection';

const TripStep2 = ({ formData, handleChange }) => {
    const handleAcceptedItemsChange = (selectedItems) => {
        handleChange('acceptedItemsId', selectedItems);
    };

    const handleDeclinedItemsChange = (selectedItems) => {
        handleChange('declinedItemsId', selectedItems);
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 2: Параметры груза и предметы
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange('declaration', e.target.checked)}
                    />
                }
                label="Нужна декларация"
            />
            <TextField
                label="Максимальная масса (кг)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.maxWeight || ''}
                onChange={(e) => handleChange('maxWeight', e.target.value)}
            />
            <TextField
                label="Максимальный объем (м³)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.maxVolume || ''}
                onChange={(e) => handleChange('maxVolume', e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <TextField
                    label="Макс. длина"
                    type="number"
                    variant="outlined"
                    value={formData.maxLength || ''}
                    onChange={(e) => handleChange('maxLength', e.target.value)}
                />
                <TextField
                    label="Макс. ширина"
                    type="number"
                    variant="outlined"
                    value={formData.maxWidth || ''}
                    onChange={(e) => handleChange('maxWidth', e.target.value)}
                />
                <TextField
                    label="Макс. высота"
                    type="number"
                    variant="outlined"
                    value={formData.maxHeight || ''}
                    onChange={(e) => handleChange('maxHeight', e.target.value)}
                />
            </Box>

            {/* Убедитесь, что selectedItems передается как массив */}
            <ItemSelection
                selectedItems={Array.isArray(formData.acceptedItemsId) ? formData.acceptedItemsId : []}
                setSelectedItems={handleAcceptedItemsChange}
            />
            <ItemSelection
                selectedItems={Array.isArray(formData.declinedItemsId) ? formData.declinedItemsId : []}
                setSelectedItems={handleDeclinedItemsChange}
            />
        </Box>
    );
};

export default TripStep2;
