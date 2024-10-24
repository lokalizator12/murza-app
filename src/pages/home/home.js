import React, {Fragment} from 'react'

import {Helmet} from 'react-helmet'

import Navbar8 from '../../components/navbar8'
import Hero11 from '../../components/hero11'
import Features24 from '../../components/features24'
import CTA26 from '../../components/cta26'
import CTA261 from '../../components/cta261'
import Features25 from '../../components/features25'
import FAQ141 from '../../components/faq141'
import Steps21 from '../../components/steps21'
import Testimonial17 from '../../components/testimonial17'
import Contact11 from '../../components/contact11'
import Footer15 from '../../components/footer15'
import './home.css'

const Home = (props) => {
    return (
        <div className="home-container">
            <Helmet>
                <title>Murza</title>
                <meta property="og:title" content="Apprehensive Euphoric Hamster"/>
            </Helmet>
            <Navbar8
                link1={
                    <Fragment>
                        <span className="home-text10 thq-body-small thq-link">Login</span>
                    </Fragment>
                }
                link2={
                    <Fragment>
            <span className="home-text11 thq-body-small thq-link">
              Register
            </span>
                    </Fragment>
                }
                link3={
                    <Fragment>
            <span className="home-text12 thq-body-small thq-link">
              Find a Driver
            </span>
                    </Fragment>
                }
                link4={
                    <Fragment>
            <span className="home-text13 thq-body-small thq-link">
              Find a Parcel
            </span>
                    </Fragment>
                }
                page1={
                    <Fragment>
                        <span className="home-text14 thq-body-large">Login</span>
                    </Fragment>
                }
                page2={
                    <Fragment>
                        <span className="home-text15 thq-body-large">Register</span>
                    </Fragment>
                }
                page3={
                    <Fragment>
                        <span className="home-text16 thq-body-large">Find a Driver</span>
                    </Fragment>
                }
                page4={
                    <Fragment>
                        <span className="home-text17 thq-body-large">Find a Parcel</span>
                    </Fragment>
                }
                link31={
                    <Fragment>
            <span className="home-text18 thq-body-small thq-link">
              <span>About us</span>
              <br></br>
            </span>
                    </Fragment>
                }
                action1={
                    <Fragment>
            <span className="home-text21">
              <span>Sign in</span>
              <br></br>
            </span>
                    </Fragment>
                }
                action2={
                    <Fragment>
            <span className="home-text24">
              <span>Sign up</span>
              <br></br>
            </span>
                    </Fragment>
                }
                logoSrc="/logo-1500h.png"
                rootClassName="navbar8root-class-name"
                page1Description={
                    <Fragment>
            <span className="home-text27 thq-body-small">
              Log in to your account
            </span>
                    </Fragment>
                }
                page2Description={
                    <Fragment>
            <span className="home-text28 thq-body-small">
              Create a new account
            </span>
                    </Fragment>
                }
                page3Description={
                    <Fragment>
            <span className="home-text29 thq-body-small">
              Search for available drivers
            </span>
                    </Fragment>
                }
                page4Description={
                    <Fragment>
            <span className="home-text30 thq-body-small">
              Search for available parcels
            </span>
                    </Fragment>
                }
            ></Navbar8>
            <Hero11
                action1={
                    <Fragment>
            <span className="home-text31 thq-body-small">
              <span>Find parcel</span>
              <br></br>
            </span>
                    </Fragment>
                }
                action2={
                    <Fragment>
            <span className="home-text34 thq-body-small">
              <span>Find driver</span>
              <br></br>
            </span>
                    </Fragment>
                }
                content1={
                    <Fragment>
                        <span className="home-text37 thq-body-large">Default value</span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="home-text38 thq-heading-1">Default value</span>
                    </Fragment>
                }
            ></Hero11>
            <Features24
                feature1Title={
                    <Fragment>
                        <span className="home-text39 thq-heading-2">Find a Driver</span>
                    </Fragment>
                }
                feature2Title={
                    <Fragment>
                        <span className="home-text40 thq-heading-2">Interactive Map</span>
                    </Fragment>
                }
                feature3Title={
                    <Fragment>
                        <span className="home-text41 thq-heading-2">Search and Filter</span>
                    </Fragment>
                }
                feature1Description={
                    <Fragment>
            <span className="home-text42 thq-body-small">
              Quickly search for drivers who can deliver your parcel to its
              destination with our user-friendly platform.
            </span>
                    </Fragment>
                }
                feature2Description={
                    <Fragment>
            <span className="home-text43 thq-body-small">
              Easily locate available drivers and parcels on the interactive map
              for real-time tracking and delivery updates.
            </span>
                    </Fragment>
                }
                feature3Description={
                    <Fragment>
            <span className="home-text44 thq-body-small">
              Filter drivers and parcels by destination, size, and date to find
              the perfect match for your delivery needs.
            </span>
                    </Fragment>
                }
            ></Features24>
            <CTA26
                action1={
                    <Fragment>
                        <span className="home-text45">Find a Driver</span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="home-text46 thq-body-large">
              Find a driver to deliver your parcel quickly and securely.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
            <span className="home-text47 thq-heading-2">
              Need a Parcel Delivered?
            </span>
                    </Fragment>
                }
            ></CTA26>
            <CTA261
                action1={
                    <Fragment>
            <span className="home-text48">
              <span>Find a Parcel</span>
              <br></br>
            </span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="home-text51 thq-body-large">
              Join our platform today to experience seamless parcel deliveries
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
            <span className="home-text52 thq-heading-2">
              Start sending and receiving parcels with ease
            </span>
                    </Fragment>
                }
            ></CTA261>
            <Features25
                feature1Title={
                    <Fragment>
                        <span className="home-text53 thq-heading-2">Find a Driver</span>
                    </Fragment>
                }
                feature2Title={
                    <Fragment>
                        <span className="home-text54 thq-heading-2">Find a Parcel</span>
                    </Fragment>
                }
                feature3Title={
                    <Fragment>
                        <span className="home-text55 thq-heading-2">Interactive Map</span>
                    </Fragment>
                }
                feature1ImgSrc="https://images.unsplash.com/photo-1728327510029-c7358ff50e4f?ixid=M3w5MTMyMXwwfDF8YWxsfDU1fHx8fHx8fHwxNzI5NzA4MzgwfA&amp;ixlib=rb-4.0.3&amp;w=1500"
                feature1Description={
                    <Fragment>
            <span className="home-text56 thq-body-small">
              Easily locate a driver to deliver your parcel with just a few
              clicks.
            </span>
                    </Fragment>
                }
                feature2Description={
                    <Fragment>
            <span className="home-text57 thq-body-small">
              Search for available parcels that need to be delivered to your
              desired destination.
            </span>
                    </Fragment>
                }
                feature3Description={
                    <Fragment>
            <span className="home-text58 thq-body-small">
              Track the real-time locations of drivers and parcels on an
              interactive map for efficient delivery.
            </span>
                    </Fragment>
                }
            ></Features25>
            <FAQ141
                action1={
                    <Fragment>
                        <span className="home-text59">Contact</span>
                    </Fragment>
                }
                action2={
                    <Fragment>
                        <span className="home-text60">Email us</span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="home-text61 thq-body-large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </span>
                    </Fragment>
                }
                content2={
                    <Fragment>
            <span className="home-text62 thq-body-large">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <span
                    dangerouslySetInnerHTML={{
                        __html: ' ',
                    }}
                />
              </span>
              <span>
                <span
                    dangerouslySetInnerHTML={{
                        __html: ' ',
                    }}
                />
              </span>
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="home-text65 thq-heading-2">FAQs</span>
                    </Fragment>
                }
                heading2={
                    <Fragment>
            <span className="home-text66 thq-heading-2">
              Still have a question?
            </span>
                    </Fragment>
                }
                faq1Question={
                    <Fragment>
            <span className="home-text67 thq-body-large">
              How can I find a driver to deliver my parcel?
            </span>
                    </Fragment>
                }
                faq2Question={
                    <Fragment>
            <span className="home-text68 thq-body-large">
              Can I track my parcel in real-time?
            </span>
                    </Fragment>
                }
                faq3Question={
                    <Fragment>
            <span className="home-text69 thq-body-large">
              What pricing plans do you offer?
            </span>
                    </Fragment>
                }
                faq4Question={
                    <Fragment>
            <span className="home-text70 thq-body-large">
              How can I trust the drivers on your platform?
            </span>
                    </Fragment>
                }
                faq5Question={
                    <Fragment>
            <span className="home-text71 thq-body-large">
              Can I read testimonials from other users?
            </span>
                    </Fragment>
                }
            ></FAQ141>
            <Steps21
                step1Title={
                    <Fragment>
                        <span className="home-text72 thq-heading-2">Default value</span>
                    </Fragment>
                }
                step2Title={
                    <Fragment>
                        <span className="home-text73 thq-heading-2">Default value</span>
                    </Fragment>
                }
                step3Title={
                    <Fragment>
                        <span className="home-text74 thq-heading-2">Default value</span>
                    </Fragment>
                }
                step4Title={
                    <Fragment>
                        <span className="home-text75 thq-heading-2">Default value</span>
                    </Fragment>
                }
                step1Description={
                    <Fragment>
                        <span className="home-text76 thq-body-small">Default value</span>
                    </Fragment>
                }
                step2Description={
                    <Fragment>
                        <span className="home-text77 thq-body-small">Default value</span>
                    </Fragment>
                }
                step3Description={
                    <Fragment>
                        <span className="home-text78 thq-body-small">Default value</span>
                    </Fragment>
                }
                step4Description={
                    <Fragment>
                        <span className="home-text79 thq-body-small">Default value</span>
                    </Fragment>
                }
            ></Steps21>
            <Testimonial17
                review1={
                    <Fragment>
            <span className="home-text80 thq-body-small">
              I needed to send an urgent parcel, and within minutes I found a
              reliable driver through this platform. Highly recommended!
            </span>
                    </Fragment>
                }
                review2={
                    <Fragment>
            <span className="home-text81 thq-body-small">
              As a small business owner, I rely on this service to deliver my
              products to customers efficiently. It has never let me down.
            </span>
                    </Fragment>
                }
                review3={
                    <Fragment>
            <span className="home-text82 thq-body-small">
              I use this platform regularly to earn extra income by delivering
              parcels in my free time. It&apos;s easy to use and pays well.
            </span>
                    </Fragment>
                }
                review4={
                    <Fragment>
            <span className="home-text83 thq-body-small">
              Being retired, I enjoy the flexibility of choosing when and where
              to deliver parcels. This platform has been a great source of
              income for me.
            </span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="home-text84 thq-body-small">
              Read what our users have to say about their experience with our
              parcel delivery platform.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="home-text85 thq-heading-2">Testimonials</span>
                    </Fragment>
                }
                author1Name={
                    <Fragment>
                        <span className="home-text86 thq-body-large">Alice Johnson</span>
                    </Fragment>
                }
                author2Name={
                    <Fragment>
                        <span className="home-text87 thq-body-large">Bob Smith</span>
                    </Fragment>
                }
                author3Name={
                    <Fragment>
                        <span className="home-text88 thq-body-large">Emily Davis</span>
                    </Fragment>
                }
                author4Name={
                    <Fragment>
                        <span className="home-text89 thq-body-large">David Lee</span>
                    </Fragment>
                }
                author1Position={
                    <Fragment>
                        <span className="home-text90 thq-body-small">Freelancer</span>
                    </Fragment>
                }
                author2Position={
                    <Fragment>
            <span className="home-text91 thq-body-small">
              Small Business Owner
            </span>
                    </Fragment>
                }
                author3Position={
                    <Fragment>
                        <span className="home-text92 thq-body-small">Student</span>
                    </Fragment>
                }
                author4Position={
                    <Fragment>
                        <span className="home-text93 thq-body-small">Retiree</span>
                    </Fragment>
                }
            ></Testimonial17>
            <Contact11
                email={
                    <Fragment>
            <span className="home-text94 thq-body-small">
              hello@teleporthq.io
            </span>
                    </Fragment>
                }
                phone1={
                    <Fragment>
            <span className="home-text95 thq-body-small">
              +1 (555) 000-0000
            </span>
                    </Fragment>
                }
                address1={
                    <Fragment>
            <span className="home-text96 thq-body-small">
              456 Test Ave, Bucharest
            </span>
                    </Fragment>
                }
                content1={
                    <Fragment>
                        <span className="home-text97 thq-body-large">Default value</span>
                    </Fragment>
                }
                content2={
                    <Fragment>
            <span className="home-text98 thq-body-large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
                    </Fragment>
                }
                content3={
                    <Fragment>
            <span className="home-text99 thq-body-large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
                    </Fragment>
                }
                content5={
                    <Fragment>
            <span className="home-text100 thq-body-large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in ero.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="home-text101 thq-heading-2">Default value</span>
                    </Fragment>
                }
            ></Contact11>
            <Footer15
                action1={
                    <Fragment>
                        <span className="home-text102 thq-body-small">Contact Us</span>
                    </Fragment>
                }
                logoSrc="/logo-1500h.png"
                content1={
                    <Fragment>
            <span className="home-text103 thq-body-small">
              Terms of Service
            </span>
                    </Fragment>
                }
                content2={
                    <Fragment>
                        <span className="home-text104 thq-body-small">Privacy Policy</span>
                    </Fragment>
                }
                copyright={
                    <Fragment>
            <span className="home-text105 thq-body-small">
              © 2023 TeleportHQ. All rights reserved.
            </span>
                    </Fragment>
                }
                termsLink={
                    <Fragment>
                        <span className="home-text106 thq-body-small">Default value</span>
                    </Fragment>
                }
                cookiesLink={
                    <Fragment>
                        <span className="home-text107 thq-body-small">Default value</span>
                    </Fragment>
                }
                privacyLink={
                    <Fragment>
                        <span className="home-text108 thq-body-small">Default value</span>
                    </Fragment>
                }
            ></Footer15>
        </div>
    )
}

export default Home
