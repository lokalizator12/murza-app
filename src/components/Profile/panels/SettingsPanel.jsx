import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Grid, Snackbar, TextField, Tooltip, Typography} from "@mui/material";
import axios from "../../../axiosConfig";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const SettingsPanel = ({onSettingsUpdated}) => {
    const [settings, setSettings] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({open: false, message: "", severity: "success"});
    const [fieldErrors, setFieldErrors] = useState({}); // Field-specific errors
    const [currentType, setCurrentType] = useState(""); // 'email' or 'phone'
    const [code, setCode] = useState("");
    const [verificationOpen, setVerificationOpen] = useState(false);
    const [verificationDialog, setVerificationDialog] = useState({open: false, type: "", code: ""});

    const handleVerification = async (type) => {
        try {
            const response = await axios.post(`/v1/verification/send?type=${type}`);
            setSnackbar({
                open: true,
                message: `Verification code sent to your ${type}.`,
                severity: "success",
            });
            setCurrentType(type);
            setVerificationOpen(true);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Error sending verification code. Please try again.",
                severity: "error",
            });
        }
    };

    const verifyCode = async (type, enteredCode) => {
        try {
            const response = await axios.post(
                `/v1/verification/verify?type=${type}&code=${enteredCode}`
            );
            setSnackbar({
                open: true,
                message: `${type === "email" ? "Email" : "Phone"} verified successfully!`,
                severity: "success",
            });
            setSettings((prevSettings) => ({
                ...prevSettings,
                verificationStatus: true,
            }));
            setVerificationOpen(false);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Verification failed. Please try again.",
                severity: "error",
            });
        }
    };


    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get("/v1/user/settings");
                setSettings(response.data);
            } catch (error) {
                setSnackbar({open: true, message: "Error loading settings.", severity: "error"});
            }
        };
        fetchSettings();
    }, []);

    const handleInputChange = (field, value) => {
        setSettings((prevSettings) => ({...prevSettings, [field]: value}));
    };

    const handleSaveSettings = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setFieldErrors({}); // Clear previous errors

        if (!currentPassword) {
            setSnackbar({
                open: true,
                message: "Current password is required for any changes.",
                severity: "error",
            });
            setIsSaving(false);
            return;
        }

        try {
            const response = await axios.put("/v1/user/settings/update-credentials", {
                ...settings,
                currentPassword,
                newPassword: newPassword || null, // Send null if no new password
            });

            setSnackbar({open: true, message: "Settings updated successfully!", severity: "success"});
            onSettingsUpdated(response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const backendErrors = error.response.data.errors;
                const errorsMap = {};

                backendErrors.forEach((err) => {
                    errorsMap[err.field] = err.message;
                });

                setFieldErrors(errorsMap); // Set field-specific errors
            } else {
                setSnackbar({
                    open: true,
                    message: "An unexpected error occurred. Please try again.",
                    severity: "error",
                });
            }
        } finally {
            setIsSaving(false);
        }
    };
    const handleCloseDialog = () => {
        setVerificationOpen(false);
        setCode("");
    };

    const handleVerificationSubmit = async () => {
        try {
            const {type, code} = verificationDialog;
            await axios.post(`/v1/verification/verify?type=${type}&code=${code}`);
            setSnackbar({open: true, message: `${type} verified successfully!`, severity: "success"});
            setSettings((prev) => ({
                ...prev,
                [`${type}Verified`]: true,
            }));
            setVerificationDialog({open: false, type: "", code: ""});
        } catch (error) {
            setSnackbar({open: true, message: "Verification failed. Please try again.", severity: "error"});
        }
    };
    const handleVerificationRequest = async (type) => {
        try {
            const response = await axios.post(`/v1/verification/send?type=${type}`);
            setSnackbar({open: true, message: `Verification code sent to your ${type}.`, severity: "success"});
            setVerificationDialog({open: true, type, code: ""});
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response.data || "Error sending verification code.",
                severity: "error"
            });
        }
    };
    const handleCloseSnackbar = () => {
        setSnackbar({open: false, message: "", severity: ""});
    };

    if (!settings) {
        return <Typography>Loading settings...</Typography>;
    }

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
                        helperText={settings.emailVerified ? "Email is verified and cannot be changed." : ""}
                    />
                    <Tooltip title={settings.emailVerified ? "Email is already verified" : ""}>
                        <Button
                            variant="contained"
                            color={settings.emailVerified ? "success" : "primary"}
                            disabled={settings.emailVerified}
                            onClick={() => handleVerificationRequest("email")}
                            sx={{mt: 1}}
                        >
                            {settings.emailVerified ? "Verified" : "Verify Email"}
                        </Button>
                    </Tooltip>
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        type="text"
                        value={settings.phoneNumber}
                        disabled={settings.phoneVerified}
                        helperText={settings.phoneVerified ? "Phone number is verified and cannot be changed." : ""}
                    />
                    <Tooltip title={settings.phoneVerified ? "Phone number is already verified" : ""}>
                        <Button
                            variant="contained"
                            color={settings.phoneVerified ? "success" : "primary"}
                            disabled={settings.phoneVerified}
                            onClick={() => handleVerificationRequest("phone")}
                            sx={{mt: 1}}
                        >
                            {settings.phoneVerified ? "Verified" : "Verify Phone"}
                        </Button>
                    </Tooltip>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Current Password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            error={!!fieldErrors.currentPassword}
                            helperText={fieldErrors.currentPassword || "Required to save any changes."}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="New Password (Optional)"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={!!fieldErrors.newPassword}
                            helperText={
                                fieldErrors.newPassword ||
                                "Leave blank if you don't want to change your password."
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={verificationDialog.open}
                    onClose={() => setVerificationDialog({open: false, type: "", code: ""})}>
                <DialogTitle>Enter Verification Code</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Verification Code"
                        type="text"
                        fullWidth
                        value={verificationDialog.code}
                        onChange={(e) => setVerificationDialog({...verificationDialog, code: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVerificationDialog({open: false, type: "", code: ""})}>Cancel</Button>
                    <Button onClick={handleVerificationSubmit}>Verify</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SettingsPanel;
