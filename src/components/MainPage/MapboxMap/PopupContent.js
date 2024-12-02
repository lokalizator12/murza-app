// PopupContent.js
import React from 'react';
import {Avatar, Box, Button, Typography} from '@mui/material';

const PopupContent = ({request, selectedType, onClose, onDetails}) => {
    const isParcel = selectedType === 'parcel';

    // Determine the photo URL
    const photoUrl = isParcel
        ? (request.previewPhoto || '/default-parcel.png')
        : (request.driverPhoto || '/default-driver.png');

    return (
        <Box sx={{width: 200, padding: 1, fontFamily: 'Arial', position: 'relative'}}>
            <Button
                onClick={onClose}
                sx={{position: 'absolute', top: 5, right: 5, minWidth: 'auto', padding: 0, fontSize: '1.2rem'}}
            >
                ×
            </Button>
            <Avatar
                src={photoUrl}
                alt="Request Avatar"
                sx={{width: 60, height: 60, mx: 'auto', mb: 1}}
            />
            <Typography variant="subtitle1" align="center" sx={{fontWeight: 'bold'}}>
                {request.title || (isParcel ? 'Parcel' : 'Trip')}
            </Typography>
            <Typography variant="body2">
                <strong>From:</strong> {isParcel ? request.departureAddress : request.departureAddress}
            </Typography>
            <Typography variant="body2">
                <strong>To:</strong> {isParcel ? request.destinationAddress : request.destinationAddress}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                onClick={onDetails}
                sx={{mt: 1}}
            >
                Details
            </Button>
        </Box>
    );
};

export default PopupContent;
