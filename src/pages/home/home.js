import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {appDestination} from '../../services/routeAccess';
import SiteFooter from '../../components/SiteFooter';
import './home.css';

const stories = [
    {
        image: '/images/murza-parcel-city.webp',
        alt: 'Illustrated Siamese cat resting on a parcel above a city route',
        label: 'For senders',
        title: 'A parcel with somewhere to go',
        copy: 'Post your route, dates and parcel details so a traveller can find you.'
    },
    {
        image: '/images/murza-trip.webp',
        alt: 'Illustrated Siamese cat beside a parcel and route map in a car',
        label: 'For travellers',
        title: 'Going that way anyway?',
        copy: 'Share your journey and the space you can offer.'
    },
    {
        image: '/images/murza-delivery.webp',
        alt: 'Illustrated Siamese cat welcoming a parcel at a front door',
        label: 'For the connection',
        title: 'Make the next move together',
        copy: 'Find a match on the map, then agree the details in messages.'
    }
];

const steps = [
    ['01', 'Choose your side', 'Look for a trip that fits your parcel, or browse parcels along your route.'],
    ['02', 'Share the details', 'Post pickup and destination points, dates and the information someone needs to decide.'],
    ['03', 'Talk it through', 'Open a profile and message the other person to arrange the handoff.']
];

const Home = () => {
    const {isAuthenticated} = useAuth();
    const [activeSlide, setActiveSlide] = useState(0);
    const [paused, setPaused] = useState(false);
    const nextSlide = () => setActiveSlide(index => (index + 1) % stories.length);
    const previousSlide = () => setActiveSlide(index => (index - 1 + stories.length) % stories.length);

    useEffect(() => {
        if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        const timer = window.setInterval(() => setActiveSlide(index => (index + 1) % stories.length), 6000);
        return () => window.clearInterval(timer);
    }, [paused]);

    return (
        <div className="murza-home">
            <Helmet>
                <title>Murza — parcels meet people on the move</title>
                <meta name="description" content="Find a trip for your parcel or share your journey with someone who needs to send one. Explore requests and connect on Murza."/>
                <meta property="og:title" content="Murza — parcels meet people on the move"/>
            </Helmet>
            <main>
                <section className="murza-hero">
                    <div className="murza-container murza-hero-grid">
                        <div className="murza-hero-copy">
                            <span className="murza-eyebrow">A little help along the way</span>
                            <h1>Every parcel has a route. <em>Murza finds the connection.</em></h1>
                            <p>Bring a parcel and a traveller together. Explore journeys, share yours and arrange the details directly with another person.</p>
                            <div className="murza-hero-actions">
                                <Link className="murza-button" to={appDestination('/main?type=trip', isAuthenticated)}>Find a trip <span aria-hidden="true">↗</span></Link>
                                <Link className="murza-button murza-button-outline" to={appDestination('/main?type=parcel', isAuthenticated)}>Browse parcels</Link>
                            </div>
                            <div className="murza-guide"><img className="murza-guide-mascot" src="/images/murza-mascot.webp" alt="" aria-hidden="true"/><span><strong>Meet Murza</strong><br/>Your curious companion for the journey.</span></div>
                        </div>
                        <div className="murza-carousel" role="region" aria-roledescription="carousel"
                             aria-label="Ways to use Murza" onMouseEnter={() => setPaused(true)}
                             onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}
                             onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
                            <div className="murza-carousel-images">
                                {stories.map((story, index) => (
                                    <img key={story.image} src={story.image} alt={story.alt}
                                         className={index === activeSlide ? 'is-active' : ''}
                                         aria-hidden={index !== activeSlide} loading={index === 0 ? 'eager' : 'lazy'}/>
                                ))}
                            </div>
                            <div className="murza-carousel-caption" aria-live="polite">
                                <span>{stories[activeSlide].label}</span>
                                <h2>{stories[activeSlide].title}</h2>
                                <p>{stories[activeSlide].copy}</p>
                            </div>
                            <div className="murza-carousel-controls">
                                <button type="button" onClick={previousSlide} aria-label="Previous story">←</button>
                                <div className="murza-carousel-dots" aria-label="Choose a story">
                                    {stories.map((story, index) => (
                                        <button key={story.image} type="button" className={index === activeSlide ? 'is-active' : ''}
                                                onClick={() => setActiveSlide(index)} aria-label={`Show story ${index + 1}`}
                                                aria-current={index === activeSlide ? 'true' : undefined}/>
                                    ))}
                                </div>
                                <button type="button" onClick={nextSlide} aria-label="Next story">→</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="murza-intro murza-container" id="how-it-works">
                    <span className="murza-eyebrow">How Murza works</span>
                    <h2>One map. Two ways to help a parcel move.</h2>
                    <p>Murza is a meeting place for people sending parcels and people making trips. You choose who to contact and arrange the handoff together.</p>
                    <div className="murza-steps">
                        {steps.map(([number, title, copy]) => (
                            <article className="murza-step" key={number}>
                                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="murza-paths">
                    <div className="murza-container murza-path-grid">
                        <article className="murza-path-card">
                            <div className="murza-path-image"><img src="/images/murza-parcel-city.webp" alt="Murza the Siamese cat with a parcel" loading="lazy"/></div>
                            <div><span className="murza-eyebrow">I have a parcel</span><h2>Find its next route.</h2>
                                <p>See trips that could work for your pickup and destination, or post a parcel request with the details travellers need.</p>
                                <div className="murza-path-actions">
                                    <Link className="murza-button" to={appDestination('/main?type=trip', isAuthenticated)}>Explore trips</Link>
                                    <Link className="murza-text-link" to={appDestination('/main?create=parcel', isAuthenticated)}>Post a parcel ↗</Link>
                                </div>
                            </div>
                        </article>
                        <article className="murza-path-card">
                            <div className="murza-path-image"><img src="/images/murza-trip.webp" alt="Murza the Siamese cat on a journey" loading="lazy"/></div>
                            <div><span className="murza-eyebrow">I am travelling</span><h2>Make room for something good.</h2>
                                <p>Browse parcels going your way, or post your trip so senders can find you.</p>
                                <div className="murza-path-actions">
                                    <Link className="murza-button" to={appDestination('/main?type=parcel', isAuthenticated)}>Explore parcels</Link>
                                    <Link className="murza-text-link" to={appDestination('/main?create=trip', isAuthenticated)}>Post a trip ↗</Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="murza-faq murza-container" id="faq">
                    <div><span className="murza-eyebrow">Good to know</span><h2>A few things Murza would tell you.</h2>
                        <p>Clear expectations make a better journey for everyone.</p></div>
                    <div className="murza-faq-list">
                        <details><summary>Do I need an account?</summary><p>Yes. Sign in to browse requests, create your own and message other members.</p></details>
                        <details><summary>Can I follow a parcel live?</summary><p>Murza shows posted routes and locations on a map. Live parcel tracking is not available.</p></details>
                        <details><summary>How do payment and delivery work?</summary><p>Murza helps you meet and talk. Agree the price, handoff and delivery details directly with the other person before sending anything. Murza does not process payments.</p></details>
                        <details><summary>What should I check before agreeing?</summary><p>Read the request carefully, check the profile and use messages to confirm dates, addresses, parcel contents and price.</p></details>
                    </div>
                </section>

                <section className="murza-last-call murza-container">
                    <div><span className="murza-eyebrow">Ready when you are</span><h2>There is always another way forward.</h2>
                        <p>Join Murza to explore the map and make your first connection.</p></div>
                    <Link className="murza-button" to={isAuthenticated ? '/main' : '/register'}>{isAuthenticated ? 'Open the map' : 'Join Murza'} <span aria-hidden="true">↗</span></Link>
                </section>
            </main>
            <SiteFooter/>
        </div>
    );
};

export default Home;
