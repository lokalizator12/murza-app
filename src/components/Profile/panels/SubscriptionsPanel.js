import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "../../../axiosConfig";
export default function SubscriptionsPanel({ userId, onChanged }) {
  const [type, setType] = useState("following");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    axios
      .get(`/v1/subscriptions/${userId}/${type}`, { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted) setPeople(data);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError("Could not load people. Please try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [type, userId, refresh]);
  async function remove() {
    if (lock.current || !selected) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      await axios.delete(
        type === "following"
          ? `/v1/subscriptions/${selected.id}`
          : `/v1/subscriptions/followers/${selected.id}`,
      );
      setPeople((list) => list.filter((person) => person.id !== selected.id));
      setSelected(null);
      try {
        await onChanged?.();
      } catch (_) {
        setError(
          "The list is updated. Profile counts could not refresh; reload the page to see them.",
        );
      }
    } catch (_) {
      setError("Could not update the list. Please try again.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="profile-form-panel">
      <h2>Your connections</h2>
      <p>
        Keep travellers you know close, and find your way back to their routes.
      </p>
      <nav className="profile-people-tabs" aria-label="Connections">
        <button
          disabled={busy}
          aria-pressed={type === "following"}
          onClick={() => setType("following")}
        >
          Following
        </button>
        <button
          disabled={busy}
          aria-pressed={type === "followers"}
          onClick={() => setType("followers")}
        >
          Followers
        </button>
      </nav>
      {error && (
        <Alert
          severity="error"
          action={
            <Button onClick={() => setRefresh((v) => v + 1)}>Retry</Button>
          }
        >
          {error}
        </Alert>
      )}
      {loading ? (
        <p role="status">Loading people…</p>
      ) : !error && !people.length ? (
        <div className="profile-empty">
          <img src="/images/murza-mascot.webp" alt="" />
          <h3>
            {type === "following"
              ? "Meet someone along the way."
              : "No followers yet."}
          </h3>
          <p>
            {type === "following"
              ? "Open a traveller’s profile from a listing and choose Follow traveller."
              : "Share a trip so other members can find you."}
          </p>
          <Link
            className="murza-button murza-button-outline murza-button-small"
            to="/main?type=trip"
          >
            Explore trips
          </Link>
        </div>
      ) : (
        <ul className="profile-people-list">
          {people.map((person) => (
            <li key={person.id}>
              <Link
                className="profile-person-link"
                to={`/profile/${person.id}`}
              >
                <Avatar src={person.userPhoto || person.avatar || undefined}>
                  {person.firstName?.[0]}
                </Avatar>
                <strong>
                  {person.firstName} {person.lastName}
                </strong>
              </Link>
              <div>
                <Link to={`/chat/${person.id}`}>Message</Link>
                <button
                  className="profile-text-button"
                  disabled={busy}
                  onClick={() => setSelected(person)}
                >
                  {type === "following" ? "Unfollow" : "Remove follower"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Dialog
        open={Boolean(selected)}
        onClose={() => !busy && setSelected(null)}
        aria-labelledby="connection-confirm"
      >
        <DialogTitle id="connection-confirm">
          {type === "following" ? "Unfollow traveller?" : "Remove follower?"}
        </DialogTitle>
        <DialogContent>
          {type === "following"
            ? "You can follow this traveller again from their profile."
            : "This removes their subscription to your profile. It does not block messages."}
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button disabled={busy} onClick={() => setSelected(null)}>
            Cancel
          </Button>
          <Button disabled={busy} onClick={remove}>
            {busy
              ? "Updating…"
              : type === "following"
                ? "Unfollow"
                : "Remove follower"}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
