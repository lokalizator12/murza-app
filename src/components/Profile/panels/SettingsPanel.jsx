import React, {useEffect, useRef, useState} from "react";
import {Alert, Box, Button, CircularProgress, Grid, Snackbar, TextField, Tooltip, Typography,} from "@mui/material";
import axios from "../../../axiosConfig";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ReCAPTCHA from "react-google-recaptcha";
import Countdown from "react-countdown";

const SettingsPanel = ({onSettingsUpdated}) => {
    const [settings, setSettings] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [originalPhoneNumber, setOriginalPhoneNumber] = useState('');
    const isCodeValid = (code) => /^\d{6}$/.test(code);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [verificationDialog, setVerificationDialog] = useState({
        open: false,
        type: "",
        code: "",
    });

    const [originalSettings, setOriginalSettings] = useState(null);
    const [error, setError] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [codeExpirationTime, setCodeExpirationTime] = useState(null);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [canResendCode, setCanResendCode] = useState(false);
    const [blockedStatus, setBlockedStatus] = useState({
        email: {isBlocked: false, blockUntil: null},
        phone: {isBlocked: false, blockUntil: null},
    });

    const recaptchaRef = useRef(null);

    const handleVerification = async (type) => {
        if (blockedStatus[type].isBlocked) {
            setVerificationDialog({open: true, type, code: ""});
            setSnackbar({
                open: true,
                message: `You are blocked until ${blockedStatus[type].blockUntil.toLocaleTimeString()}`,
                severity: "error",
            });
            return;
        }
        setLoading(true);
        setCanResendCode(false);
        try {
            console.log("Starting verification for type:", type);

            if (recaptchaRef.current) {
                const captchaResponse = await recaptchaRef.current.executeAsync();
                console.log("Received captcha response:", captchaResponse);
                recaptchaRef.current.reset();

                const response = await axios.post(
                    `/v1/verification/send?type=${type}&captchaResponse=${captchaResponse}`
                );
                console.log("Verification code sent successfully:", response.data);

                setSnackbar({
                    open: true,
                    message: `Verification code sent to your ${type}.`,
                    severity: "success",
                });
                setVerificationDialog({open: true, type, code: ""});
                setIsCodeSent(true);
                setCodeExpirationTime(Date.now() + 2 * 60 * 1000);
            } else {
                console.error("recaptchaRef.current is null");
                setSnackbar({
                    open: true,
                    message: "ReCAPTCHA initialization error. Please refresh the page.",
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Error sending verification code:", error);

            let errorMessage = "Error sending verification code.";
            if (error.response) {
                const apiError = error.response.data;
                if (apiError && apiError.message) {
                    errorMessage = apiError.message;
                } else if (typeof apiError === "string") {
                    errorMessage = apiError;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async () => {
        setLoading(true);
        try {
            console.log("Verifying code:", verificationDialog.code);
            const {type, code} = verificationDialog;
            const response = await axios.post(
                `/v1/verification/verify?type=${type}&code=${code}`
            );
            console.log("Verification successful:", response.data);

            setSnackbar({
                open: true,
                message: `${
                    type === "email" ? "Email" : "Phone"
                } successfully verified!`,
                severity: "success",
            });
            setSettings((prevSettings) => ({
                ...prevSettings,
                [`${type}Verified`]: true,
            }));
            setVerificationDialog({open: false, type: "", code: ""});
            setAttemptsLeft(3);
        } catch (error) {
            console.error("Error verifying code:", error);

            let errorMessage = "Verification error. Please try again.";

            if (error.response) {
                const apiError = error.response.data;
                let errorData;

                if (apiError && apiError.data) {
                    errorData = apiError.data;
                } else {
                    errorData = apiError;
                }

                if (errorData) {
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                    if (errorData.errors && errorData.errors.length > 0) {
                        errorMessage = errorData.errors.map((err) => err.message).join(", ");
                    }
                    if (errorData.additionalData) {
                        if (errorData.additionalData.attemptsLeft !== undefined) {
                            setAttemptsLeft(errorData.additionalData.attemptsLeft);
                        }
                        if (errorData.additionalData.blockedUntil) {
                            const blockTime = new Date(errorData.additionalData.blockedUntil);
                            setBlockedStatus((prevStatus) => ({
                                ...prevStatus,
                                [verificationDialog.type]: {isBlocked: true, blockUntil: blockTime},
                            }));

                            const timeoutDuration = blockTime.getTime() - new Date().getTime();
                            setTimeout(() => {
                                setBlockedStatus((prevStatus) => ({
                                    ...prevStatus,
                                    [verificationDialog.type]: {isBlocked: false, blockUntil: null},
                                }));
                                setAttemptsLeft(3);
                            }, timeoutDuration);
                        }
                    }
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    const handleResendCode = () => {
        setCanResendCode(false);
        setCodeExpirationTime(Date.now() + 2 * 60 * 1000); // Update code expiration time
        handleVerification(verificationDialog.type);
    };
    const haveSettingsChanged = () => {
        return (
            settings.phoneNumber !== originalSettings.phoneNumber ||
            newPassword !== ''
        );
    };
    const validatePhoneNumber = (value) => {
        if (value.trim() === '') {
            return false;
        }
        const phoneRegex = /^\+\d{10,15}$/;
        return phoneRegex.test(value);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setSettings((prevSettings) => ({...prevSettings, phoneNumber: value}));

        if (!validatePhoneNumber(value)) {
            setError("Phone number must start with '+' and contain 10 to 15 digits.");
        } else {
            setError("");
        }
    };

    useEffect(() => {
        const fetchSettingsAndBlockStatus = async () => {
            try {
                const response = await axios.get("/v1/user/settings");
                setSettings(response.data);
                setOriginalSettings(response.data);
                setOriginalPhoneNumber(response.data.phoneNumber);
                const blockStatusResponse = await axios.get("/v1/verification/block-status");
                const blockData = blockStatusResponse.data;

                setBlockedStatus({
                    email: {
                        isBlocked: blockData.email.isBlocked,
                        blockUntil: blockData.email.blockedUntil ? new Date(blockData.email.blockedUntil) : null,
                    },
                    phone: {
                        isBlocked: blockData.phone.isBlocked,
                        blockUntil: blockData.phone.blockedUntil ? new Date(blockData.phone.blockedUntil) : null,
                    },
                });
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "Error loading settings.",
                    severity: "error",
                });
            }
        };
        fetchSettingsAndBlockStatus();
    }, []);


    const handleSaveSettings = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setFieldErrors({});

        if (!currentPassword) {
            setSnackbar({
                open: true,
                message: "Current password is required to save changes.",
                severity: "error",
            });
            setIsSaving(false);
            return;
        }

        try {
            const response = await axios.put("/v1/user/settings/update-credentials", {
                ...settings,
                currentPassword,
                newPassword: newPassword || null,
            });

            setSnackbar({
                open: true,
                message: "Settings successfully updated!",
                severity: "success",
            });
            onSettingsUpdated(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errorsMap = {};
                error.response.data.errors.forEach((err) => {
                    errorsMap[err.field] = err.message;
                });
                setFieldErrors(errorsMap);
            } else {
                setSnackbar({
                    open: true,
                    message: "An error occurred. Please try again.",
                    severity: "error",
                });
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({open: false, message: "", severity: ""});
    };

    const renderer = ({minutes, seconds, completed}) => {
        if (completed) {
            setCanResendCode(true);
            return <span>Time's up.</span>;
        } else {
            return (
                <span>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
            );
        }
    };

    if (!settings) {
        return <Typography>Loading settings...</Typography>;
    }
    const hasPhoneNumberChanged = settings.phoneNumber !== originalPhoneNumber;
    return (
        <Box component="form" onSubmit={handleSaveSettings} sx={{mt: 4}} autoComplete="off">
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Typography variant="h5" gutterBottom>
                Account Settings
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={settings.email}
                        disabled={settings.emailVerified}
                        helperText={
                            settings.emailVerified ? "Email is verified and cannot be changed." : ""
                        }
                    />
                    <Tooltip
                        title={
                            blockedStatus.email.isBlocked
                                ? `You are blocked until ${blockedStatus.email.blockUntil.toLocaleTimeString()}`
                                : settings.emailVerified
                                    ? "Email is already verified"
                                    : ""
                        }
                    >
    <span>
      <Button
          variant="contained"
          color={settings.emailVerified ? "success" : "primary"}
          disabled={
              settings.emailVerified ||
              loading ||
              blockedStatus.email.isBlocked
          }
          onClick={() => handleVerification("email")}
          sx={{mt: 1}}
      >
        {loading && verificationDialog.type === "email" ? (
            <CircularProgress size={24}/>
        ) : settings.emailVerified ? (
            "Verified"
        ) : (
            "Verify Email"
        )}
      </Button>
    </span>
                    </Tooltip>
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        type="text"
                        value={settings.phoneNumber}
                        onChange={handlePhoneNumberChange}
                        disabled={settings.phoneVerified}
                        error={!!error}
                        helperText={
                            error || (settings.phoneVerified ? "Phone is verified and cannot be changed." : "")
                        }
                    />
                    <Tooltip
                        title={
                            blockedStatus.phone.isBlocked
                                ? `You are blocked until ${blockedStatus.phone.blockUntil.toLocaleTimeString()}`
                                : settings.phoneVerified
                                    ? "Phone is already verified"
                                    : ""
                        }
                    >
    <span>
      <Button
          variant="contained"
          color={settings.phoneVerified ? "success" : "primary"}
          disabled={
              settings.phoneVerified ||
              loading ||
              blockedStatus.phone.isBlocked ||
              !!error ||
              !validatePhoneNumber(settings.phoneNumber)

          }
          onClick={() => handleVerification("phone")}
          sx={{mt: 1}}
      >
  {loading && verificationDialog.type === "phone" ? (
      <CircularProgress size={24}/>
  ) : settings.phoneVerified ? (
      "Verified"
  ) : (
      "Verify Phone"
  )}
</Button>
    </span>
                    </Tooltip>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        error={!!fieldErrors.currentPassword}
                        helperText={fieldErrors.currentPassword || "Required to save changes."}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="New Password (optional)"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={!!fieldErrors.newPassword}
                        helperText={
                            fieldErrors.newPassword || "Leave empty if you don't want to change the password."
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={
                            isSaving ||
                            !!error ||
                            loading ||
                            !currentPassword ||
                            !haveSettingsChanged()
                        }
                    >
                        {isSaving ? <CircularProgress size={24}/> : "Save Changes"}
                    </Button>
                </Grid>
            </Grid>

            {/* Verification Code Dialog */}
            <Dialog
                open={verificationDialog.open}
                onClose={() => setVerificationDialog({open: false, type: "", code: ""})}
            >
                <DialogTitle>Enter Verification Code</DialogTitle>
                <DialogContent>
                    {blockedStatus[verificationDialog.type]?.isBlocked ? (
                        <Typography variant="body1">
                            You are blocked
                            until {blockedStatus[verificationDialog.type].blockUntil.toLocaleTimeString()}
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Verification Code"
                                type="text"
                                fullWidth
                                value={verificationDialog.code}
                                onChange={(e) =>
                                    setVerificationDialog({...verificationDialog, code: e.target.value})
                                }
                                error={
                                    verificationDialog.code !== '' && !isCodeValid(verificationDialog.code)
                                }
                                helperText={
                                    verificationDialog.code !== '' && !isCodeValid(verificationDialog.code)
                                        ? 'Code must be 6 digits long.'
                                        : `Attempts remaining: ${attemptsLeft}`
                                }
                            />
                            {codeExpirationTime && (
                                <Typography variant="body2" color="textSecondary">
                                    Code expires in:{" "}
                                    <Countdown date={codeExpirationTime} renderer={renderer}/>
                                </Typography>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setVerificationDialog({open: false, type: "", code: ""})}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    {!blockedStatus[verificationDialog.type]?.isBlocked && (
                        <Button
                            onClick={verifyCode}
                            disabled={
                                loading ||
                                attemptsLeft <= 0 ||
                                !isCodeValid(verificationDialog.code)
                            }
                        >
                            {loading ? <CircularProgress size={24}/> : "Verify"}
                        </Button>
                    )}
                </DialogActions>
                {!blockedStatus[verificationDialog.type]?.isBlocked && (
                    <DialogActions>
                        <Button onClick={handleResendCode} disabled={!canResendCode || loading}>
                            Resend Code
                        </Button>
                    </DialogActions>
                )}
            </Dialog>

            {/* ReCAPTCHA Component */}
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                size="invisible"
                hl="en"
            />
        </Box>
    );
};

export default SettingsPanel;
