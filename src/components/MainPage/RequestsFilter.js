// RequestsFilter.js
import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {DirectionsCar, LocalShipping} from '@mui/icons-material';

const RequestsFilter = ({currentFilter, onFilterChange}) => {
    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            onFilterChange(newFilter);
        }
    };

    return (
        <ToggleButtonGroup
            value={currentFilter}
            exclusive
            onChange={handleFilterChange}
            fullWidth
            sx={{mb: 2}}
        >
            <ToggleButton value="parcel">
                <LocalShipping sx={{mr: 1}}/>
                Parcels
            </ToggleButton>
            <ToggleButton value="trip">
                <DirectionsCar sx={{mr: 1}}/>
                Drivers
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default RequestsFilter;
