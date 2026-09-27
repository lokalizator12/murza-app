import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {appDestination} from '../services/routeAccess';
import './MurzaGuide.css';

const MurzaGuide = () => {
    const location = useLocation();
    const {isAuthenticated} = useAuth();
    const [open, setOpen] = useState(false);
    const path = location.pathname;
    if (!['/', '/home', '/main', '/about', '/legal'].includes(path)) return null;

    const onMap = path === '/main';
    const browsingTrips = location.search.includes('type=trip');
    const message = onMap
        ? browsingTrips
            ? 'Looking for a ride for a parcel? Open a trip to meet the traveller.'
            : 'Going somewhere? Open a parcel to see who needs your route.'
        : 'I know a good place to start: explore the routes on the map.';
    const destination = onMap
        ? browsingTrips ? '/main?create=parcel' : '/main?create=trip'
        : '/main?type=trip';
    const action = onMap
        ? browsingTrips ? 'Post a parcel' : 'Post a trip'
        : 'Explore trips';

    const close = () => {
        setOpen(false);
    };
    return (
        <aside className={`murza-guide-widget ${open ? 'is-open' : ''}`} aria-label="Murza's tip">
            {open && <div className="murza-guide-bubble">
                <button className="murza-guide-close" type="button" onClick={close} aria-label="Close Murza's tip">×</button>
                <span className="murza-eyebrow">A tip from Murza</span>
                <p>{message}</p>
                <Link to={appDestination(destination, isAuthenticated)} onClick={close}>{action} ↗</Link>
            </div>}
            <button className="murza-guide-trigger" type="button" onClick={() => setOpen(!open)}
                    aria-label={open ? "Hide Murza's tip" : "Show Murza's tip"} aria-expanded={open}>
                {!open && <span className="murza-guide-hint">Ask Murza</span>}
                <img src="/images/murza-mascot.webp" alt=""/>
            </button>
        </aside>
    );
};
export default MurzaGuide;
