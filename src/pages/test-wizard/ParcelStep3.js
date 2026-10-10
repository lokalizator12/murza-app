import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
export default function ParcelStep3({
  formData,
  handleChange,
  setIsNextEnabled,
}) {
  const ordered = Boolean(
    formData.pickupDate &&
      formData.deliveryDate &&
      new Date(formData.deliveryDate).getTime() >=
        new Date(formData.pickupDate).getTime(),
  );
  useEffect(() => {
    setIsNextEnabled(
      Boolean(
        formData.title?.trim() &&
          formData.description?.trim() &&
          ordered &&
          Number(formData.price) > 0,
      ),
    );
  }, [formData, ordered, setIsNextEnabled]);
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Dates and proposed price
      </Typography>
      <Typography sx={{ color: "#796b60", mb: 2 }}>
        Dates use your local time. Agree on the final price with your traveller
        in chat.
      </Typography>
      <TextField
        label="Parcel title"
        fullWidth
        margin="normal"
        value={formData.title || ""}
        inputProps={{ maxLength: 120 }}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <TextField
        label="Parcel description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={formData.description || ""}
        inputProps={{ maxLength: 3000 }}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <TextField
        label="Pickup date"
        type="datetime-local"
        fullWidth
        margin="normal"
        value={formData.pickupDate || ""}
        onChange={(e) => handleChange("pickupDate", e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Delivery date"
        type="datetime-local"
        fullWidth
        margin="normal"
        value={formData.deliveryDate || ""}
        onChange={(e) => handleChange("deliveryDate", e.target.value)}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: formData.pickupDate || undefined }}
        error={Boolean(
          formData.pickupDate && formData.deliveryDate && !ordered,
        )}
        helperText={
          formData.pickupDate && formData.deliveryDate && !ordered
            ? "Arrival cannot be earlier than departure."
            : ""
        }
      />
      <TextField
        label="Proposed price (€)"
        type="number"
        fullWidth
        margin="normal"
        value={formData.price || ""}
        inputProps={{ min: 0.01, step: 0.01 }}
        onChange={(e) =>
          handleChange(
            "price",
            e.target.value === "" ? "" : Math.max(0, Number(e.target.value)),
          )
        }
      />
    </Box>
  );
}
