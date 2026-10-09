// RequestDetailsModal.js
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { listingDate } from "../Profile/ProfileRequests";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import ReadOnlyImageCarousel from "../ReadOnlyImageCarousel";
import RouteMap from "../RouteMap";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Close, ContactMail } from "@mui/icons-material";

const RequestDetailsModal = ({ open, onClose, request, requestType }) => {
  const navigate = useNavigate();
  const isParcel = requestType === "parcel";
  const { userLocal } = useAuth();
  const ownerId = isParcel ? request?.sender?.id : request?.driver?.id;
  const own = ownerId != null && String(ownerId) === String(userLocal);
  if (!request) return null;

  const handleContact = () => {
    const interlocutorId = isParcel ? request?.sender?.id : request?.driver?.id;
    if (interlocutorId) {
      onClose();
      navigate(`/chat/${interlocutorId}`);
    } else {
      console.error("User ID is not available for redirection.");
    }
  };
  const handleProfileRedirect = () => {
    if (isParcel && request?.sender?.id) {
      onClose();
      navigate(`/profile/${request.sender.id}`);
    } else if (!isParcel && request?.driver?.id) {
      onClose();
      navigate(`/profile/${request.driver.id}`);
    } else {
      console.error("User ID is not available for redirection.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isParcel ? "Parcel details" : "Trip details"}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h5" gutterBottom>
          {request.title || (isParcel ? "Parcel request" : "Trip request")}
        </Typography>
        {isParcel && request.photos && request.photos.length > 0 && (
          <ReadOnlyImageCarousel images={request.photos} />
        )}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong>{" "}
              {request.description || "No description provided"}
            </Typography>
            {isParcel ? (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Proposed price:</strong>{" "}
                  {request.price != null
                    ? `${request.price} €`
                    : "To be agreed"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Size:</strong> {request.size || "Not specified"}
                </Typography>
                {request.weight > 0 && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Weight:</strong> {request.weight} kg
                  </Typography>
                )}
                {request.volume > 0 && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Volume:</strong> {request.volume} m³
                  </Typography>
                )}
              </>
            ) : (
              <>
                {request.maxWeight > 0 && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Available weight:</strong> {request.maxWeight} kg
                  </Typography>
                )}
                {request.maxVolume > 0 && (
                  <Typography variant="body1" gutterBottom>
                    <strong>Available volume:</strong> {request.maxVolume} m³
                  </Typography>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {isParcel ? (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Pickup Address:</strong> {request.pickupAddress}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Delivery Address:</strong> {request.deliveryAddress}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Pickup Date:</strong>{" "}
                  {listingDate(request.pickupDate)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Delivery Date:</strong>{" "}
                  {listingDate(request.deliveryDate)}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Departure Address:</strong> {request.departureAddress}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Destination Address:</strong>{" "}
                  {request.destinationAddress}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Departure Date:</strong>{" "}
                  {listingDate(request.departureDate)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Arrival Date:</strong>{" "}
                  {listingDate(request.destinationDate)}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <RouteMap
            pickupCoordinates={
              isParcel
                ? [request.pickupLongitude, request.pickupLatitude]
                : [request.departureLongitude, request.departureLatitude]
            }
            destinationCoordinates={
              isParcel
                ? [request.deliveryLongitude, request.deliveryLatitude]
                : [request.destinationLongitude, request.destinationLatitude]
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {!own && ownerId != null && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<ContactMail />}
            onClick={handleContact}
          >
            Message {isParcel ? "sender" : "traveller"}
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AccountCircle />}
          disabled={ownerId == null}
          onClick={handleProfileRedirect}
        >
          {own ? "Manage my listings" : "View profile"}
        </Button>
        <Button
          variant="text"
          color="inherit"
          startIcon={<Close />}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetailsModal;
