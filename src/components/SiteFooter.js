import React from 'react';
import {Link} from 'react-router-dom';

const SiteFooter = () => (
    <footer className="murza-footer">
        <div className="murza-container murza-footer-inner">
            <div className="murza-footer-brand">
                <Link to="/" aria-label="Murza home"><img src="/logo-1500h.png" alt="Murza"/></Link>
                <p>A place for parcels and people already on the move.</p>
            </div>
            <nav aria-label="Footer navigation">
                <Link to="/about">About Murza</Link>
                <Link to="/legal">Service information</Link>
                <Link to="/register">Create an account</Link>
            </nav>
            <span className="murza-footer-note">© {new Date().getFullYear()} Murza</span>
        </div>
    </footer>
);

export default SiteFooter;
