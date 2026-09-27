import React from 'react';
import {Helmet} from 'react-helmet';
import {Box, Button, Container, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="xs" sx={{mt: 8}}>
            <Helmet>
                <title>Registration Successful</title>
            </Helmet>
            <Typography variant="h4" component="h1" align="center" sx={{mb: 4}}>
                Registration Successful
            </Typography>
            <Typography variant="body1" align="center" sx={{mb: 2}}>
                Thank you for registering! Your account has been created successfully.
            </Typography>
            <Typography variant="body1" align="center" sx={{mb: 4}}>
                You can now log in to your account.
            </Typography>

            <Box sx={{mb: 4}}>
                <Typography variant="body2" align="center">
                    An activation link has been sent to your email address. Please check your inbox and click the link
                    to activate your account.
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRedirect}
            >
                Go to log in
            </Button>
        </Container>
    );
};

export default Success;
