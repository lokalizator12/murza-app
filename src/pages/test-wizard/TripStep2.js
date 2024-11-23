import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography} from '@mui/material';
import axios from '../../axiosConfig';

const TripStep2 = ({formData, handleChange, setIsNextEnabled}) => {
    const [items, setItems] = useState([]);
    const [acceptedItems, setAcceptedItems] = useState([]);
    const [declinedItems, setDeclinedItems] = useState([]);
    const [showVolumeAlert, setShowVolumeAlert] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Fetch the list of all items when the component loads
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/items-delivery');
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    // Handlers for adding/removing items
    const handleAcceptItem = useCallback((item) => {
        setAcceptedItems((prev) =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
        setDeclinedItems((prev) => prev.filter(i => i !== item));
    }, []);

    const handleDeclineItem = useCallback((item) => {
        setDeclinedItems((prev) =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
        setAcceptedItems((prev) => prev.filter(i => i !== item));
    }, []);

    // Update formData state only when acceptedItems or declinedItems actually change
    useEffect(() => {
        const newAcceptedItems = acceptedItems.map(item => item.id);
        const newDeclinedItems = declinedItems.map(item => item.id);

        if (
            JSON.stringify(newAcceptedItems) !== JSON.stringify(formData.acceptedItemsId) ||
            JSON.stringify(newDeclinedItems) !== JSON.stringify(formData.declinedItemsId)
        ) {
            handleChange('acceptedItemsId', newAcceptedItems);
            handleChange('declinedItemsId', newDeclinedItems);
            console.log("Accepted items:", acceptedItems);
            console.log("Declined items:", declinedItems);
        }
    }, [acceptedItems, declinedItems, formData, handleChange]);

    // Field validation
    const validateFields = () => {
        const errors = {};
        if (!formData.maxWeight || formData.maxWeight <= 0) errors.maxWeight = "Weight must be a positive number";
        if (!formData.maxVolume || formData.maxVolume <= 0) errors.maxVolume = "Volume must be a positive number";
        if (!formData.maxLength || formData.maxLength <= 0) errors.maxLength = "Length must be a positive number";
        if (!formData.maxWidth || formData.maxWidth <= 0) errors.maxWidth = "Width must be a positive number";
        if (!formData.maxHeight || formData.maxHeight <= 0) errors.maxHeight = "Height must be a positive number";

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // Validate the form to enable the "Next" button
    useEffect(() => {
        const isFormValid = validateFields();
        setIsNextEnabled(isFormValid && (acceptedItems.length > 0 || declinedItems.length > 0));
    }, [formData, acceptedItems, declinedItems, setIsNextEnabled]);

    // Handler for updating dimensions and calculating volume
    const handleDimensionChange = (field, value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            handleChange(field, numericValue);


            const updatedDimensions = {
                ...formData,
                [field]: numericValue
            };
            const calculatedVolume = updatedDimensions.maxLength * updatedDimensions.maxWidth * updatedDimensions.maxHeight;

            // If the calculated volume exceeds the current "Max Volume", update it
            if (calculatedVolume > formData.maxVolume) {
                handleChange('maxVolume', calculatedVolume);
                setShowVolumeAlert(true); // Show the alert
            } else {
                setShowVolumeAlert(false); // Hide the alert if volume is not exceeded
            }
        } else {
            handleChange(field, ''); // If value is empty
        }
    };

    return (
        <Box sx={{textAlign: 'center', mb: 4}}>
            <Typography variant="h5" gutterBottom>
                Step 2: Cargo Parameters and Items
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange('declaration', e.target.checked)}
                    />
                }
                label="Going through the red corridor (declaration)"
            />

            <TextField
                label="Maximum Weight (kg)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.maxWeight || ''}
                onChange={(e) => handleChange('maxWeight', parseFloat(e.target.value) || '')}
                error={!!validationErrors.maxWeight}
                helperText={validationErrors.maxWeight}
            />

            <TextField
                label="Maximum Volume (m³)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.maxVolume || ''}
                onChange={(e) => handleChange('maxVolume', parseFloat(e.target.value) || '')}
                error={!!validationErrors.maxVolume}
                helperText={validationErrors.maxVolume}
            />

            {showVolumeAlert && (
                <Alert severity="warning" sx={{mt: 2}}>
                    The volume has been automatically recalculated based on the entered dimensions.
                </Alert>
            )}

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                <TextField
                    label="Max Length"
                    type="number"
                    variant="outlined"
                    value={formData.maxLength || ''}
                    onChange={(e) => handleDimensionChange('maxLength', e.target.value)}
                    error={!!validationErrors.maxLength}
                    helperText={validationErrors.maxLength}
                />
                <TextField
                    label="Max Width"
                    type="number"
                    variant="outlined"
                    value={formData.maxWidth || ''}
                    onChange={(e) => handleDimensionChange('maxWidth', e.target.value)}
                    error={!!validationErrors.maxWidth}
                    helperText={validationErrors.maxWidth}
                />
                <TextField
                    label="Max Height"
                    type="number"
                    variant="outlined"
                    value={formData.maxHeight || ''}
                    onChange={(e) => handleDimensionChange('maxHeight', e.target.value)}
                    error={!!validationErrors.maxHeight}
                    helperText={validationErrors.maxHeight}
                />
            </Box>

            <Typography variant="h6" sx={{mt: 4}}>
                Select Items for Transportation
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-around', mt: 4}}>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="h6">Accepted Items</Typography>
                    {items.map((item) => (
                        <Button
                            key={`accept-${item.id}`}
                            onClick={() => handleAcceptItem(item)}
                            variant={acceptedItems.includes(item) ? 'contained' : 'outlined'}
                            color={acceptedItems.includes(item) ? 'primary' : 'default'}
                            sx={{
                                m: 1,
                                minWidth: '100px',
                                backgroundColor: acceptedItems.includes(item) ? 'primary.main' : 'transparent',
                                color: acceptedItems.includes(item) ? '#fff' : 'text.primary',
                                borderRadius: '20px'
                            }}
                        >
                            {item.itemName}
                        </Button>
                    ))}
                </Box>

                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="h6">Declined Items</Typography>
                    {items.map((item) => (
                        <Button
                            key={`decline-${item.id}`}
                            onClick={() => handleDeclineItem(item)}
                            variant={declinedItems.includes(item) ? 'contained' : 'outlined'}
                            color={declinedItems.includes(item) ? 'secondary' : 'default'}
                            sx={{
                                m: 1,
                                minWidth: '100px',
                                backgroundColor: declinedItems.includes(item) ? 'secondary.main' : 'transparent',
                                color: declinedItems.includes(item) ? '#fff' : 'text.primary',
                                borderRadius: '20px'
                            }}
                        >
                            {item.itemName}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default TripStep2;
