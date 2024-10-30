import React, {useState} from 'react';
import CreateRouteForm from '../pages/Main-Form/CreateRouteForm'
import ParcelRequestPageTwo from './ParcelRequestPageTwo';
import ParcelRequestPageThree from './ParcelRequestPageThree';

const ParcelRequestWizard = () => {
    const [currentStep, setCurrentStep] = useState(1); // Управление текущим шагом
    const [formData, setFormData] = useState({
        selectedOption: '',
        fromLocation: '',
        toLocation: '',
        fromCoords: null,
        toCoords: null,
        shippingMethod: '',
        declaration: false,
        weight: '',
        volume: '',
        height: '',
        width: '',
        length: '',
        photos: [],
        description: '',
        pickupDate: '',
        deliveryDate: '',
        price: '',
        suggestedPrice: '',
    });

    const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
    const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
        // Здесь можно добавить логику отправки данных на сервер
    };

    return (
        <div className="wizard-container">
            {currentStep === 1 && (
                <CreateRouteForm
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                />
            )}
            {currentStep === 2 && (
                <ParcelRequestPageTwo
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            )}
            {currentStep === 3 && (
                <ParcelRequestPageThree
                    formData={formData}
                    setFormData={setFormData}
                    prevStep={prevStep}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};
export default ParcelRequestWizard;
