import React, {useState} from "react";
import {Alert, Avatar, Box, Button, Grid, Snackbar, TextField} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "../../../axiosConfig";

const EditProfileForm = ({initialProfile, onProfileUpdated}) => {
    const [profile, setProfile] = useState(initialProfile);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Для управления состоянием Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleInputChange = (field, value) => {
        setProfile({...profile, [field]: value});
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedPhoto(file);
            setProfile((prevProfile) => ({
                ...prevProfile,
                userPhoto: URL.createObjectURL(file),
            }));
        }
    };

    // Отправка данных на сервер
    const handleSave = async (event) => {
        event.preventDefault();
        setIsSaving(true);

        const formData = new FormData();
        formData.append("firstName", profile.firstName);
        formData.append("lastName", profile.lastName);
        if (selectedPhoto) {
            formData.append("userPhoto", selectedPhoto);
        }

        try {
            const response = await axios.put("/v1/profile", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            setSnackbarMessage("Profile updated successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            // Обновление данных после успешного обновления
            onProfileUpdated(response.data);
        } catch (error) {
            setSnackbarMessage("Error updating profile. Please try again.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);

            console.error("Error updating profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Обработчик закрытия Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSave} style={{marginTop: "20px"}}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{width: "100%"}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            src={profile.userPhoto || "/default-avatar.png"}
                            alt="User Avatar"
                            sx={{
                                width: 120,
                                height: 120,
                                mb: 2,
                                border: "2px solid #ddd",
                            }}
                        />
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadIcon/>}
                            sx={{mb: 2}}
                        >
                            Upload Photo
                            <input type="file" hidden onChange={handlePhotoUpload}/>
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        value={profile.firstName || ""}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={profile.lastName || ""}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
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
        </form>
    );
};

export default EditProfileForm;
