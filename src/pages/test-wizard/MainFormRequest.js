// App2.js
import React, {useState} from 'react';
import ParcelRequestWizard from './ParcelRequestWizard';
import TripRequestWizard from './TripRequestWizard';
import {Box, Button, Paper, Typography} from '@mui/material';

const RequestForm = ({onClose, onRefreshData, initialType = null}) => {
    const [selectedOption, setSelectedOption] = useState(
        initialType === 'parcel' ? 'Parcel' : initialType === 'trip' ? 'Trip' : null
    );

    // Функция для сброса выбора
    const handleBackToSelection = () => {
        setSelectedOption(null);
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Paper sx={{padding: selectedOption ? 1 : 4, maxWidth: '820px', width: '100%', textAlign: 'center', borderRadius: '16px', boxShadow: 'none'}}>
                {!selectedOption ? (
                    <>
                        <Typography variant="h4" sx={{fontWeight: 'bold', mb: 3}}>
                            What would you like to post?
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                            <Button variant="outlined" onClick={() => setSelectedOption('Parcel')}>
                                Post a parcel
                            </Button>
                            <Button variant="outlined" onClick={() => setSelectedOption('Trip')}>
                                Post a trip
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
                            Choose another type
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
