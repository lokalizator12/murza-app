// components/RequestFilters.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const RequestFilters = ({ onFilterChange }) => {
    const [requestType, setRequestType] = useState('all'); // Тип запроса
    const [filters, setFilters] = useState({
        maxWeight: '',
        maxVolume: '',
        departureDate: '',
        destinationDate: '',
    });

    const handleRequestTypeChange = (event, newType) => {
        if (newType !== null) {
            setRequestType(newType);
            applyFilters({ ...filters, requestType: newType });
        }
    };

    const handleFilterChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
    };

    const applyFilters = (updatedFilters) => {
        onFilterChange(updatedFilters);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Фильтры
            </Typography>

            {/* Тип запроса */}
            <ToggleButtonGroup
                value={requestType}
                exclusive
                onChange={handleRequestTypeChange}
                sx={{ mb: 2 }}
                aria-label="Тип запроса"
            >
                <ToggleButton value="all" aria-label="Все">
                    Все
                </ToggleButton>
                <ToggleButton value="parcels" aria-label="Посылки">
                    Посылки
                </ToggleButton>
                <ToggleButton value="drivers" aria-label="Водители">
                    Водители
                </ToggleButton>
            </ToggleButtonGroup>

            {/* Фильтры параметров */}
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Макс. Вес (кг)"
                    type="number"
                    value={filters.maxWeight}
                    onChange={(e) => handleFilterChange('maxWeight', e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Макс. Объем (м³)"
                    type="number"
                    value={filters.maxVolume}
                    onChange={(e) => handleFilterChange('maxVolume', e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Дата отправления"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.departureDate}
                    onChange={(e) => handleFilterChange('departureDate', e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Дата прибытия"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.destinationDate}
                    onChange={(e) => handleFilterChange('destinationDate', e.target.value)}
                    fullWidth
                />
            </Box>

            {/* Кнопка для применения фильтров */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => applyFilters({ ...filters, requestType })}
            >
                Применить фильтры
            </Button>
        </Box>
    );
};

export default RequestFilters;
