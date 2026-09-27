import React, {useCallback, useState} from 'react';
import {Box, Button, Paper, Step, StepLabel, Stepper, Typography} from '@mui/material';

const WizardForm = ({steps, initialData, onSubmit}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialData || {});
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const isParcel = initialData.requestType === 'Parcel';
    const stepLabels = isParcel
        ? ['Route', 'Parcel details', 'Dates & price']
        : ['Route', 'Space & items', 'Dates & notes'];

    const handleNext = () => {
        if (isNextEnabled) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleChange = useCallback((name, value) => {
        setFormData((prevData) => prevData[name] === value ? prevData : {...prevData, [name]: value});
    }, []);

    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const successful = await onSubmit(formData);
            if (successful === false) setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };

    const renderStepContent = (stepIndex) => {
        const StepComponent = steps[stepIndex];
        return (
            <StepComponent
                formData={formData}
                handleChange={handleChange}
                setIsNextEnabled={setIsNextEnabled}
            />
        );
    };

    return (
        <Paper sx={{padding: {xs: 2, sm: 3}, maxWidth: '800px', margin: '0 auto', borderRadius: '16px', boxShadow: 'none'}}>
            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 1, textAlign: 'center'}}>
                Post a {isParcel ? 'parcel' : 'trip'}
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{mb: 4}}>
                {steps.map((_, index) => (
                    <Step key={index}>
                        <StepLabel>{stepLabels[index] || `Step ${index + 1}`}</StepLabel>
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
                    disabled={!isNextEnabled || submitting}
                >
                    {activeStep === steps.length - 1 ? (submitting ? 'Posting…' : `Post ${isParcel ? 'parcel' : 'trip'}`) : 'Next'}
                </Button>
            </Box>
        </Paper>
    );
};

export default WizardForm;
