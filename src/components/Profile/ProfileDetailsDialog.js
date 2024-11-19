import React from "react";
import { Dialog, Box, Typography, Button, Grid, Divider, Stack } from "@mui/material";

const ProfileDetailsDialog = ({ open, onClose, selectedItem, type }) => {
    if (!selectedItem) return null;

    const isTrip = type === "trip";

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ padding: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    {isTrip ? "Trip Details" : "Parcel Details"}
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Общие поля */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            From:
                        </Typography>
                        <Typography>{selectedItem.origin}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            To:
                        </Typography>
                        <Typography>{selectedItem.destination}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Departure Date:
                        </Typography>
                        <Typography>
                            {new Date(selectedItem.departureDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Arrival Date:
                        </Typography>
                        <Typography>
                            {new Date(selectedItem.arrivalDate).toLocaleDateString()}
                        </Typography>
                    </Grid>
                </Grid>

                {/* Динамические поля для Trip */}
                {isTrip && (
                    <Grid container spacing={2} sx={{ mt: 2 }}>

                    </Grid>
                )}

                {/* Динамические поля для Parcel */}
                {!isTrip && (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                Title:
                            </Typography>
                            <Typography>{selectedItem.title || "N/A"}</Typography>

                        </Grid>
                    </Grid>
                )}

                {/* Статус */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Status:
                    </Typography>
                    <Typography
                        sx={{
                            color: selectedItem.status ? "gray" : "green",
                            fontWeight: "bold",
                        }}
                    >
                        {selectedItem.status ? "Ended" : "Active"}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                        sx={{
                            borderRadius: "20px",
                            background: "linear-gradient(to right, #1976d2, #2196f3)",
                            "&:hover": { background: "linear-gradient(to right, #1565c0, #1e88e5)" },
                        }}
                    >
                        Close
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    );
};

export default ProfileDetailsDialog;
