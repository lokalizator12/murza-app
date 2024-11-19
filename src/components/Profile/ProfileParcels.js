import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import PaginationControls from "../common/PaginationControls";

const ProfileParcels = ({parcels, parcelsPage, totalParcels, itemsPerPage, onParcelsPageChange, onItemClick}) => {
    return (
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
                <Typography variant="h6" sx={{mb: 2}}>Parcels</Typography>
                {parcels.length ? (
                    parcels.map((parcel) => (
                        <Box key={parcel.idParcel} sx={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            p: 2,
                            mb: 2,
                            cursor: "pointer",
                            '&:hover': {background: "#f5f5f5"},
                        }}
                             onClick={() => onItemClick(parcel)}
                        >
                            <Typography variant="body1"><strong>Title:</strong> {parcel.title}</Typography>
                            <Typography variant="body1"><strong>From:</strong> {parcel.origin}</Typography>
                            <Typography variant="body1"><strong>To:</strong> {parcel.destination}</Typography>

                            <Typography
                                sx={{color: parcel.status ? "gray" : "green", fontWeight: "bold", textAlign: "right"}}
                            >
                                {parcel.status ? "Ended" : "Active"}
                            </Typography>
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
    );
};

export default ProfileParcels;
