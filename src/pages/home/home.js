import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appDestination } from "../../services/routeAccess";
import SiteFooter from "../../components/SiteFooter";
import "./home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("send");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const type = purpose === "send" ? "trip" : "parcel";
  const searchRoutes = (event) => {
    event.preventDefault();
    const params = new URLSearchParams({ type });
    if (from.trim()) params.set("from", from.trim());
    if (to.trim()) params.set("to", to.trim());
    navigate(appDestination(`/main?${params}`, isAuthenticated));
  };
  return (
    <div className="murza-home">
      <Helmet>
        <title>Murza | Send a parcel with someone going your way</title>
        <meta
          name="description"
          content="Find a traveller for your parcel, or carry a parcel on a trip you already plan to make. Search routes and agree the details in messages."
        />
        <meta
          property="og:title"
          content="Murza | Parcels travel with people"
        />
      </Helmet>
      <main>
        <section className="murza-hero">
          <div className="murza-container murza-hero-grid">
            <div className="murza-hero-copy">
              <h1>
                Parcels travel
                <br />
                with people.
              </h1>
              <p>
                Find someone going your way. Send a parcel with them, or make
                room for one on your next trip.
              </p>
              <Link className="murza-text-link" to="/about">
                How delivery works
              </Link>
              <div className="murza-hero-companion">
                <img
                  src="/images/murza-mascot.webp"
                  alt=""
                  width="64"
                  height="64"
                />
                <p>
                  Meet Murza.
                  <br />A Siamese cat with a place to go.
                </p>
              </div>
            </div>
            <form
              className="murza-route-search"
              onSubmit={searchRoutes}
              aria-label="Find a delivery route"
            >
              <fieldset className="murza-search-purpose">
                <legend>What would you like to do?</legend>
                <label className={purpose === "send" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="purpose"
                    value="send"
                    checked={purpose === "send"}
                    onChange={() => setPurpose("send")}
                  />
                  Send a parcel
                </label>
                <label className={purpose === "carry" ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="purpose"
                    value="carry"
                    checked={purpose === "carry"}
                    onChange={() => setPurpose("carry")}
                  />
                  Carry a parcel
                </label>
              </fieldset>
              <div className="murza-route-fields">
                <label>
                  <span>From</span>
                  <input
                    name="from"
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    placeholder="Departure city"
                    maxLength={250}
                    autoComplete="off"
                  />
                </label>
                <button
                  className="murza-swap-route"
                  type="button"
                  aria-label="Swap departure and destination"
                  onClick={() => {
                    setFrom(to);
                    setTo(from);
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 19V5m-4 4 4-4 4 4m6-4v14m-4-4 4 4 4-4" />
                  </svg>
                </button>
                <label>
                  <span>To</span>
                  <input
                    name="to"
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                    placeholder="Destination city"
                    maxLength={250}
                    autoComplete="off"
                  />
                </label>
              </div>
              <button
                className="murza-button murza-search-submit"
                type="submit"
              >
                {purpose === "send"
                  ? "Find a traveller"
                  : "Find parcels to carry"}
              </button>
              <p className="murza-search-note">
                {isAuthenticated
                  ? "Leave a city blank to see more routes."
                  : "Log in to see matching routes. Your search will be saved."}
              </p>
              <div className="murza-search-post">
                <span>
                  {purpose === "send"
                    ? "Let travellers find you."
                    : "Let senders find your trip."}
                </span>
                <Link
                  to={appDestination(
                    `/main?create=${purpose === "send" ? "parcel" : "trip"}`,
                    isAuthenticated,
                  )}
                >
                  {purpose === "send" ? "Post a parcel" : "Post a trip"}
                </Link>
              </div>
            </form>
          </div>
        </section>
        <section className="murza-how murza-container" id="how-it-works">
          <h2>
            Arrange a delivery
            <br />
            in three steps.
          </h2>
          <div className="murza-how-content">
            <p>
              Murza connects people sending parcels with people already making
              the journey. You contact each other and arrange delivery directly.
            </p>
            <ol>
              <li>
                <h3>Find a route</h3>
                <p>
                  Search by departure and destination. Check the dates and
                  available space.
                </p>
              </li>
              <li>
                <h3>Agree the details</h3>
                <p>
                  Message the other person about the parcel, price and pickup
                  point.
                </p>
              </li>
              <li>
                <h3>Arrange the handover</h3>
                <p>Confirm how and when the recipient will get the parcel.</p>
              </li>
            </ol>
          </div>
        </section>
        <section className="murza-options">
          <div className="murza-container murza-options-grid">
            <article>
              <svg
                className="murza-option-icon"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path d="m8 15 16-8 16 8v19l-16 8-16-8Zm0 0 16 8 16-8M24 23v19M16 11l16 8v8" />
              </svg>
              <div>
                <h2>Sending something?</h2>
                <p>
                  Add the parcel’s route, size and dates. A traveller can
                  contact you when it fits their journey.
                </p>
                <Link
                  to={appDestination("/main?create=parcel", isAuthenticated)}
                  className="murza-button"
                >
                  Post a parcel
                </Link>
              </div>
            </article>
            <article>
              <svg
                className="murza-option-icon"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path d="m10 19 4-10h20l4 10M8 19h32v17H8Zm0 10h32M15 24h2m14 0h2M12 36v5m24-5v5" />
              </svg>
              <div>
                <h2>Going somewhere?</h2>
                <p>
                  Share your trip and the space you have. Find a parcel you can
                  take along.
                </p>
                <Link
                  to={appDestination("/main?create=trip", isAuthenticated)}
                  className="murza-button murza-button-outline"
                >
                  Post a trip
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section className="murza-faq murza-container" id="faq">
          <h2>Before you send</h2>
          <div className="murza-faq-list">
            <details>
              <summary>Who delivers the parcel?</summary>
              <p>
                The traveller you agree with. Murza helps you find and message
                each other; it does not transport parcels.
              </p>
            </details>
            <details>
              <summary>How do we agree a price?</summary>
              <p>
                A parcel request can include a proposed price. Confirm the final
                amount and payment method in messages. Murza does not process
                payments.
              </p>
            </details>
            <details>
              <summary>What should I check first?</summary>
              <p>
                Check the profile and confirm the contents, dates, size, pickup
                point and delivery address before handing over a parcel.
              </p>
            </details>
            <details>
              <summary>Can I track a parcel live?</summary>
              <p>
                The map shows published routes. Live parcel tracking is not
                available. Ask the traveller for updates in messages.
              </p>
            </details>
            <details>
              <summary>Do I need an account?</summary>
              <p>
                Yes. You need an account to browse routes, post a parcel or
                trip, and contact another member.
              </p>
            </details>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
export default Home;
