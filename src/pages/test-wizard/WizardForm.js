// WizardForm.js
import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Paper } from '@mui/material';

const WizardForm = ({ steps, initialData, onSubmit }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialData || {});

    // Функция для перехода к следующему шагу
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    // Функция для возврата к предыдущему шагу
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    // Унифицированная функция для обновления состояния
    const handleChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Завершение формы
    const handleSubmit = () => {
        onSubmit(formData);
    };

    // Контент для каждого шага
    const renderStepContent = (stepIndex) => {
        const StepComponent = steps[stepIndex];
        return <StepComponent formData={formData} handleChange={handleChange} />;
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: '800px', margin: '40px auto', borderRadius: '16px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                Request a {initialData.requestType === 'Parcel' ? 'Parcel' : 'Trip'}
            </Typography>

            {/* Stepper для отображения прогресса */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((_, index) => (
                    <Step key={index}>
                        <StepLabel>{`Step ${index + 1}`}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Контент текущего шага */}
            {renderStepContent(activeStep)}

            {/* Кнопки навигации */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </Box>
        </Paper>
    );
};

export default WizardForm;
