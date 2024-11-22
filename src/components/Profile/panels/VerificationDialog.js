/*
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import Countdown from 'react-countdown';

const VerificationDialog = ({
                                open,
                                type,
                                code,
                                setCode,
                                attemptsLeft,
                                blockedStatus,
                                codeExpirationTime,
                                canResendCode,
                                loading,
                                handleClose,
                                handleVerifyCode,
                                handleResendCode,
                            }) => {
    const renderer = ({minutes, seconds, completed}) => {
        if (completed) {
            return <span>Время истекло.</span>;
        } else {
            return (
                <span>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
            );
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Введите код верификации</DialogTitle>
            <DialogContent>
                {blockedStatus[type]?.isBlocked ? (
                    <Typography variant="body1">
                        Вы заблокированы до{' '}
                        {blockedStatus[type].blockUntil.toLocaleTimeString()}
                    </Typography>
                ) : (
                    <>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Код верификации"
                            type="text"
                            fullWidth
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            error={attemptsLeft <= 0}
                            helperText={`Осталось попыток: ${attemptsLeft}`}
                        />
                        {codeExpirationTime && (
                            <Typography variant="body2" color="textSecondary">
                                Код истекает через:{' '}
                                <Countdown date={codeExpirationTime} renderer={renderer}/>
                            </Typography>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Отмена
                </Button>
                {!blockedStatus[type]?.isBlocked && (
                    <Button
                        onClick={handleVerifyCode}
                        disabled={loading || attemptsLeft <= 0}
                    >
                        {loading ? <CircularProgress size={24}/> : 'Верифицировать'}
                    </Button>
                )}
            </DialogActions>
            {!blockedStatus[type]?.isBlocked && (
                <DialogActions>
                    <Button onClick={handleResendCode} disabled={!canResendCode || loading}>
                        Отправить код снова
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default VerificationDialog;
*/
