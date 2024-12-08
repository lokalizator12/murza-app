import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "../../axiosConfig";

function ForgotPassword({open, handleClose}) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/auth/forgot-password', {email});
            setMessage('If the email exists, a reset link has been sent.');
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            setMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Reset password</DialogTitle>
            <DialogContent
                sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}
            >
                <DialogContentText>
                    Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                />
                {message && (
                    <DialogContentText sx={{color: 'green'}}>{message}</DialogContentText>
                )}
            </DialogContent>
            <DialogActions sx={{pb: 3, px: 3}}>
                <Button onClick={handleClose} disabled={isLoading}>Cancel</Button>
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24}/> : 'Continue'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ForgotPassword.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
