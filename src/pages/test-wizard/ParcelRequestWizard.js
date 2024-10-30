// ParcelRequestWizard.js
import React from 'react';
import WizardForm from './WizardForm';
import ParcelStep1 from './ParcelStep1';
import ParcelStep2 from './ParcelStep2';
import ParcelStep3 from './ParcelStep3';
import axios from '../../axiosConfig';

const ParcelRequestWizard = () => {
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
        suggestedPrice: 0
    };


    const handleSubmit = async (data) => {
        try {
            const response = await axios.post('/parcel-requests/create', data);
            console.log('Parcel Request Submitted:', response.data);
        } catch (error) {
            console.error('Failed to submit parcel request:', error);
        }
    };

    return (
        <WizardForm
            steps={[ParcelStep1, ParcelStep2, ParcelStep3]}
            initialData={initialData}
            onSubmit={handleSubmit}
        />
    );
};

export default ParcelRequestWizard;
