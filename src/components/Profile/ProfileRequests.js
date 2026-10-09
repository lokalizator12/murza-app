import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Pagination,
} from "@mui/material";
import axios from "../../axiosConfig";

export const listingDate = (value) => {
  const date = new Date(value);
  return value && !Number.isNaN(date.getTime())
    ? date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date not specified";
};
export default function ProfileRequests({
  type,
  userId,
  own,
  onOpen,
  detailBusy,
}) {
  const parcel = type === "parcel";
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    axios
      .get(`/${type}-requests/user/${userId}`, {
        params: { page: page - 1, size: 3 },
        signal: controller.signal,
      })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        const lastPage = Math.max(1, Math.ceil(data.totalElements / 3));
        if (page > lastPage) {
          setPage(lastPage);
          return;
        }
        setItems(data.content || []);
        setTotal(data.totalElements || 0);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(
            `Could not load ${parcel ? "parcels" : "trips"}. Please try again.`,
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [type, userId, page, refresh, parcel]);
  async function confirm() {
    if (lock.current || !confirmation) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    const id = parcel ? confirmation.item.idParcel : confirmation.item.idTrip;
    try {
      if (confirmation.action === "delete")
        await axios.delete(`/${type}-requests/${id}`);
      else await axios.put(`/${type}-requests/${id}/realize`);
      setNotice(
        confirmation.action === "delete"
          ? "Listing deleted."
          : "Listing completed. It is now hidden from the route board.",
      );
      setConfirmation(null);
      setRefresh((v) => v + 1);
    } catch (_) {
      setError("The listing could not be updated. Please try again.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <section
      className="profile-request-section"
      aria-label={parcel ? "Parcels" : "Trips"}
    >
      <div className="profile-section-heading">
        <div>
          <span className="murza-eyebrow">
            {parcel ? "Something to send" : "A journey to share"}
          </span>
          <h2>
            {own ? "My " : ""}
            {parcel ? "parcels" : "trips"} <small>{total}</small>
          </h2>
        </div>
        {own && (
          <Link to={`/main?create=${type}`}>
            Add {parcel ? "parcel" : "trip"} ↗
          </Link>
        )}
      </div>
      {notice && (
        <Alert severity="success" onClose={() => setNotice("")}>
          {notice}
        </Alert>
      )}
      {error && (
        <Alert
          severity="error"
          action={
            <Button
              onClick={() => {
                setConfirmation(null);
                setRefresh((v) => v + 1);
              }}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      {loading ? (
        <div className="profile-list-loading" role="status">
          Loading {parcel ? "parcels" : "trips"}…
        </div>
      ) : !error && !items.length ? (
        <div className="profile-empty">
          <img src="/images/murza-mascot.webp" alt="" />
          <h3>
            {own
              ? "Your next journey starts here."
              : `No ${parcel ? "parcels" : "trips"} yet.`}
          </h3>
          <p>
            {own
              ? parcel
                ? "Tell travellers what you need delivered and where it needs to go."
                : "Share your route and help a parcel find its way."
              : "Check back another time or send a message to say hello."}
          </p>
          {own && (
            <Link
              className="murza-button murza-button-outline murza-button-small"
              to={`/main?create=${type}`}
            >
              {parcel ? "Post your first parcel" : "Share your first trip"}
            </Link>
          )}
        </div>
      ) : (
        !error &&
        items.map((item) => (
          <article
            className="profile-listing"
            key={parcel ? item.idParcel : item.idTrip}
          >
            <div className="profile-listing-top">
              <span
                className={`profile-status ${item.status ? "is-complete" : ""}`}
              >
                {item.status ? "Completed" : "Open listing"}
              </span>
              {parcel && item.price != null && <strong>{item.price} €</strong>}
            </div>
            <button
              className="profile-listing-link"
              disabled={detailBusy}
              onClick={() => onOpen(item, type)}
            >
              <h3>
                {item.title || (parcel ? "Parcel delivery" : "Shared trip")}
              </h3>
              <div className="profile-route">
                <span>
                  {item.origin ||
                    (parcel ? item.pickupAddress : item.departureAddress) ||
                    "Pickup location"}
                </span>
                <span aria-label="to">→</span>
                <span>
                  {item.destination ||
                    (parcel ? item.deliveryAddress : item.destinationAddress) ||
                    "Destination"}
                </span>
              </div>
              <p>{listingDate(item.departureDate)}</p>
              <span className="profile-details-label">
                View {parcel ? "parcel" : "trip"} details ↗
              </span>
            </button>
            {own && !item.status && (
              <div className="profile-listing-actions">
                <button
                  disabled={busy}
                  onClick={() => setConfirmation({ item, action: "complete" })}
                >
                  Mark completed
                </button>
                <button
                  className="profile-danger"
                  disabled={busy}
                  onClick={() => setConfirmation({ item, action: "delete" })}
                >
                  Delete listing
                </button>
              </div>
            )}
          </article>
        ))
      )}
      {total > 3 && (
        <Pagination
          count={Math.ceil(total / 3)}
          page={page}
          onChange={(_, value) => setPage(value)}
          disabled={loading || busy}
          aria-label={`${parcel ? "Parcels" : "Trips"} pages`}
        />
      )}
      <Dialog
        open={Boolean(confirmation)}
        onClose={() => !busy && setConfirmation(null)}
        aria-labelledby={`${type}-confirm-title`}
      >
        <DialogTitle id={`${type}-confirm-title`}>
          {confirmation?.action === "delete"
            ? "Delete this listing?"
            : "Mark this listing completed?"}
        </DialogTitle>
        <DialogContent>
          {confirmation?.action === "delete"
            ? "This permanently removes the listing. Your chat conversations will stay available."
            : "The listing will leave the route board and remain in your profile as completed."}
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setConfirmation(null)}>
            Keep listing
          </Button>
          <Button
            color={confirmation?.action === "delete" ? "error" : "primary"}
            disabled={busy}
            onClick={confirm}
          >
            {busy
              ? "Updating…"
              : confirmation?.action === "delete"
                ? "Delete listing"
                : "Mark completed"}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
