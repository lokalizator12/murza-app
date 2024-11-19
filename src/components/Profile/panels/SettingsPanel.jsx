import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Snackbar, Alert, Typography, Grid } from "@mui/material";
import axios from "../../../axiosConfig";

const SettingsPanel = ({ onSettingsUpdated }) => {
    const [settings, setSettings] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [fieldErrors, setFieldErrors] = useState({}); // Field-specific errors

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get("/v1/user/settings");
                setSettings(response.data);
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "Error loading settings. Please try again.",
                    severity: "error",
                });
            }
        };

        fetchSettings();
    }, []);

    const handleInputChange = (field, value) => {
        setSettings((prevSettings) => ({ ...prevSettings, [field]: value }));
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

            setSnackbar({ open: true, message: "Settings updated successfully!", severity: "success" });
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

    const handleCloseSnackbar = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };

    if (!settings) {
        return <Typography>Loading settings...</Typography>;
    }

    return (
        <Box component="form" onSubmit={handleSaveSettings} sx={{ mt: 4 }} autoComplete="off">
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
                        value={settings.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        type="text"
                        value={settings.phoneNumber || ""}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        error={!!fieldErrors.phoneNumber}
                        helperText={fieldErrors.phoneNumber}
                    />
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
        </Box>
    );
};

export default SettingsPanel;
