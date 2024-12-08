import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import axios from '../../axiosConfig';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            setIsLoading(true);
            try {
                await axios.get(`/auth/validate-token?token=${token}`);
                setIsValidToken(true);
            } catch (error) {
                setMessage('Invalid or expired token. Please request a new reset link.');
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            validateToken();
        } else {
            setMessage('No token provided.');
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            await axios.post('/auth/reset-password', {
                token,
                newPassword,
            });
            setMessage('Password has been reset successfully.');
            setSuccess(true); // Устанавливаем флаг успешного выполнения
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Failed to reset password.';
            setMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Container maxWidth="sm" sx={{mt: 8, textAlign: 'center'}}>
                <CircularProgress/>
                <Typography variant="h6" component="p" sx={{mt: 2}}>
                    Validating token...
                </Typography>
            </Container>
        );
    }

    if (!isValidToken) {
        return (
            <Container maxWidth="sm" sx={{mt: 8, textAlign: 'center'}}>
                <Typography variant="h6" component="p" color="red">
                    {message}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login', {state: {openForgotPassword: true}})}
                    sx={{mt: 2}}
                >
                    Request New Link
                </Button>
            </Container>
        );
    }

    if (success) {
        return (
            <Container maxWidth="sm" sx={{mt: 8, textAlign: 'center'}}>
                <Typography variant="h5" component="p" color="green">
                    Password has been reset successfully!
                </Typography>
                <Typography variant="body1" sx={{mt: 2}}>
                    You can now log in with your new password.
                </Typography>
                <button
                    className="navbar8-action11 thq-button-filled thq-button-animated"
                    variant="contained"

                    onClick={() => navigate('/login')}
                    sx={{mt: 4}}
                >
                    Go to Login
                </button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{mt: 8}}>
            <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Reset Password
                </Typography>

                <TextField
                    required
                    id="newPassword"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    fullWidth
                    autoComplete="off"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                    required
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    fullWidth
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {message && (
                    <Typography color={message.includes('successfully') ? 'green' : 'red'}>
                        {message}
                    </Typography>
                )}

                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button
                        onClick={() => navigate('/login')}
                        disabled={isLoading}
                        color="secondary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24}/> : 'Reset Password'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ResetPassword;
