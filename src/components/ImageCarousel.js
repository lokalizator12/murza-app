import React, { useState } from "react";
import { Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
export default function ImageCarousel({ images, setImages, maxImages = 6 }) {
  const [index, setIndex] = useState(-1);
  const [error, setError] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxSize: 5 * 1024 * 1024,
    onDrop: (accepted, rejected) => {
      if (rejected.length) {
        setError("Choose JPG or PNG photos up to 5 MB each.");
        return;
      }
      if (images.length + accepted.length > maxImages) {
        setError(`You can add up to ${maxImages} photos.`);
        return;
      }
      setError("");
      setImages([
        ...images,
        ...accepted.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    },
  });
  function remove(at) {
    URL.revokeObjectURL(images[at].preview);
    setImages(images.filter((_, i) => i !== at));
  }
  return (
    <div className="parcel-photos">
      <div {...getRootProps()} className="parcel-photo-drop">
        <input {...getInputProps()} />
        <strong>Add parcel photos</strong>
        <p>
          Choose or drag JPG / PNG files here · up to {maxImages} photos, 5 MB
          each
        </p>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="parcel-photo-grid">
        {images.map((file, at) => (
          <div key={file.preview}>
            <button
              type="button"
              onClick={() => setIndex(at)}
              aria-label={`Preview photo ${at + 1}`}
            >
              <img src={file.preview} alt={`Parcel photo ${at + 1}`} />
            </button>
            <button
              type="button"
              onClick={() => remove(at)}
              aria-label={`Remove photo ${at + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {index >= 0 && (
        <Lightbox
          open
          close={() => setIndex(-1)}
          index={index}
          slides={images.map((file) => ({ src: file.preview }))}
        />
      )}
    </div>
  );
}
