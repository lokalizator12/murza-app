import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
export default function TripStep3({
  formData,
  handleChange,
  setIsNextEnabled,
}) {
  const ordered = Boolean(
    formData.departureDate &&
      formData.destinationDate &&
      new Date(formData.destinationDate).getTime() >=
        new Date(formData.departureDate).getTime(),
  );
  useEffect(() => {
    setIsNextEnabled(
      Boolean(
        formData.title?.trim() && formData.description?.trim() && ordered,
      ),
    );
  }, [formData, ordered, setIsNextEnabled]);
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Trip dates and details
      </Typography>
      <Typography sx={{ color: "#796b60", mb: 2 }}>
        Dates use your local time. Tell senders about your route and handover
        preferences.
      </Typography>
      <TextField
        label="Trip title"
        fullWidth
        margin="normal"
        value={formData.title || ""}
        inputProps={{ maxLength: 120 }}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField
        label="Trip details"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={formData.description || ""}
        inputProps={{ maxLength: 3000 }}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <TextField
        label="Departure date"
        type="datetime-local"
        fullWidth
        margin="normal"
        value={formData.departureDate || ""}
        onChange={(e) => handleChange("departureDate", e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Arrival date"
        type="datetime-local"
        fullWidth
        margin="normal"
        value={formData.destinationDate || ""}
        onChange={(e) => handleChange("destinationDate", e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: formData.departureDate || undefined }}
        error={Boolean(
          formData.departureDate && formData.destinationDate && !ordered,
        )}
        helperText={
          formData.departureDate && formData.destinationDate && !ordered
            ? "Arrival cannot be earlier than departure."
            : ""
        }
      />
    </Box>
  );
}
