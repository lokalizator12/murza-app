// App2.js
import React, { useState } from 'react';
import ParcelRequestWizard from './ParcelRequestWizard';
import TripRequestWizard from './TripRequestWizard';
import { Box, Typography, Button, Paper } from '@mui/material';

const App2 = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Функция для сброса выбора
    const handleBackToSelection = () => {
        setSelectedOption(null);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f4f0' }}>
            <Paper sx={{ padding: 4, maxWidth: '600px', width: '100%', textAlign: 'center', borderRadius: '16px' }}>
                {!selectedOption ? (
                    // Экран выбора типа заявки
                    <>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                            Выберите тип заявки
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button variant="outlined" onClick={() => setSelectedOption('Parcel')}>
                                Заявка на посылку
                            </Button>
                            <Button variant="outlined" onClick={() => setSelectedOption('Trip')}>
                                Заявка на поездку
                            </Button>
                        </Box>
                    </>
                ) : (
                    // Форма заявки
                    <>

                        {selectedOption === 'Parcel' ? (
                            <ParcelRequestWizard />
                        ) : (
                            <TripRequestWizard />
                        )}
                        <Box sx={{ mt: 4 }}>
                            <Button variant="text" onClick={handleBackToSelection}>
                                Назад к выбору типа заявки
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default App2;
