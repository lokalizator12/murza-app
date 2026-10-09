import React, { useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import ImageCarousel from "../../components/ImageCarousel";
export default function ParcelStep2({
  formData,
  handleChange,
  setIsNextEnabled,
}) {
  useEffect(() => {
    setIsNextEnabled(
      ["weight", "length", "width", "height"].every(
        (field) => Number(formData[field]) > 0,
      ),
    );
  }, [formData, setIsNextEnabled]);
  function dimension(field, value) {
    const number = value === "" ? "" : Number(value);
    if (number !== "" && (!Number.isFinite(number) || number < 0)) return;
    const updated = { ...formData, [field]: number };
    handleChange(field, number);
    handleChange(
      "size",
      `${updated.length || 0} × ${updated.width || 0} × ${updated.height || 0} cm`,
    );
    handleChange(
      "volume",
      Number(
        (
          ((updated.length || 0) *
            (updated.width || 0) *
            (updated.height || 0)) /
          1000000
        ).toPrecision(10),
      ),
    );
  }
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Tell travellers about the parcel
      </Typography>
      <Typography sx={{ color: "#796b60", mb: 2 }}>
        Measure the packed parcel. Photos are optional, but help travellers plan
        their space.
      </Typography>
      <TextField
        label="Weight (kg)"
        type="number"
        fullWidth
        margin="normal"
        value={formData.weight || ""}
        inputProps={{ min: 0.01, step: "any" }}
        onChange={(e) =>
          handleChange(
            "weight",
            e.target.value === "" ? "" : Math.max(0, Number(e.target.value)),
          )
        }
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
          mt: 2,
        }}
      >
        {["length", "width", "height"].map((field) => (
          <TextField
            key={field}
            label={`${field[0].toUpperCase() + field.slice(1)} (cm)`}
            type="number"
            value={formData[field] || ""}
            inputProps={{ min: 0.1, step: "any" }}
            onChange={(e) => dimension(field, e.target.value)}
          />
        ))}
      </Box>
      <Typography sx={{ mt: 2, color: "#796b60" }}>
        Calculated volume: {formData.volume || 0} m³
      </Typography>
      <ImageCarousel
        images={formData.images || []}
        setImages={(files) => handleChange("images", files)}
        maxImages={6}
      />
    </Box>
  );
}
