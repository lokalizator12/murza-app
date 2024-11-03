// MapSearchInput.js
import React, {useCallback} from 'react';
import {Box, Button, TextField} from '@mui/material';
import {AddressAutofill, useConfirmAddress} from '@mapbox/search-js-react';

const MapSearchInput = ({label, address, onAddressChange, onAddressSelect}) => {
    const {formRef, showConfirm} = useConfirmAddress({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    });

    const handleRetrieve = (result) => {
        console.log('Autofill result:', result);
        onAddressChange(result.features[0]?.properties?.formatted);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const result = await showConfirm();
        console.log('Confirm result:', result);

        if (result.type === 'change' && result.feature) {
            onAddressSelect(result.feature);
        } else if (result.type === 'nochange') {
            onAddressSelect({place_name: address});
        }
    }, [showConfirm, address, onAddressSelect]);

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <Box sx={{display: 'flex', gap: 2}}>
                <AddressAutofill
                    accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onRetrieve={handleRetrieve}
                >
                    <TextField
                        label={label}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={address}
                        onChange={(e) => onAddressChange(e.target.value)}
                    />
                </AddressAutofill>
                <Button variant="contained" type="submit">
                    Подтвердить адрес
                </Button>
            </Box>
        </form>
    );
};

export default MapSearchInput;
