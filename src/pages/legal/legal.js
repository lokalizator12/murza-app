import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import SiteFooter from '../../components/SiteFooter';
import './legal.css';

const Legal = () => (
    <div className="murza-info-page">
        <Helmet><title>Service information | Murza</title><meta name="description" content="What Murza currently offers and what to check before arranging a parcel delivery."/></Helmet>
        <main className="murza-container murza-service-info">
            <span className="murza-eyebrow">Service information</span>
            <h1>Know what to expect before you set off.</h1>
            <p className="murza-service-lead">Murza helps people find parcel and trip requests, view routes and contact each other. These notes describe the current service; they are not a substitute for an agreement between the people arranging a delivery.</p>
            <div className="murza-service-list">
                <section><h2>Requests and messages</h2><p>Members can post a parcel or trip, explore requests on a map, view profiles and exchange messages. Check the route, dates, parcel contents and available space with the other person before agreeing to anything.</p></section>
                <section><h2>Delivery arrangements</h2><p>The sender and traveller arrange pickup, handoff and delivery directly. Murza does not transport parcels, verify handoffs or provide live parcel tracking.</p></section>
                <section><h2>Price and payment</h2><p>Parcel requests can show a proposed price. Agree the final amount and payment method directly with the other person. Murza does not process payments or offer a pricing plan.</p></section>
                <section><h2>Stay careful</h2><p>Review the other person's profile, confirm the details in messages and avoid sending prohibited or unsafe items. If something feels unclear, ask before proceeding.</p></section>
            </div>
            <Link className="murza-button" to="/about">See how Murza works ↗</Link>
        </main>
        <SiteFooter/>
    </div>
);
export default Legal;
