import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const TripStep3 = ({ formData, handleChange, setIsNextEnabled, onSubmit }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    const validateForm = () => {
        const errors = {};
        const { title, description, departureDate, destinationDate } = formData;

        if (!title && touchedFields.title) errors.title = "Title is required";
        if (!description && touchedFields.description) errors.description = "Description is required";
        if (!departureDate && touchedFields.departureDate) errors.departureDate = "Departure date is required";
        if (!destinationDate && touchedFields.destinationDate) errors.destinationDate = "Destination date is required";
        if (departureDate && destinationDate && departureDate > destinationDate) {
            errors.destinationDate = "Destination date must be later than the departure date";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        const isFormValid = validateForm();
        setIsNextEnabled(isFormValid);
    }, [formData, touchedFields, setIsNextEnabled]);

    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Step 3: Details and Completion
            </Typography>
            <TextField
                label="Request Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                error={!!validationErrors.title}
                helperText={validationErrors.title}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={() => handleBlur('description')}
                error={!!validationErrors.description}
                helperText={validationErrors.description}
            />
            <TextField
                label="Departure Date"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.departureDate || ''}
                onChange={(e) => handleChange('departureDate', e.target.value)}
                onBlur={() => handleBlur('departureDate')}
                InputLabelProps={{ shrink: true }}
                error={!!validationErrors.departureDate}
                helperText={validationErrors.departureDate}
            />
            <TextField
                label="Destination Date"
                type="datetime-local"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.destinationDate || ''}
                onChange={(e) => handleChange('destinationDate', e.target.value)}
                onBlur={() => handleBlur('destinationDate')}
                InputLabelProps={{ shrink: true }}
                error={!!validationErrors.destinationDate}
                helperText={validationErrors.destinationDate}
            />
        </Box>
    );
};

export default TripStep3;
