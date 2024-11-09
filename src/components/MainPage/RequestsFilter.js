// RequestsFilter.js
import React from 'react';
import { Box, Button } from '@mui/material';

const RequestsFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, padding: 1 }}>
            <Button
                variant={currentFilter === 'parcel' ? 'contained' : 'outlined'}
                onClick={() => onFilterChange('parcel')}
            >
                Посылки
            </Button>
            <Button
                variant={currentFilter === 'trip' ? 'contained' : 'outlined'}
                onClick={() => onFilterChange('trip')}
            >
                Водители
            </Button>
        </Box>
    );
};

export default RequestsFilter;
