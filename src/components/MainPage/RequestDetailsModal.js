// RequestDetailsModal.js
import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import ReadOnlyImageCarousel from '../ReadOnlyImageCarousel';
import RouteMap from '../RouteMap';

const RequestDetailsModal = ({open, onClose, request, requestType}) => {
    const isParcel = requestType === 'parcel';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Детали Запроса</DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    {request.title || 'Без названия'}
                </Typography>
                {isParcel && request.photos && request.photos.length > 0 && (
                    <ReadOnlyImageCarousel images={request.photos}/>
                )}
                <Typography>Описание: {request.description}</Typography>
                <Typography>Цена: {request.price ? `${request.price} €` : 'N/A'}</Typography>
                <Typography>Объем: {request.volume ? `${request.volume} м³` : 'N/A'}</Typography>
                <Typography>Вес: {request.weight ? `${request.weight} кг` : 'N/A'}</Typography>

                {/* Show different details based on request type */}
                {isParcel ? (
                    <>
                        <Typography>Адрес отправки: {request.pickupAddress}</Typography>
                        <Typography>Адрес доставки: {request.deliveryAddress}</Typography>
                        <Typography>Дата
                            отправки: {request.pickupDate ? new Date(request.pickupDate).toLocaleDateString() : 'N/A'}</Typography>
                        <Typography>Дата
                            доставки: {request.deliveryDate ? new Date(request.deliveryDate).toLocaleDateString() : 'N/A'}</Typography>
                        <RouteMap
                            pickupCoordinates={[request.pickupLongitude, request.pickupLatitude]}
                            destinationCoordinates={[request.deliveryLongitude, request.deliveryLatitude]}
                        />
                    </>
                ) : (
                    <>
                        <Typography>Адрес отправления: {request.departureAddress}</Typography>
                        <Typography>Адрес назначения: {request.destinationAddress}</Typography>
                        <Typography>Дата
                            отправления: {new Date(request.departureDate).toLocaleDateString()}</Typography>
                        <Typography>Дата прибытия: {new Date(request.destinationDate).toLocaleDateString()}</Typography>
                        <RouteMap
                            pickupCoordinates={[request.departureLongitude, request.departureLatitude]}
                            destinationCoordinates={[request.destinationLongitude, request.destinationLatitude]}
                        />
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary">Связаться</Button>
                <Button variant="contained" color="secondary">Показать профиль</Button>
                <Button variant="outlined" color="info">Показать на карте маршрут</Button>
                <Button onClick={onClose} color="inherit">Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RequestDetailsModal;
