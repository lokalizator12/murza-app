import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import PaginationControls from "../common/PaginationControls";
import {motion} from "framer-motion";

const ProfileTrips = ({trips, tripsPage, totalTrips, itemsPerPage, onTripsPageChange, onItemClick}) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.3, delay: 0.2}}
        >
            <Card sx={{
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 300
            }}>
                <CardContent>
                    <Typography variant="h6" sx={{mb: 2}}>Trips</Typography>
                    {trips.length ? (
                        trips.map((trip) => (
                            <Box key={trip.idTrip} sx={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                p: 2,
                                mb: 2,
                                cursor: "pointer",
                                '&:hover': {background: "#f5f5f5"},
                            }}
                                 onClick={() => onItemClick(trip)}>
                                <Typography variant="body1"><strong>From:</strong> {trip.origin}</Typography>
                                <Typography variant="body1"><strong>To:</strong> {trip.destination}</Typography>
                                <Typography
                                    variant="body1"><strong>Departure:</strong> {new Date(trip.departureDate).toLocaleDateString()}
                                </Typography>
                                <Typography
                                    sx={{color: trip.status ? "gray" : "green", fontWeight: "bold", textAlign: "right"}}
                                >
                                    {trip.status ? "Ended" : "Active"}
                                </Typography>
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
        </motion.div>
    );
};

export default ProfileTrips;
