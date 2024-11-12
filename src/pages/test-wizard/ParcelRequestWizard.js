// ParcelRequestWizard.js
import React, {useState} from 'react';
import WizardForm from './WizardForm';
import ParcelStep1 from './ParcelStep1';
import ParcelStep2 from './ParcelStep2';
import ParcelStep3 from './ParcelStep3';
import axios from '../../axiosConfig';
import {Alert, Snackbar} from "@mui/material";

const ParcelRequestWizard = ({onClose, onRefreshData}) => {

    const [notification, setNotification] = useState({open: false, message: '', severity: 'success'});

    const initialData = {
        requestType: 'Parcel',
        description: '',
        declaration: false,
        weight: 0,
        size: '',
        price: 0,
        pickupDate: '',
        deliveryDate: '',
        pickupLatitude: 0,
        pickupLongitude: 0,
        pickupAddress: '',
        deliveryLatitude: 0,
        deliveryLongitude: 0,
        deliveryAddress: '',
        volume: 0,
        height: 0,
        width: 0,
        length: 0,
        suggestedPrice: 0,
        images: [] // добавляем поле для изображений
    };

    const handleSubmit = async (data) => {
        try {
            const formData = new FormData();
            const jsonData = {
                ...data,
                images: undefined
            };
            formData.append('parcelRequest', new Blob([JSON.stringify(jsonData)], {type: 'application/json'}));

            // Добавляем файлы
            if (data.images.length > 0) {
                data.images.forEach((file) => {
                    formData.append('files', file);
                });
            }

            // Выводим содержимое FormData для проверки
            formData.forEach((value, key) => {
                console.log(key, value);
            });

            // Отправка на сервер
            const response = await axios.post('/parcel-requests/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setNotification({
                    open: true,
                    message: response.data.message || 'Запрос успешно создан!',
                    severity: 'success'
                });
                onRefreshData();
                setTimeout(() => {
                    setNotification({open: false});
                    onClose();
                }, 2000);
            }
            console.log('Parcel Request Submitted:', response.data);
        } catch (error) {
            setNotification({
                open: true,
                message: error.response?.data.message || 'Не удалось создать запрос',
                severity: 'error'
            });
            console.error('Failed to submit parcel request:', error);
        }
    };


    return (
        <>
            <WizardForm steps={[ParcelStep1, ParcelStep2, ParcelStep3]} initialData={initialData}
                        onSubmit={handleSubmit}/>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({open: false})}>
                <Alert onClose={() => setNotification({open: false})} severity={notification.severity}
                       sx={{width: '100%'}}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ParcelRequestWizard;