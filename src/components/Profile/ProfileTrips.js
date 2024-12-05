import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Tooltip,
    Typography,
} from "@mui/material";
import PaginationControls from "../common/PaginationControls";
import {motion} from "framer-motion";
import axios from "../../axiosConfig";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {format} from "date-fns";

const ProfileTrips = ({
                          trips,
                          tripsPage,
                          totalTrips,
                          itemsPerPage,
                          onTripsPageChange,
                          isOwnProfile,
                          onItemClick,
                          refreshTrips,
                      }) => {
    const [confirmDialog, setConfirmDialog] = useState({open: false, type: null});
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [notification, setNotification] = useState({open: false, message: "", severity: "success"});

    const openDialog = (type, trip, e) => {
        e.stopPropagation(); // Prevent triggering the main click
        setSelectedTrip(trip);
        setConfirmDialog({open: true, type});
    };

    const closeDialog = () => {
        setConfirmDialog({open: false, type: null});
    };

    const handleAction = async () => {
        try {
            if (confirmDialog.type === "realize") {
                await axios.put(`/trip-requests/${selectedTrip.idTrip}/realize`);
                setNotification({open: true, message: "Trip marked as realized!", severity: "success"});
            } else if (confirmDialog.type === "delete") {
                await axios.delete(`/trip-requests/${selectedTrip.idTrip}`);
                setNotification({open: true, message: "Trip deleted successfully!", severity: "success"});
            }
            closeDialog();
            await refreshTrips(); // Refresh the list of trips by calling the provided function
        } catch (error) {
            console.error("Error performing action:", error);
            setNotification({
                open: true,
                message: `Failed to ${confirmDialog.type} trip. Please try again.`,
                severity: "error",
            });
        }
    };

    const closeNotification = () => {
        setNotification({open: false, message: "", severity: "success"});
    };

    const formatDate = (date) => (date ? format(new Date(date), "dd MMMM yyyy") : "N/A");

    return (
        <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.3, delay: 0.2}}
        >
            <Card
                sx={{
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 300,
                }}
            >
                <CardContent>
                    <Typography variant="h6" sx={{mb: 2}}>
                        Trips
                    </Typography>
                    {trips.length ? (
                        trips.map((trip) => (
                            <Box
                                key={trip.idTrip}
                                sx={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    p: 2,
                                    mb: 2,
                                    cursor: "pointer",
                                    position: "relative",
                                    "&:hover": {background: "#f5f5f5"},
                                }}
                                onClick={() => onItemClick(trip)}
                            >
                                <Typography variant="body1">
                                    <strong>From:</strong> {trip.origin}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>To:</strong> {trip.destination}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Departure:</strong> {formatDate(trip.departureDate)}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: trip.status ? "gray" : "green",
                                        fontWeight: "bold",
                                        textAlign: "right",
                                    }}
                                >
                                    {trip.status ? "Ended" : "Active"}
                                </Typography>

                                <Chip
                                    icon={<CalendarTodayIcon sx={{color: "#07803e"}}/>}
                                    label={`Created At ${formatDate(trip.createdAt)}`}
                                    sx={{
                                        backgroundColor: "#e3f2fd",
                                        color: "#64431c",
                                        fontWeight: "bold",
                                    }}
                                />
                                {trip.status && (
                                    <Chip
                                        icon={<CalendarTodayIcon sx={{color: "#896c49"}}/>}
                                        label={`Realized At ${formatDate(trip.realizedAt)}`}
                                        sx={{
                                            backgroundColor: "#e3f2fd",
                                            color: "#64431c",
                                            fontWeight: "bold",
                                        }}
                                    />
                                )}

                                {isOwnProfile && (
                                    <Box
                                        sx={{
                                            mt: 2,
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            gap: 1,
                                        }}
                                    >
                                        {!trip.status && (
                                            <Tooltip title="Mark this trip as realized" arrow>
                                                <Button
                                                    class="navbar8-action21 thq-button-outline thq-button-animated"
                                                    size="small"
                                                    onClick={(e) => openDialog("realize", trip, e)}
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{
                                                        "&:hover": {
                                                            backgroundColor: "#e3f2fd",
                                                        },
                                                    }}
                                                >
                                                    Mark as Realized
                                                </Button>
                                            </Tooltip>
                                        )}
                                        {!trip.status && (
                                            <Tooltip
                                                title={trip.status ? "Cannot delete ended trips" : "Delete this trip"}
                                                arrow>
                                                <Button
                                                    class="navbar8-action21 thq-button-outline thq-button-animated"
                                                    size="small"
                                                    onClick={(e) => openDialog("delete", trip, e)}
                                                    color="error"
                                                    variant="outlined"
                                                >
                                                    Delete
                                                </Button>
                                            </Tooltip>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No trips available.
                        </Typography>
                    )}
                </CardContent>
                <PaginationControls
                    currentPage={tripsPage}
                    totalPages={Math.ceil(totalTrips / itemsPerPage)}
                    onPageChange={onTripsPageChange}
                />
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDialog.open} onClose={closeDialog}>
                <DialogTitle>
                    Confirm {confirmDialog.type === "delete" ? "Deletion" : "Realization"}
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to {confirmDialog.type} this trip?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleAction} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={closeNotification}
                message={notification.message}
                severity={notification.severity}
            />
        </motion.div>
    );
};

export default ProfileTrips;
