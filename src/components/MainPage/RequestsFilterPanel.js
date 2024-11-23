// RequestsFilterPanel.js
import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Typography
} from '@mui/material';
import {
    ArrowDownward,
    ArrowUpward,
    AttachMoney,
    CalendarToday,
    ClearAll,
    ExpandMore,
    LocationOn,
    Search,
} from '@mui/icons-material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {format} from "date-fns";

const RequestsFilterPanel = ({onApplyFilters, onResetFilters, currentFilter}) => {
    const initialFilters = {
        sortBy: '',
        sortDirection: 'ASC',
        priceRange: [0, 1000],
        dateFrom: null,
        dateTo: null,
        shippingMethod: '',
        // Other filters can be defined here
    };

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        // Reset filters when category changes
        setFilters(initialFilters);
    }, [currentFilter]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handlePriceChange = (event, newValue) => {
        setFilters({
            ...filters,
            priceRange: newValue,
        });
    };

    const handleDateChange = (name, date) => {
        setFilters({
            ...filters,
            [name]: date,
        });
    };


    const handleSortDirectionChange = () => {
        const newDirection = filters.sortDirection === 'ASC' ? 'DESC' : 'ASC';
        setFilters({
            ...filters,
            sortDirection: newDirection,
        });
    };

    const handleApply = () => {
        const appliedFilters = {
            ...filters,
            priceMin: filters.priceRange[0],
            priceMax: filters.priceRange[1],
            dateFrom: filters.dateFrom ? format(filters.dateFrom, 'yyyy-MM-dd') : null,
            dateTo: filters.dateTo ? format(filters.dateTo, 'yyyy-MM-dd') : null,
        };
        onApplyFilters(appliedFilters);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        onResetFilters();
    };

    const sortOptions = currentFilter === 'parcel'
        ? [
            {value: 'pickupDate', label: 'Pickup Date'},
            {value: 'price', label: 'Price'},
            // Add other options for parcels
        ]
        : currentFilter === 'trip'
            ? [
                {value: 'departureDate', label: 'Departure Date'},
                // Add other options for drivers
            ]
            : [];

    return (
        <Box sx={{padding: 2, width: '100%'}}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Typography variant="h6">Filters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {currentFilter === 'parcel' && (
                        <>
                            <TextField
                                label="From (pickup address)"
                                name="pickupAddress"
                                value={filters.pickupAddress || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="To (delivery address)"
                                name="deliveryAddress"
                                value={filters.deliveryAddress || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn/>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{mt: 2}}>
                                <Typography gutterBottom>
                                    Price Range (€)
                                </Typography>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <AttachMoney sx={{mr: 1}}/>
                                    <Slider
                                        value={filters.priceRange}
                                        onChange={handlePriceChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={1000}
                                        step={10}
                                        sx={{flexGrow: 1}}
                                    />
                                </Box>
                            </Box>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{mt: 2, display: 'flex', gap: 2}}>
                                    <DatePicker
                                        label="Pickup date from"
                                        value={filters.dateFrom}
                                        onChange={(date) => handleDateChange('dateFrom', date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarToday/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                    <DatePicker
                                        label="Pickup date to"
                                        value={filters.dateTo}
                                        onChange={(date) => handleDateChange('dateTo', date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarToday/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </>
                    )}
                    {currentFilter === 'trip' && (
                        <>
                            <TextField
                                label="From (departure address)"
                                name="departureAddress"
                                value={filters.departureAddress || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="To (destination address)"
                                name="destinationAddress"
                                value={filters.destinationAddress || ''}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn/>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{mt: 2, display: 'flex', gap: 2}}>
                                    <DatePicker
                                        label="Departure date from"
                                        value={filters.dateFrom}
                                        onChange={(date) => handleDateChange('dateFrom', date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarToday/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                    <DatePicker
                                        label="Departure date to"
                                        value={filters.dateTo}
                                        onChange={(date) => handleDateChange('dateTo', date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarToday/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </>
                    )}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Typography variant="h6">Sorting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="sort-by-label">Sort by</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            id="sort-by-select"
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleInputChange}
                            label="Sort by"
                        >
                            {sortOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                        <Typography variant="subtitle1" sx={{mr: 1}}>
                            Sort direction:
                        </Typography>
                        <IconButton onClick={handleSortDirectionChange}>
                            {filters.sortDirection === 'ASC' ? <ArrowUpward/> : <ArrowDownward/>}
                        </IconButton>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Box sx={{display: 'flex', gap: 2, marginTop: 2, justifyContent: 'center'}}>
                <Button variant="contained" color="primary" startIcon={<Search/>} onClick={handleApply}>
                    Apply
                </Button>
                <Button variant="outlined" color="secondary" startIcon={<ClearAll/>} onClick={handleReset}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default RequestsFilterPanel;
