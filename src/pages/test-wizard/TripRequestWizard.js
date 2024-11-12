// TripRequestWizard.js
import React, {useState} from 'react';
import WizardForm from './WizardForm';
import TripStep1 from './TripStep1';
import TripStep2 from './TripStep2';
import TripStep3 from './TripStep3';
import axios from '../../axiosConfig';
import {Alert, Snackbar} from "@mui/material";

const TripRequestWizard = ({onClose, onRefreshData}) => {
    const [notification, setNotification] = useState({open: false, message: '', severity: 'success'});
    const initialData = {
        requestType: 'Trip',
        departureLatitude: 0,
        departureLongitude: 0,
        departureAddress: '',
        destinationLatitude: 0,
        destinationLongitude: 0,
        destinationAddress: '',
        maxWeight: 0,
        maxVolume: 0,
        departureDate: '',
        destinationDate: '',
        acceptedItemsId: [],
        declinedItemsId: [],
        description: '',
        shippingMethodId: null,
        intermediateLocations: [],
        maxHeight: 0,
        maxWidth: 0,
        maxLength: 0,
        title: '',
    };

    const handleSubmit = async (data) => {
        try {
            const response = await axios.post('/trip-requests/create', data);

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
            console.log('Trip Request Submitted:', response.data);
        } catch (error) {

            setNotification({
                open: true,
                message: error.response?.data.message || 'Не удалось создать запрос',
                severity: 'error'
            });
            console.error('Failed to submit trip request:', error);
        }
    };

    return (
        <>
            <WizardForm
                steps={[TripStep1, TripStep2, TripStep3]}
                initialData={initialData}
                onSubmit={handleSubmit}
            />
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={() => setNotification({open: false})}>
                <Alert onClose={() => setNotification({open: false})} severity={notification.severity}
                       sx={{width: '100%'}}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};
export default TripRequestWizard;
