// TripStep3.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const TripStep3 = ({ formData, handleChange, setIsNextEnabled, onSubmit }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    const validateForm = () => {
        const errors = {};
        const { title, description, departureDate, destinationDate } = formData;

        if (!title && touchedFields.title) errors.title = "Заголовок обязателен";
        if (!description && touchedFields.description) errors.description = "Описание обязательно";
        if (!departureDate && touchedFields.departureDate) errors.departureDate = "Дата отправления обязательна";
        if (!destinationDate && touchedFields.destinationDate) errors.destinationDate = "Дата прибытия обязательна";
        if (departureDate && destinationDate && departureDate > destinationDate) {
            errors.destinationDate = "Дата прибытия должна быть позже даты отправления";
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
                Шаг 3: Подробности и завершение
            </Typography>
            <TextField
                label="Заголовок заявки"
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
                label="Описание"
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
                label="Дата отправления"
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
                label="Дата прибытия"
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
