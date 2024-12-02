import React from 'react';
import {Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';

const RequestsList = ({requests, currentFilter, onSelectRequest}) => {
    return (
        <Box sx={{
            width: '100%',
            maxWidth: 600,
            height: '100vh',
            overflowY: 'auto',
            padding: 2,
            borderRight: '1px solid #ccc'
        }}>
            <Typography variant="h6" gutterBottom>
                Request List
            </Typography>
            <Divider/>
            <List>
                {requests.map(request => (
                    <ListItem key={request.idParcel || request.idTrip} alignItems="flex-start"
                              sx={{padding: 1, borderBottom: '1px solid #eee'}}>
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                src={request.previewPhoto || ''}
                                alt="preview"
                                sx={{width: 64, height: 64, marginRight: 2}}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <>
                                    {currentFilter === 'parcel' ? (
                                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                            {request.title || 'Untitled'}
                                        </Typography>
                                    ) : (
                                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                            {request.driverFirstName || 'Untitled'}
                                        </Typography>
                                    )}
                                </>
                            }
                            secondary={
                                <>
                                    {currentFilter === 'parcel' ? (
                                        <>
                                            <Typography sx={{display: 'block'}} component="span" variant="body2"
                                                        color="text.primary">
                                                From: {request.pickupAddress}
                                            </Typography>
                                            <Typography sx={{display: 'block'}} component="span" variant="body2"
                                                        color="text.primary">
                                                To: {request.deliveryAddress}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Pickup
                                                Date: {request.pickupDate ? new Date(request.pickupDate).toLocaleDateString() : 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Delivery
                                                Date: {request.deliveryDate ? new Date(request.deliveryDate).toLocaleDateString() : 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Size: {request.size || 'N/A'} cm | Price: {request.price || 'N/A'} €
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Typography sx={{display: 'block'}} component="span" variant="body2"
                                                        color="text.primary">
                                                From: {request.departureAddress}
                                            </Typography>
                                            <Typography sx={{display: 'block'}} component="span" variant="body2"
                                                        color="text.primary">
                                                To: {request.destinationAddress}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Departure Date: {new Date(request.departureDate).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Arrival Date: {new Date(request.destinationDate).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    )}
                                </>
                            }
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => onSelectRequest(request.idParcel || request.idTrip)}
                            sx={{marginLeft: 1}}
                        >
                            Details
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RequestsList;
