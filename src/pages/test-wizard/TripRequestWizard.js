// TripRequestWizard.js
import React from 'react';
import WizardForm from './WizardForm';
import TripStep1 from './TripStep1';
import TripStep2 from './TripStep2';
import TripStep3 from './TripStep3';
import axios from '../../axiosConfig';

const TripRequestWizard = () => {
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
    };

    const handleSubmit = async (data) => {
        try {
            const response = await axios.post('/trip-requests/create', data);
            console.log('Trip Request Submitted:', response.data);
        } catch (error) {
            console.error('Failed to submit trip request:', error);
        }
    };

    return (
        <WizardForm
            steps={[TripStep1, TripStep2, TripStep3]}
            initialData={initialData}
            onSubmit={handleSubmit}
        />
    );
};

export default TripRequestWizard;
