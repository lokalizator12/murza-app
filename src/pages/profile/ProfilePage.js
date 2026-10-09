import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Avatar } from "@mui/material";
import axios from "../../axiosConfig";
import EditProfileForm from "../../components/Profile/panels/EditProfileForm";
import SettingsPanel from "../../components/Profile/panels/SettingsPanel";
import SubscriptionsPanel from "../../components/Profile/panels/SubscriptionsPanel";
import ProfileRequests from "../../components/Profile/ProfileRequests";
import RequestDetailsModal from "../../components/MainPage/RequestDetailsModal";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [own, setOwn] = useState(false);
  const [following, setFollowing] = useState(false);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [tab, setTab] = useState("requests");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const actionLock = useRef(false);
  const [selected, setSelected] = useState(null);
  const [detailBusy, setDetailBusy] = useState(false);
  const profileRoute = useRef(userId);
  profileRoute.current = userId;
  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    setLoading(true);
    setError("");
    setProfile(null);
    setTab("requests");
    setSelected(null);
    (async () => {
      try {
        const [ownership, person, followers, followed] = await Promise.all([
          axios.get(`/v1/profile/is-owner/${userId}`, options),
          axios.get(`/v1/profile/${userId}`, options),
          axios.get(`/v1/subscriptions/${userId}/followers/count`, options),
          axios.get(`/v1/subscriptions/${userId}/following/count`, options),
        ]);
        const subscribed = ownership.data
          ? false
          : (
              await axios.get(
                `/v1/subscriptions/${userId}/is-following`,
                options,
              )
            ).data;
        if (controller.signal.aborted) return;
        setOwn(ownership.data);
        setProfile(person.data);
        setFollowing(subscribed);
        setCounts({ followers: followers.data, following: followed.data });
      } catch (e) {
        if (!controller.signal.aborted)
          setError(
            e.response?.status === 404
              ? "This profile is no longer available."
              : "We could not load this profile. Please try again.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [userId, retry]);
  async function refreshCounts() {
    const route = userId;
    const [a, b] = await Promise.all([
      axios.get(`/v1/subscriptions/${route}/followers/count`),
      axios.get(`/v1/subscriptions/${route}/following/count`),
    ]);
    if (profileRoute.current === route)
      setCounts({ followers: a.data, following: b.data });
  }
  async function toggleFollow() {
    if (actionLock.current) return;
    actionLock.current = true;
    setBusy(true);
    setError("");
    const route = userId;
    try {
      if (following) await axios.delete(`/v1/subscriptions/${route}`);
      else await axios.post(`/v1/subscriptions/${route}`);
      if (profileRoute.current === route) {
        setFollowing(!following);
        await refreshCounts();
      }
    } catch (_) {
      if (profileRoute.current === route)
        setError("Could not update your following list. Please try again.");
    } finally {
      actionLock.current = false;
      setBusy(false);
    }
  }
  async function openDetails(item, type) {
    if (detailBusy) return;
    setDetailBusy(true);
    setError("");
    const route = userId;
    try {
      const { data } = await axios.get(
        `/${type}-requests/${type === "parcel" ? item.idParcel : item.idTrip}`,
      );
      if (profileRoute.current === route) setSelected({ request: data, type });
    } catch (_) {
      if (profileRoute.current === route)
        setError(
          "This listing could not be opened. Refresh the list and try again.",
        );
    } finally {
      setDetailBusy(false);
    }
  }
  if (loading)
    return (
      <main className="profile-workspace profile-loading" role="status">
        Getting your profile ready…
      </main>
    );
  if (!profile)
    return (
      <main className="profile-workspace profile-loading">
        <h1>Profile unavailable</h1>
        <p role="alert">{error}</p>
        <button className="murza-button" onClick={() => setRetry((v) => v + 1)}>
          Try again
        </button>
        <Link to="/main">Explore routes</Link>
      </main>
    );
  const tabs = own
    ? [
        ["requests", "My listings"],
        ["edit", "Public profile"],
        ["settings", "Account & security"],
        ["people", "People"],
      ]
    : [["requests", "Listings"]];
  const joined =
    profile.dateRegistered &&
    !Number.isNaN(new Date(profile.dateRegistered).getTime())
      ? new Date(profile.dateRegistered).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })
      : null;
  return (
    <main
      className={`profile-workspace ${tab !== "requests" ? "is-editing" : ""}`}
    >
      <div className="profile-breadcrumb">
        <Link to="/main">Routes & parcels</Link>
        <span>/</span>
        <span>{own ? "Your profile" : "Traveller profile"}</span>
      </div>
      <header className="profile-hero">
        <div className="profile-person">
          <Avatar
            src={profile.userPhoto || undefined}
            alt={`${profile.firstName} ${profile.lastName}`}
            sx={{
              width: 96,
              height: 96,
              bgcolor: "#e7d5c3",
              color: "#62442e",
              fontSize: 36,
            }}
          >
            {profile.firstName?.[0]}
          </Avatar>
          <div>
            <span className="murza-eyebrow">
              {own ? "Your place on Murza" : "Meet your fellow traveller"}
            </span>
            <h1>
              {profile.firstName} {profile.lastName}
            </h1>
            {joined && <p>Part of the journey since {joined}</p>}
            <div className="profile-verifications">
              {profile.emailVerified && <span>✓ Email verified</span>}
              {profile.phoneVerified && <span>✓ Phone verified</span>}
            </div>
          </div>
        </div>
        <div className="profile-hero-actions">
          {own ? (
            <>
              <Link className="murza-button" to="/main?create=parcel">
                Post a parcel ↗
              </Link>
              <Link
                className="murza-button murza-button-outline"
                to="/main?create=trip"
              >
                Share a trip
              </Link>
            </>
          ) : (
            <>
              <Link className="murza-button" to={`/chat/${userId}`}>
                Send a message ↗
              </Link>
              <button
                className="murza-button murza-button-outline"
                disabled={busy}
                onClick={toggleFollow}
              >
                {busy
                  ? "Updating…"
                  : following
                    ? "Unfollow"
                    : "Follow traveller"}
              </button>
            </>
          )}
        </div>
      </header>
      <div className="profile-meta">
        <span>
          <strong>{counts.followers}</strong> followers
        </span>
        <span>
          <strong>{counts.following}</strong> following
        </span>
        <span className="profile-meta-note">
          {own
            ? "Your contact details stay private."
            : "Arrange delivery details together in chat."}
        </span>
      </div>
      {error && (
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      <nav className="profile-tabs" aria-label="Profile sections">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            aria-current={tab === id ? "page" : undefined}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      {tab === "requests" && (
        <div className="profile-listings">
          <ProfileRequests
            key={`parcel-${userId}`}
            type="parcel"
            userId={userId}
            own={own}
            onOpen={openDetails}
            detailBusy={detailBusy}
          />
          <ProfileRequests
            key={`trip-${userId}`}
            type="trip"
            userId={userId}
            own={own}
            onOpen={openDetails}
            detailBusy={detailBusy}
          />
        </div>
      )}
      {tab === "edit" && own && (
        <EditProfileForm
          initialProfile={profile}
          onProfileUpdated={setProfile}
        />
      )}
      {tab === "settings" && own && (
        <SettingsPanel
          onSettingsUpdated={(settings) =>
            setProfile((p) => ({
              ...p,
              emailVerified: settings.emailVerified,
              phoneVerified: settings.phoneVerified,
            }))
          }
        />
      )}
      {tab === "people" && own && (
        <SubscriptionsPanel userId={userId} onChanged={refreshCounts} />
      )}
      {selected && (
        <RequestDetailsModal
          open
          onClose={() => setSelected(null)}
          request={selected.request}
          requestType={selected.type}
        />
      )}
    </main>
  );
}
