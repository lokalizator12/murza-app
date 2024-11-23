// RequestDetailsModal.js
import React from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography,} from '@mui/material';
import ReadOnlyImageCarousel from '../ReadOnlyImageCarousel';
import RouteMap from '../RouteMap';
import {useNavigate} from 'react-router-dom';
import {AccountCircle, Close, ContactMail, Map} from '@mui/icons-material';

const RequestDetailsModal = ({open, onClose, request, requestType}) => {
    const navigate = useNavigate();
    const isParcel = requestType === 'parcel';

    const handleProfileRedirect = () => {
        if (isParcel && request?.sender?.id) {
            onClose();
            setTimeout(() => {
                navigate(`/profile/${request.sender.id}`);
            }, 100);
        } else if (!isParcel && request?.driver?.id) {
            onClose();
            setTimeout(() => {
                navigate(`/profile/${request.driver.id}`);
            }, 100);
        } else {
            console.error('User ID is not available for redirection.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Request Details</DialogTitle>
            <DialogContent dividers>
                <Typography variant="h5" gutterBottom>
                    {request.title || 'Untitled'}
                </Typography>
                {isParcel && request.photos && request.photos.length > 0 && (
                    <ReadOnlyImageCarousel images={request.photos}/>
                )}
                <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Description:</strong> {request.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Price:</strong> {request.price ? `${request.price} €` : 'N/A'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Volume:</strong> {request.volume ? `${request.volume} m³` : 'N/A'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Weight:</strong> {request.weight ? `${request.weight} kg` : 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {isParcel ? (
                            <>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Pickup Address:</strong> {request.pickupAddress}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Delivery Address:</strong> {request.deliveryAddress}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Pickup Date:</strong>{' '}
                                    {request.pickupDate ? new Date(request.pickupDate).toLocaleDateString() : 'N/A'}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Delivery Date:</strong>{' '}
                                    {request.deliveryDate ? new Date(request.deliveryDate).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Departure Address:</strong> {request.departureAddress}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Destination Address:</strong> {request.destinationAddress}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Departure Date:</strong>{' '}
                                    {new Date(request.departureDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Arrival Date:</strong>{' '}
                                    {new Date(request.destinationDate).toLocaleDateString()}
                                </Typography>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Box sx={{mt: 2}}>
                    <RouteMap
                        pickupCoordinates={
                            isParcel
                                ? [request.pickupLongitude, request.pickupLatitude]
                                : [request.departureLongitude, request.departureLatitude]
                        }
                        destinationCoordinates={
                            isParcel
                                ? [request.deliveryLongitude, request.deliveryLatitude]
                                : [request.destinationLongitude, request.destinationLatitude]
                        }
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" startIcon={<ContactMail/>}>
                    Contact
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AccountCircle/>}
                    onClick={handleProfileRedirect}
                >
                    Profile
                </Button>
                <Button variant="outlined" color="info" startIcon={<Map/>}>
                    Route on Map
                </Button>
                <Button variant="text" color="inherit" startIcon={<Close/>} onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestDetailsModal;
