// PopupContent.js
import React from 'react';
import {Avatar, Box, Button, Typography} from '@mui/material';

const PopupContent = ({request, selectedType, onClose, onDetails}) => {
    const isParcel = selectedType === 'parcel';

    const photoUrl = isParcel
        ? request.previewPhoto
        : request.driverPhoto;

    return (
        <Box sx={{width: 200, padding: 1, fontFamily: 'Arial', position: 'relative'}}>
            <Button
                onClick={onClose}
                sx={{position: 'absolute', top: 5, right: 5, minWidth: 'auto', padding: 0, fontSize: '1.2rem'}}
            >
                ×
            </Button>
            <Avatar
                src={photoUrl || undefined}
                alt={isParcel ? 'Parcel preview' : 'Traveller photo'}
                sx={{width: 60, height: 60, mx: 'auto', mb: 1}}
            />
            <Typography variant="subtitle1" align="center" sx={{fontWeight: 'bold'}}>
                {request.title || (isParcel ? 'Parcel' : 'Trip')}
            </Typography>
            <Typography variant="body2">
                <strong>From:</strong> {isParcel ? request.pickupAddress : request.departureAddress}
            </Typography>
            <Typography variant="body2">
                <strong>To:</strong> {isParcel ? request.deliveryAddress : request.destinationAddress}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                onClick={onDetails}
                sx={{mt: 1}}
            >
                View details
            </Button>
        </Box>
    );
};

export default PopupContent;
