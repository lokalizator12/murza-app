// ParcelStep2.js
import React, {useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import ImageCarousel from './../../components/ImageCarousel';

const ParcelStep2 = ({formData, handleChange, setIsNextEnabled}) => {
    const [images, setImages] = useState([]);

    const handlePositiveNumberChange = (field, value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            handleChange(field, numericValue);

            if (['length', 'width', 'height'].includes(field)) {
                // Обновляем поля size и volume
                const length = formData.length || 0;
                const width = formData.width || 0;
                const height = formData.height || 0;

                // Формируем строку для размера
                handleChange('size', `${length}x${width}x${height}`);

                // Рассчитываем объем и обновляем его в formData
                const volume = length * width * height;
                handleChange('volume', volume);
            }
        } else if (value === '') {
            handleChange(field, '');
        }
    };

    const validateForm = () => {
        const requiredFields = ['weight', 'length', 'width', 'height'];
        const allFieldsFilled = requiredFields.every((field) => formData[field] > 0);
        const hasImages = images.length > 0;
        setIsNextEnabled(allFieldsFilled && hasImages);
    };

    // Обновляем formData с изображениями каждый раз, когда они изменяются
    useEffect(() => {
        handleChange('images', images);
        validateForm();
    }, [images, formData, handleChange]);

    return (
        <Box sx={{textAlign: 'center', mb: 4}}>
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
                onChange={(e) => handlePositiveNumberChange('weight', e.target.value)}
            />
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                <TextField
                    label="Длина"
                    type="number"
                    variant="outlined"
                    value={formData.length || ''}
                    onChange={(e) => handlePositiveNumberChange('length', e.target.value)}
                />
                <TextField
                    label="Ширина"
                    type="number"
                    variant="outlined"
                    value={formData.width || ''}
                    onChange={(e) => handlePositiveNumberChange('width', e.target.value)}
                />
                <TextField
                    label="Высота"
                    type="number"
                    variant="outlined"
                    value={formData.height || ''}
                    onChange={(e) => handlePositiveNumberChange('height', e.target.value)}
                />
            </Box>

            {/* Поле для отображения объема */}
            <TextField
                label="Объем (куб. см)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.volume || ''}
                InputProps={{
                    readOnly: true,
                }}
                sx={{mt: 2}}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange('declaration', e.target.checked)}
                    />
                }
                label="Декларация"
            />

            {/* Image Carousel Component */}
            <ImageCarousel images={images} setImages={setImages} maxImages={10}/>
        </Box>
    );
};

export default ParcelStep2;
