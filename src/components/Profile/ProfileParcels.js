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

const ProfileParcels = ({
                            parcels,
                            parcelsPage,
                            totalParcels,
                            itemsPerPage,
                            onParcelsPageChange,
                            isOwnProfile,
                            onItemClick,
                            refreshParcels,
                        }) => {
    const [confirmDialog, setConfirmDialog] = useState({open: false, type: null});
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [notification, setNotification] = useState({open: false, message: "", severity: "success"});

    const openDialog = (type, parcel, e) => {
        e.stopPropagation(); // Prevent triggering the main click
        setSelectedParcel(parcel);
        setConfirmDialog({open: true, type});
    };

    const closeDialog = () => {
        setConfirmDialog({open: false, type: null});
    };

    const handleAction = async () => {
        try {
            if (confirmDialog.type === "realize") {
                await axios.put(`/parcel-requests/${selectedParcel.idParcel}/realize`);
                setNotification({open: true, message: "Parcel marked as realized!", severity: "success"});
            } else if (confirmDialog.type === "delete") {
                await axios.delete(`/parcel-requests/${selectedParcel.idParcel}`);
                setNotification({open: true, message: "Parcel deleted successfully!", severity: "success"});
            }
            closeDialog();
            await refreshParcels(); // Refresh the list of parcels by calling the provided function
        } catch (error) {
            console.error("Error performing action:", error);
            setNotification({
                open: true,
                message: `Failed to ${confirmDialog.type} parcel. Please try again.`,
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
                        Parcels
                    </Typography>
                    {parcels.length ? (
                        parcels.map((parcel) => (
                            <Box
                                key={parcel.idParcel}
                                sx={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    p: 2,
                                    mb: 2,
                                    cursor: "pointer",
                                    position: "relative",
                                    "&:hover": {background: "#f5f5f5"},
                                }}
                                onClick={() => onItemClick(parcel)}
                            >
                                <Typography variant="body1">
                                    <strong>Title:</strong> {parcel.title}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>From:</strong> {parcel.origin}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>To:</strong> {parcel.destination}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: parcel.status ? "gray" : "green",
                                        fontWeight: "bold",
                                        textAlign: "right",
                                    }}
                                >
                                    {parcel.status ? "Ended" : "Active"}
                                </Typography>

                                <Chip
                                    icon={<CalendarTodayIcon sx={{color: "#07803e"}}/>}
                                    label={`Created At ${formatDate(parcel.createdAt)}`}
                                    sx={{
                                        backgroundColor: "#e3f2fd",
                                        color: "#64431c",
                                        fontWeight: "bold",
                                    }}
                                />
                                {parcel.status && (
                                    <Chip
                                        icon={<CalendarTodayIcon sx={{color: "#896c49"}}/>}
                                        label={`Realized At ${formatDate(parcel.realizedAt)}`}
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
                                        {!parcel.status && (
                                            <Tooltip title="Mark this parcel as realized" arrow>
                                                <Button
                                                    class="navbar8-action21 thq-button-outline thq-button-animated"
                                                    size="small"
                                                    onClick={(e) => openDialog("realize", parcel, e)}
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
                                        {!parcel.status && (
                                            <Tooltip
                                                title={parcel.status ? "Cannot delete ended parcels" : "Delete this parcel"}
                                                arrow
                                            >
                                                <Button
                                                    class="navbar8-action21 thq-button-outline thq-button-animated"
                                                    size="small"
                                                    onClick={(e) => openDialog("delete", parcel, e)}
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
                            No parcels available.
                        </Typography>
                    )}
                </CardContent>
                <PaginationControls
                    currentPage={parcelsPage}
                    totalPages={Math.ceil(totalParcels / itemsPerPage)}
                    onPageChange={onParcelsPageChange}
                />
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDialog.open} onClose={closeDialog}>
                <DialogTitle>
                    Confirm {confirmDialog.type === "delete" ? "Deletion" : "Realization"}
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to {confirmDialog.type} this parcel?
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

export default ProfileParcels;
