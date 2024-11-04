import React, {useState} from 'react';
import {Box, Button, Paper, Step, StepLabel, Stepper, Typography} from '@mui/material';

const WizardForm = ({steps, initialData, onSubmit}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialData || {});
    const [isNextEnabled, setIsNextEnabled] = useState(false); // Контролирует доступность кнопки "Next"

    const handleNext = () => {
        if (isNextEnabled) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleChange = (name, value) => {
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const renderStepContent = (stepIndex) => {
        const StepComponent = steps[stepIndex];
        return (
            <StepComponent
                formData={formData}
                handleChange={handleChange}
                setIsNextEnabled={setIsNextEnabled} // Передаем управление доступностью кнопки "Next"
            />
        );
    };

    return (
        <Paper sx={{padding: 4, maxWidth: '800px', margin: '40px auto', borderRadius: '16px'}}>
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 1, textAlign: 'center'}}>
                Request a {initialData.requestType === 'Parcel' ? 'Parcel' : 'Trip'}
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{mb: 4}}>
                {steps.map((_, index) => (
                    <Step key={index}>
                        <StepLabel>{`Step ${index + 1}`}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    disabled={!isNextEnabled} // Блокируем кнопку "Next", если не включена
                >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </Box>
        </Paper>
    );
};

export default WizardForm;
