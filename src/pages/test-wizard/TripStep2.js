import React, { useEffect, useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "../../axiosConfig";
export default function TripStep2({
  formData,
  handleChange,
  setIsNextEnabled,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    axios
      .get("/items-delivery", { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted) setItems(data);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(
            "Could not load parcel categories. Retry, or describe your preferences in the next step.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);
  useEffect(() => {
    setIsNextEnabled(
      ["maxWeight", "maxVolume", "maxLength", "maxWidth", "maxHeight"].every(
        (field) => Number(formData[field]) > 0,
      ),
    );
  }, [formData, setIsNextEnabled]);
  function choose(id, accepted) {
    const key = accepted ? "acceptedItemsId" : "declinedItemsId";
    const other = accepted ? "declinedItemsId" : "acceptedItemsId";
    const current = formData[key] || [];
    handleChange(
      key,
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
    handleChange(
      other,
      (formData[other] || []).filter((value) => value !== id),
    );
  }
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        How much space can you share?
      </Typography>
      <Typography sx={{ color: "#796b60", mb: 2 }}>
        Enter the total space available and the largest parcel you can carry.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          my: 2,
        }}
      >
        {[
          ["maxWeight", "Available weight (kg)"],
          ["maxVolume", "Available volume (m³)"],
          ["maxLength", "Maximum parcel length (cm)"],
          ["maxWidth", "Maximum parcel width (cm)"],
          ["maxHeight", "Maximum parcel height (cm)"],
        ].map(([field, label]) => (
          <TextField
            key={field}
            label={label}
            type="number"
            value={formData[field] || ""}
            inputProps={{ min: 0.001, step: "any" }}
            onChange={(e) =>
              handleChange(
                field,
                e.target.value === ""
                  ? ""
                  : Math.max(0, Number(e.target.value)),
              )
            }
          />
        ))}
      </Box>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Parcel preferences · optional
      </Typography>
      <Typography sx={{ color: "#796b60", my: 1 }}>
        Let senders know what you can carry. Leave a category unset if you
        prefer to discuss it.
      </Typography>
      {loading && <p role="status">Loading categories…</p>}
      {error && (
        <Alert
          severity="warning"
          action={<Button onClick={() => setRetry((v) => v + 1)}>Retry</Button>}
        >
          {error}
        </Alert>
      )}
      <div className="trip-category-list">
        {items.map((item) => (
          <div key={item.id}>
            <span>{item.itemName}</span>
            <button
              type="button"
              aria-pressed={(formData.acceptedItemsId || []).includes(item.id)}
              onClick={() => choose(item.id, true)}
            >
              Can carry
            </button>
            <button
              type="button"
              aria-pressed={(formData.declinedItemsId || []).includes(item.id)}
              onClick={() => choose(item.id, false)}
            >
              Cannot carry
            </button>
          </div>
        ))}
      </div>
    </Box>
  );
}
