import React, { useEffect, useRef, useState } from "react";
import { Alert, Button } from "@mui/material";
import Cookies from "js-cookie";
import axios from "../../../axiosConfig";

export default function SettingsPanel({ onSettingsUpdated }) {
  const [original, setOriginal] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [retry, setRetry] = useState(0);
  const [verification, setVerification] = useState(null);
  const [code, setCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const lock = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    axios
      .get("/v1/user/settings", { signal: controller.signal })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        setOriginal(data);
        setEmail(data.email || "");
        setPhone(data.phoneNumber || "");
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError("Could not load your account settings. Please try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);
  const contactChanged =
    original &&
    (email.trim() !== original.email || phone.trim() !== original.phoneNumber);
  const changed = contactChanged || Boolean(newPassword);
  function errorText(e, fallback) {
    if (e.response?.status === 409)
      return "This email or phone number is already used by another account.";
    if (e.response?.status === 429)
      return "Please wait two minutes before requesting another code.";
    if (e.response?.status === 423)
      return "Too many attempts. Verification is temporarily locked; try again later.";
    const message = e.response?.data?.message;
    return typeof message === "string" && message !== "Validation failed"
      ? message
      : fallback;
  }
  async function save(event) {
    event.preventDefault();
    if (lock.current || !changed) return;
    setError("");
    setNotice("");
    if (
      newPassword &&
      (newPassword.length < 8 ||
        new TextEncoder().encode(newPassword).length > 72)
    ) {
      setError(
        "Choose a password with at least 8 characters and no more than 72 bytes.",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Your new passwords do not match.");
      return;
    }
    if (!/^\+?[0-9]{10,15}$/.test(phone.trim())) {
      setError(
        "Use an international phone number with 10–15 digits, for example +48123456789.",
      );
      return;
    }
    lock.current = true;
    setBusy(true);
    try {
      const relogin = email.trim() !== original.email || Boolean(newPassword);
      const { data } = await axios.put("/v1/user/settings/update-credentials", {
        email: email.trim(),
        phoneNumber: phone.trim(),
        currentPassword,
        newPassword: newPassword || null,
      });
      setOriginal(data);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVerification(null);
      setCode("");
      onSettingsUpdated?.(data);
      if (relogin) {
        Cookies.remove("token");
        localStorage.removeItem("currentUserId");
        localStorage.removeItem("currentCountMessages");
        sessionStorage.setItem(
          "murza-account-notice",
          "Account updated. Sign in again with your current email and password. Your other sessions have been signed out.",
        );
        window.location.assign("/login");
        return;
      }
      setNotice("Account updated. Please verify your new contact details.");
    } catch (e) {
      setError(
        errorText(
          e,
          "Could not save your settings. Check your current password and try again.",
        ),
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function sendCode(type) {
    if (lock.current || contactChanged) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setVerifyError("");
    setNotice("");
    try {
      await axios.post("/v1/verification/send", { type });
      setVerification(type);
      setCode("");
      setNotice(
        `A six-digit code was sent to your ${type === "phone" ? "saved phone number" : "saved email address"}.`,
      );
    } catch (e) {
      if (e.response?.data?.message === "Verification Code Already Active") {
        setVerification(type);
        setCode("");
        setNotice(
          "A code has already been sent. Check your messages and enter it below.",
        );
      } else
        setError(
          errorText(e, "Could not send the code. Please try again later."),
        );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function verifyCode(event) {
    event.preventDefault();
    if (lock.current || !/^[0-9]{6}$/.test(code)) return;
    lock.current = true;
    setBusy(true);
    setVerifyError("");
    try {
      await axios.post("/v1/verification/verify", { type: verification, code });
      const { data } = await axios.get("/v1/user/settings");
      setOriginal(data);
      onSettingsUpdated?.(data);
      setVerification(null);
      setCode("");
      setNotice("Contact verified. Your profile has been updated.");
    } catch (e) {
      setVerifyError(
        errorText(
          e,
          "The code is incorrect or expired. Check it and try again.",
        ),
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  function discard() {
    setEmail(original.email);
    setPhone(original.phoneNumber);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setNotice("");
  }
  if (loading) return <p role="status">Loading account settings…</p>;
  if (!original)
    return (
      <Alert
        severity="error"
        action={
          <Button onClick={() => setRetry((v) => v + 1)}>Try again</Button>
        }
      >
        {error}
      </Alert>
    );
  return (
    <section className="profile-form-panel">
      <span className="murza-eyebrow">Your account, in good hands</span>
      <h2>Account & security</h2>
      <p>
        Your email and phone are private. Only their verification status is
        shown to other members.
      </p>
      <form onSubmit={save}>
        <div className="profile-field-grid">
          <div>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                disabled={busy}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <div className="profile-contact-status">
              <span>
                {original.emailVerified && email.trim() === original.email
                  ? "✓ Verified"
                  : "Not verified"}
              </span>
              {!original.emailVerified && (
                <button
                  type="button"
                  className="profile-text-button"
                  disabled={busy || contactChanged}
                  onClick={() => sendCode("email")}
                >
                  Verify email
                </button>
              )}
            </div>
          </div>
          <div>
            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={16}
                value={phone}
                disabled={busy}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <div className="profile-contact-status">
              <span>
                {original.phoneVerified && phone.trim() === original.phoneNumber
                  ? "✓ Verified"
                  : "Not verified"}
              </span>
              {!original.phoneVerified && (
                <button
                  type="button"
                  className="profile-text-button"
                  disabled={busy || contactChanged}
                  onClick={() => sendCode("phone")}
                >
                  Verify phone
                </button>
              )}
            </div>
          </div>
        </div>
        {contactChanged && (
          <p className="profile-security-note">
            Save your new contact details before verifying them.
          </p>
        )}
        <div className="profile-password-section">
          <h3>Change your password</h3>
          <p className="profile-security-note">
            Optional. Use at least 8 characters. Changing your email or password
            signs out all existing sessions.
          </p>
          <div className="profile-field-grid">
            <label>
              New password
              <input
                name="newPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                value={newPassword}
                disabled={busy}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              Confirm new password
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required={Boolean(newPassword)}
                value={confirmPassword}
                disabled={busy}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <label>
          Current password
          <input
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            value={currentPassword}
            disabled={busy}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <p className="profile-security-note">
          Required to confirm any account changes.
        </p>
        {error && <Alert severity="error">{error}</Alert>}
        {notice && <Alert severity="success">{notice}</Alert>}
        <div className="profile-form-actions">
          <button
            className="murza-button"
            type="submit"
            disabled={busy || !changed}
          >
            {busy ? "Updating…" : "Save account changes"}
          </button>
          <button
            className="profile-text-button"
            type="button"
            disabled={busy || !changed}
            onClick={discard}
          >
            Discard changes
          </button>
        </div>
      </form>
      {verification && (
        <form className="profile-code-form" onSubmit={verifyCode}>
          <h3>
            Verify your {verification === "phone" ? "phone number" : "email"}
          </h3>
          <p className="profile-security-note">
            Enter the six-digit code sent to{" "}
            {verification === "phone" ? original.phoneNumber : original.email}.
          </p>
          <label>
            Verification code
            <input
              name="verificationCode"
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={code}
              disabled={busy}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </label>
          {verifyError && <Alert severity="error">{verifyError}</Alert>}
          <div className="profile-form-actions">
            <button
              className="murza-button murza-button-small"
              type="submit"
              disabled={busy || !/^[0-9]{6}$/.test(code)}
            >
              {busy ? "Checking…" : "Verify contact"}
            </button>
            <button
              className="profile-text-button"
              type="button"
              disabled={busy}
              onClick={() => sendCode(verification)}
            >
              Send another code
            </button>
            <button
              className="profile-text-button"
              type="button"
              disabled={busy}
              onClick={() => setVerification(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
