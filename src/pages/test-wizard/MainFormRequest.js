// App2.js
import React, {useState} from 'react';
import ParcelRequestWizard from './ParcelRequestWizard';
import TripRequestWizard from './TripRequestWizard';
import {Box, Button, Paper, Typography} from '@mui/material';

const RequestForm = ({onClose, onRefreshData}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Функция для сброса выбора
    const handleBackToSelection = () => {
        setSelectedOption(null);
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Paper sx={{padding: 4, maxWidth: '600px', width: '100%', textAlign: 'center', borderRadius: '16px'}}>
                {!selectedOption ? (
                    <>
                        <Typography variant="h4" sx={{fontWeight: 'bold', mb: 3}}>
                            Choose the type of request
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                            <Button variant="outlined" onClick={() => setSelectedOption('Parcel')}>
                                Request a parcel
                            </Button>
                            <Button variant="outlined" onClick={() => setSelectedOption('Trip')}>
                                Request a trip
                            </Button>
                        </Box>
                        <Box sx={{mt: 4}}>
                            <Button variant="text" onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        {selectedOption === 'Parcel' ? (
                            <ParcelRequestWizard onClose={onClose} onRefreshData={onRefreshData}/>
                        ) : (
                            <TripRequestWizard onClose={onClose} onRefreshData={onRefreshData}/>
                        )}
                        <Button variant="text" onClick={handleBackToSelection}>
                            Return to type of request
                        </Button>
                        <Button variant="outlined" onClick={onClose} sx={{ml: 2}}>
                            Cancel
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default RequestForm;