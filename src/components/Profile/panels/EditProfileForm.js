import React, { useEffect, useRef, useState } from "react";
import { Alert, Avatar } from "@mui/material";
import axios from "../../../axiosConfig";

export default function EditProfileForm({ initialProfile, onProfileUpdated }) {
  const [firstName, setFirstName] = useState(initialProfile.firstName || "");
  const [lastName, setLastName] = useState(initialProfile.lastName || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [removePhoto, setRemovePhoto] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const lock = useRef(false);
  const input = useRef(null);
  useEffect(() => {
    if (!photo) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);
  const changed =
    firstName.trim() !== initialProfile.firstName ||
    lastName.trim() !== initialProfile.lastName ||
    photo ||
    removePhoto;
  function selectPhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setSuccess("");
    if (
      !["image/jpeg", "image/png"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setError("Choose a JPG or PNG image up to 5 MB.");
      return;
    }
    setError("");
    setPhoto(file);
    setRemovePhoto(false);
  }
  async function save(event) {
    event.preventDefault();
    if (lock.current || !changed) return;
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    setSuccess("");
    const data = new FormData();
    data.append("firstName", firstName.trim());
    data.append("lastName", lastName.trim());
    if (photo) data.append("userPhoto", photo);
    data.append("removePhoto", String(removePhoto));
    try {
      const response = await axios.put("/v1/profile", data);
      onProfileUpdated(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhoto(null);
      setRemovePhoto(false);
      setSuccess("Your public profile is up to date.");
    } catch (e) {
      setError(
        e.response?.status === 400
          ? "Check your name and photo. Images must be JPG or PNG, up to 5 MB."
          : "Could not save your profile. Your changes are still here; please try again.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  function reset() {
    setFirstName(initialProfile.firstName || "");
    setLastName(initialProfile.lastName || "");
    setPhoto(null);
    setRemovePhoto(false);
    setError("");
    setSuccess("");
  }
  return (
    <section className="profile-form-panel">
      <h2>Your public profile</h2>
      <p>Your name and photo help senders and travellers recognise you.</p>
      <form onSubmit={save}>
        <div className="profile-photo-editor">
          <Avatar
            src={
              removePhoto
                ? undefined
                : preview || initialProfile.userPhoto || undefined
            }
            sx={{
              width: 88,
              height: 88,
              bgcolor: "var(--murza-surface)",
              color: "var(--murza-blue)",
            }}
          >
            {firstName[0]}
          </Avatar>
          <div>
            <button
              type="button"
              className="murza-button murza-button-outline murza-button-small"
              disabled={busy}
              onClick={() => input.current?.click()}
            >
              Choose photo
            </button>
            <input
              ref={input}
              type="file"
              accept="image/jpeg,image/png"
              hidden
              onChange={selectPhoto}
            />
            <p>JPG or PNG · up to 5 MB</p>
            {(photo || initialProfile.userPhoto) && !removePhoto && (
              <button
                className="profile-text-button"
                type="button"
                disabled={busy}
                onClick={() => {
                  setPhoto(null);
                  setRemovePhoto(Boolean(initialProfile.userPhoto));
                }}
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
        <div className="profile-field-grid">
          <label>
            First name
            <input
              autoComplete="given-name"
              name="firstName"
              value={firstName}
              maxLength={50}
              required
              disabled={busy}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              autoComplete="family-name"
              name="lastName"
              value={lastName}
              maxLength={50}
              required
              disabled={busy}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <div className="profile-form-actions">
          <button
            className="murza-button"
            type="submit"
            disabled={busy || !changed}
          >
            {busy ? "Saving…" : "Save profile"}
          </button>
          <button
            type="button"
            className="profile-text-button"
            disabled={busy || !changed}
            onClick={reset}
          >
            Discard changes
          </button>
        </div>
      </form>
    </section>
  );
}
