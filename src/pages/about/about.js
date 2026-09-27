import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {appDestination} from '../../services/routeAccess';
import SiteFooter from '../../components/SiteFooter';
import './about.css';

const About = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className="murza-info-page">
            <Helmet><title>About Murza</title><meta name="description" content="Learn how Murza connects people sending parcels with travellers going their way."/></Helmet>
            <main>
                <section className="murza-info-hero murza-container">
                    <div><span className="murza-eyebrow">About Murza</span>
                        <h1>A curious idea for the journeys we already make.</h1>
                        <p>Murza brings parcel senders and travellers into the same place. Post where you are going or what you need to send, look for a route on the map and message someone who might be a match.</p>
                        <Link className="murza-button" to={appDestination('/main', isAuthenticated)}>Explore the map ↗</Link>
                    </div>
                    <img src="/images/murza-delivery.webp" alt="Murza the Siamese cat greeting a parcel at the door"/>
                </section>
                <section className="murza-info-grid murza-container">
                    <article><span>01</span><h2>Send a parcel</h2><p>Create a parcel request with the route, dates, dimensions and price you have in mind. Browse posted trips and contact a traveller whose journey fits.</p>
                        <Link to={appDestination('/main?create=parcel', isAuthenticated)}>Post a parcel ↗</Link></article>
                    <article><span>02</span><h2>Share a trip</h2><p>Post your destination and available space. Browse parcel requests along your route and talk with a sender before making plans.</p>
                        <Link to={appDestination('/main?create=trip', isAuthenticated)}>Post a trip ↗</Link></article>
                    <article><span>03</span><h2>Make a connection</h2><p>Use profiles and messages to discuss the handoff. Murza provides the place to meet; the people involved agree delivery and payment details directly.</p>
                        <Link to="/legal">Read service information ↗</Link></article>
                </section>
            </main>
            <SiteFooter/>
        </div>
    );
};
export default About;
