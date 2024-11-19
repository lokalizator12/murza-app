import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import ReadOnlyImageCarousel from '../ReadOnlyImageCarousel';
import RouteMap from '../RouteMap';
import {useNavigate} from 'react-router-dom';

const RequestDetailsModal = ({open, onClose, request, requestType}) => {
    const navigate = useNavigate(); // Hook for navigation
    const isParcel = requestType === 'parcel';

    React.useEffect(() => {
        console.log("Request in Modal:", request);
        console.log("Owner ID:", request?.ownerId);
        console.log("Request Type:", request?.requestTypeMove);
    }, [request, requestType]);


    const handleProfileRedirect = () => {
        if (requestType === 'parcel') {
            // Check if sender exists and has an id
            if (request?.sender?.id) {
                console.warn('Redirecting to sender profile. User ID:', request.sender.id);
                onClose(); // Close modal window
                setTimeout(() => {
                    navigate(`/profile/${request.sender.id}`); // Navigate to profile
                }, 100);
            } else {
                console.error('Sender ID is not available for redirection.');
            }
        } else if (requestType === 'trip') {
            // Check if driver exists and has an id
            if (request?.driver?.id) {
                console.warn('Redirecting to driver profile. User ID:', request.driver.id);
                onClose(); // Close modal window
                setTimeout(() => {
                    navigate(`/profile/${request.driver.id}`); // Navigate to profile
                }, 100);
            } else {
                console.error('Driver ID is not available for redirection.');
            }
        } else {
            console.error('Invalid requestType or missing request data.');
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Request Details</DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    {request.title || 'Untitled'}
                </Typography>
                {isParcel && request.photos && request.photos.length > 0 && (
                    <ReadOnlyImageCarousel images={request.photos}/>
                )}
                <Typography>Description: {request.description}</Typography>
                <Typography>Price: {request.price ? `${request.price} €` : 'N/A'}</Typography>
                <Typography>Volume: {request.volume ? `${request.volume} m³` : 'N/A'}</Typography>
                <Typography>Weight: {request.weight ? `${request.weight} kg` : 'N/A'}</Typography>

                {/* Show different details based on request type */}
                {isParcel ? (
                    <>
                        <Typography>Pickup Address: {request.pickupAddress}</Typography>
                        <Typography>Delivery Address: {request.deliveryAddress}</Typography>
                        <Typography>
                            Pickup Date:{' '}
                            {request.pickupDate ? new Date(request.pickupDate).toLocaleDateString() : 'N/A'}
                        </Typography>
                        <Typography>
                            Delivery Date:{' '}
                            {request.deliveryDate ? new Date(request.deliveryDate).toLocaleDateString() : 'N/A'}
                        </Typography>
                        <RouteMap
                            pickupCoordinates={[request.pickupLongitude, request.pickupLatitude]}
                            destinationCoordinates={[request.deliveryLongitude, request.deliveryLatitude]}
                        />
                    </>
                ) : (
                    <>
                        <Typography>Departure Address: {request.departureAddress}</Typography>
                        <Typography>Destination Address: {request.destinationAddress}</Typography>
                        <Typography>
                            Departure Date: {new Date(request.departureDate).toLocaleDateString()}
                        </Typography>
                        <Typography>Arrival Date: {new Date(request.destinationDate).toLocaleDateString()}</Typography>
                        <RouteMap
                            pickupCoordinates={[request.departureLongitude, request.departureLatitude]}
                            destinationCoordinates={[request.destinationLongitude, request.destinationLatitude]}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary">Contact</Button>
                <Button variant="contained" color="secondary" onClick={handleProfileRedirect}>
                    Show Profile
                </Button>
                <Button variant="outlined" color="info">Show Route on Map</Button>
                <Button onClick={onClose} color="inherit">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestDetailsModal;
