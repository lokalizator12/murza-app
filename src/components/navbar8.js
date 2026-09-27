import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {appDestination} from '../services/routeAccess';
import './navbar8.css';

const Navbar8 = () => {
    const {isAuthenticated, userLocal, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const location = useLocation();
    const profileId = userLocal || localStorage.getItem('currentUserId');

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        const updateCount = () => setUnreadCount(Number(localStorage.getItem('currentCountMessages')) || 0);
        updateCount();
        window.addEventListener('storage', updateCount);
        window.addEventListener('focus', updateCount);
        return () => {
            window.removeEventListener('storage', updateCount);
            window.removeEventListener('focus', updateCount);
        };
    }, []);

    return (
        <header className="murza-nav">
            <div className="murza-container murza-nav-inner">
                <Link className="murza-nav-brand" to="/" aria-label="Murza home">
                    <img src="/logo-1500h.png" alt="Murza"/>
                </Link>
                <button className="murza-menu-toggle" type="button"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
                        aria-controls="murza-navigation" onClick={() => setMenuOpen(!menuOpen)}>
                    <span/><span/><span/>
                </button>
                <nav id="murza-navigation" className={`murza-nav-links ${menuOpen ? 'is-open' : ''}`}
                     aria-label="Main navigation">
                    <Link to={appDestination('/main?type=trip', isAuthenticated)}>Find a trip</Link>
                    <Link to={appDestination('/main?type=parcel', isAuthenticated)}>Find a parcel</Link>
                    <Link to="/about">How it works</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/inbox">Messages{unreadCount > 0 && <span className="murza-unread">{unreadCount}</span>}</Link>
                            {profileId && <Link to={`/profile/${profileId}`}>My profile</Link>}
                            <button className="murza-nav-logout" type="button" onClick={logout}>Log out</button>
                            <Link className="murza-button murza-button-small" to="/main?create=parcel">Post a parcel</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Log in</Link>
                            <Link className="murza-button murza-button-small" to="/register">Join Murza</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar8;
