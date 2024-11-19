// ParcelStep2.js
import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import ImageCarousel from './../../components/ImageCarousel';

const ParcelStep2 = ({ formData, handleChange, setIsNextEnabled }) => {
    const [images, setImages] = useState([]);

    const handlePositiveNumberChange = (field, value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            handleChange(field, numericValue);

            if (['length', 'width', 'height'].includes(field)) {
                // Update size and volume fields
                const length = formData.length || 0;
                const width = formData.width || 0;
                const height = formData.height || 0;

                // Form the size string
                handleChange('size', `${length}x${width}x${height}`);

                // Calculate volume and update it in formData
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

    // Update formData with images each time they change
    useEffect(() => {
        handleChange('images', images);
        validateForm();
    }, [images, formData, handleChange]);

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Step 2: Parcel Information
            </Typography>
            <TextField
                label="Weight (kg)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.weight || ''}
                onChange={(e) => handlePositiveNumberChange('weight', e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <TextField
                    label="Length"
                    type="number"
                    variant="outlined"
                    value={formData.length || ''}
                    onChange={(e) => handlePositiveNumberChange('length', e.target.value)}
                />
                <TextField
                    label="Width"
                    type="number"
                    variant="outlined"
                    value={formData.width || ''}
                    onChange={(e) => handlePositiveNumberChange('width', e.target.value)}
                />
                <TextField
                    label="Height"
                    type="number"
                    variant="outlined"
                    value={formData.height || ''}
                    onChange={(e) => handlePositiveNumberChange('height', e.target.value)}
                />
            </Box>

            {/* Field to display volume */}
            <TextField
                label="Volume (cubic cm)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.volume || ''}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ mt: 2 }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange('declaration', e.target.checked)}
                    />
                }
                label="Declaration"
            />

            {/* Image Carousel Component */}
            <ImageCarousel images={images} setImages={setImages} maxImages={10} />
        </Box>
    );
};

export default ParcelStep2;
