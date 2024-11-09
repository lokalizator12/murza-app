// RequestsList.js
import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';

const RequestsList = ({ requests, currentFilter, onSelectRequest }) => {
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
                Список Запросов
            </Typography>
            <Divider />
            <List>
                {requests.map(request => (
                    <ListItem key={request.idParcel || request.idTrip} alignItems="flex-start" sx={{ padding: 1, borderBottom: '1px solid #eee' }}>
                        <ListItemAvatar>
                            <Avatar
                                variant="rounded"
                                src={request.previewPhoto || ''}
                                alt="preview"
                                sx={{ width: 64, height: 64, marginRight: 2 }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {request.title || 'Без названия'}
                                </Typography>
                            }
                            secondary={
                                <>
                                    {currentFilter === 'parcel' ? (
                                        <>
                                            <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                                                Откуда: {request.pickupAddress}
                                            </Typography>
                                            <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                                                Куда: {request.deliveryAddress}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Дата отправки: {request.pickupDate ? new Date(request.pickupDate).toLocaleDateString() : 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Дата прибытия: {request.deliveryDate ? new Date(request.deliveryDate).toLocaleDateString() : 'N/A'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Размер: {request.size || 'N/A'} см | Цена: {request.price || 'N/A'} €
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                                                Откуда: {request.departureAddress}
                                            </Typography>
                                            <Typography sx={{ display: 'block' }} component="span" variant="body2" color="text.primary">
                                                Куда: {request.destinationAddress}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Дата отправления: {new Date(request.departureDate).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Дата прибытия: {new Date(request.destinationDate).toLocaleDateString()}
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
                            sx={{ marginLeft: 1 }}
                        >
                            Подробнее
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RequestsList;
