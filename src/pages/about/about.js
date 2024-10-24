import React, {Fragment} from 'react'

import {Helmet} from 'react-helmet'

import Navbar8 from '../../components/navbar8'
import Features16 from '../../components/features16'
import Stats8 from '../../components/stats8'
import Features22 from '../../components/features22'
import Timeline3 from '../../components/timeline3'
import Team14 from '../../components/team14'
import Contact111 from '../../components/contact111'
import CTA15 from '../../components/cta15'
import Footer10 from '../../components/footer10'
import './about.css'

const About = (props) => {
    return (
        <div className="about-container">
            <Helmet>
                <title>About - Apprehensive Euphoric Hamster</title>
                <meta
                    property="og:title"
                    content="About - Apprehensive Euphoric Hamster"
                />
            </Helmet>
            <Navbar8
                link1={
                    <Fragment>
                        <span className="about-text100 thq-body-small thq-link">Login</span>
                    </Fragment>
                }
                link2={
                    <Fragment>
            <span className="about-text101 thq-body-small thq-link">
              Register
            </span>
                    </Fragment>
                }
                link3={
                    <Fragment>
            <span className="about-text102 thq-body-small thq-link">
              Find a Driver
            </span>
                    </Fragment>
                }
                link4={
                    <Fragment>
            <span className="about-text103 thq-body-small thq-link">
              Find a Parcel
            </span>
                    </Fragment>
                }
                page1={
                    <Fragment>
                        <span className="about-text104 thq-body-large">Login</span>
                    </Fragment>
                }
                page2={
                    <Fragment>
                        <span className="about-text105 thq-body-large">Register</span>
                    </Fragment>
                }
                page3={
                    <Fragment>
                        <span className="about-text106 thq-body-large">Find a Driver</span>
                    </Fragment>
                }
                page4={
                    <Fragment>
                        <span className="about-text107 thq-body-large">Find a Parcel</span>
                    </Fragment>
                }
                link31={
                    <Fragment>
            <span className="about-text108 thq-body-small thq-link">
              <span>About us</span>
              <br></br>
            </span>
                    </Fragment>
                }
                action1={
                    <Fragment>
            <span className="about-text111">
              <span>Login</span>
              <br></br>
            </span>
                    </Fragment>
                }
                action2={
                    <Fragment>
            <span className="about-text114">
              <span>Registration</span>
              <br></br>
            </span>
                    </Fragment>
                }
                logoSrc="/logo-1500h.png"
                rootClassName="navbar8root-class-name1"
                page1Description={
                    <Fragment>
            <span className="about-text117 thq-body-small">
              Log in to your account
            </span>
                    </Fragment>
                }
                page2Description={
                    <Fragment>
            <span className="about-text118 thq-body-small">
              Create a new account
            </span>
                    </Fragment>
                }
                page3Description={
                    <Fragment>
            <span className="about-text119 thq-body-small">
              Search for available drivers
            </span>
                    </Fragment>
                }
                page4Description={
                    <Fragment>
            <span className="about-text120 thq-body-small">
              Search for available parcels
            </span>
                    </Fragment>
                }
            ></Navbar8>
            <Features16
                slogan1={
                    <Fragment>
                        <span className="about-text121 thq-body-small">Slogan</span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="about-text122 thq-body-large">
              Our platform connects users with drivers for quick and secure
              deliveries.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
            <span className="about-text123 thq-heading-2">
              Efficient Parcel Delivery
            </span>
                    </Fragment>
                }
                feature1Title={
                    <Fragment>
            <span className="about-text124 thq-heading-3">
              Real-time Tracking
            </span>
                    </Fragment>
                }
                feature2Title={
                    <Fragment>
            <span className="about-text125 thq-heading-3">
              Flexible Pricing Plans
            </span>
                    </Fragment>
                }
                feature3Title={
                    <Fragment>
                        <span className="about-text126 thq-heading-3">Driver Search</span>
                    </Fragment>
                }
                feature1Description={
                    <Fragment>
            <span className="about-text127 thq-body-small">
              Track your parcel every step of the way to ensure its safe
              delivery.
            </span>
                    </Fragment>
                }
                feature2Description={
                    <Fragment>
            <span className="about-text128 thq-body-small">
              Choose from a variety of pricing plans that suit your delivery
              needs.
            </span>
                    </Fragment>
                }
                feature3Description={
                    <Fragment>
            <span className="about-text129 thq-body-small">
              Search and select drivers based on your preferences for
              personalized service.
            </span>
                    </Fragment>
                }
            ></Features16>
            <Stats8
                stat1={
                    <Fragment>
                        <span className="about-text130 thq-heading-2">98%</span>
                    </Fragment>
                }
                stat2={
                    <Fragment>
                        <span className="about-text131 thq-heading-2">24/7</span>
                    </Fragment>
                }
                stat3={
                    <Fragment>
                        <span className="about-text132 thq-heading-2">4.9/5</span>
                    </Fragment>
                }
                stat4={
                    <Fragment>
                        <span className="about-text133 thq-heading-2">$1M+</span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="about-text134 thq-body-small">
              Join us now for a seamless delivery experience!
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="about-text135 thq-heading-2">Our Stats</span>
                    </Fragment>
                }
                stat2Description={
                    <Fragment>
            <span className="about-text136 thq-body-large">
              Customer support available around the clock
            </span>
                    </Fragment>
                }
                stat3Description={
                    <Fragment>
            <span className="about-text137 thq-body-large">
              Average rating given by our users
            </span>
                    </Fragment>
                }
                stat4Description={
                    <Fragment>
            <span className="about-text138 thq-body-large">
              Total value of transactions processed through our platform
            </span>
                    </Fragment>
                }
                stat1ShortDescription={
                    <Fragment>
            <span className="about-text139 thq-body-small">
              On-time deliveries
            </span>
                    </Fragment>
                }
                stat2ShortDescription={
                    <Fragment>
                        <span className="about-text140 thq-body-small">Support</span>
                    </Fragment>
                }
                stat3ShortDescription={
                    <Fragment>
            <span className="about-text141 thq-body-small">
              Customer Rating
            </span>
                    </Fragment>
                }
                stat4ShortDescription={
                    <Fragment>
            <span className="about-text142 thq-body-small">
              Transactions Handled
            </span>
                    </Fragment>
                }
            ></Stats8>
            <Features22
                content1={
                    <Fragment>
            <span className="about-text143 thq-body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="about-text144 thq-heading-2">Features</span>
                    </Fragment>
                }
                feature1Title={
                    <Fragment>
            <span className="about-text145 thq-heading-2">
              Real-Time Tracking
            </span>
                    </Fragment>
                }
                feature2Title={
                    <Fragment>
            <span className="about-text146 thq-heading-2">
              Driver Connection
            </span>
                    </Fragment>
                }
                feature3Title={
                    <Fragment>
                        <span className="about-text147 thq-heading-2">Testimonials</span>
                    </Fragment>
                }
                feature4Title={
                    <Fragment>
                        <span className="about-text148 thq-heading-2">Feature #4</span>
                    </Fragment>
                }
                feature5Title={
                    <Fragment>
                        <span className="about-text149 thq-heading-2">Feature #5</span>
                    </Fragment>
                }
                feature6Title={
                    <Fragment>
                        <span className="about-text150 thq-heading-2">Feature #6</span>
                    </Fragment>
                }
                feature7Title={
                    <Fragment>
                        <span className="about-text151 thq-heading-2">Feature #7</span>
                    </Fragment>
                }
                feature8Title={
                    <Fragment>
                        <span className="about-text152 thq-heading-2">Feature #8</span>
                    </Fragment>
                }
                feature1Description={
                    <Fragment>
            <span className="about-text153 thq-body-small">
              Track your parcel in real-time on an interactive map to know
              exactly where it is at all times.
            </span>
                    </Fragment>
                }
                feature2Description={
                    <Fragment>
            <span className="about-text154 thq-body-small">
              Connect with reliable drivers for seamless parcel delivery
              services.
            </span>
                    </Fragment>
                }
                feature3Description={
                    <Fragment>
            <span className="about-text155 thq-body-small">
              Read testimonials from satisfied users who have experienced our
              efficient delivery services.
            </span>
                    </Fragment>
                }
                feature4Description={
                    <Fragment>
            <span className="about-text156 thq-body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </span>
                    </Fragment>
                }
                feature5Description={
                    <Fragment>
            <span className="about-text157 thq-body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </span>
                    </Fragment>
                }
                feature6Description={
                    <Fragment>
            <span className="about-text158 thq-body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </span>
                    </Fragment>
                }
                feature7Description={
                    <Fragment>
            <span className="about-text159 thq-body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </span>
                    </Fragment>
                }
                feature8Description={
                    <Fragment>
            <span className="about-text160 thq-body-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </span>
                    </Fragment>
                }
            ></Features22>
            <Timeline3
                title1={
                    <Fragment>
                        <span className="about-text161 thq-heading-2">Timeline</span>
                    </Fragment>
                }
                action1={
                    <Fragment>
                        <span className="about-text162">Learn More</span>
                    </Fragment>
                }
                action2={
                    <Fragment>
                        <span className="about-text163">Sign Up</span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="about-text164 thq-body-small">Our Journey</span>
                    </Fragment>
                }
                card1Date={
                    <Fragment>
                        <span className="about-text165 thq-heading-3">January 2020</span>
                    </Fragment>
                }
                card2Date={
                    <Fragment>
                        <span className="about-text166 thq-heading-3">March 2020</span>
                    </Fragment>
                }
                card3Date={
                    <Fragment>
                        <span className="about-text167 thq-heading-3">June 2020</span>
                    </Fragment>
                }
                card4Date={
                    <Fragment>
                        <span className="about-text168 thq-heading-3">September 2020</span>
                    </Fragment>
                }
                card5Date={
                    <Fragment>
                        <span className="about-text169 thq-heading-3">December 2020</span>
                    </Fragment>
                }
                card1Content={
                    <Fragment>
            <span className="about-text170 thq-body-small">
              Platform development started
            </span>
                    </Fragment>
                }
                card2Content={
                    <Fragment>
            <span className="about-text171 thq-body-small">
              First successful delivery completed
            </span>
                    </Fragment>
                }
                card3Content={
                    <Fragment>
            <span className="about-text172 thq-body-small">
              Reached 1000 registered users
            </span>
                    </Fragment>
                }
                card4Content={
                    <Fragment>
            <span className="about-text173 thq-body-small">
              Expanded services to neighboring cities
            </span>
                    </Fragment>
                }
                card5Content={
                    <Fragment>
            <span className="about-text174 thq-body-small">
              Celebrated one year anniversary
            </span>
                    </Fragment>
                }
            ></Timeline3>
            <Team14
                member1={
                    <Fragment>
                        <span className="about-text175 thq-body-small">Alice Smith</span>
                    </Fragment>
                }
                member2={
                    <Fragment>
                        <span className="about-text176 thq-body-small">John Doe</span>
                    </Fragment>
                }
                member3={
                    <Fragment>
                        <span className="about-text177 thq-body-small">Emily Brown</span>
                    </Fragment>
                }
                member4={
                    <Fragment>
                        <span className="about-text178 thq-body-small">David Lee</span>
                    </Fragment>
                }
                member5={
                    <Fragment>
                        <span className="about-text179 thq-body-small">Sarah Johnson</span>
                    </Fragment>
                }
                member6={
                    <Fragment>
                        <span className="about-text180 thq-body-small">Michael Wang</span>
                    </Fragment>
                }
                member7={
                    <Fragment>
                        <span className="about-text181 thq-body-small">Olivia Garcia</span>
                    </Fragment>
                }
                member8={
                    <Fragment>
                        <span className="about-text182 thq-body-small">Daniel Kim</span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="about-text183 thq-body-small">
              Join our team and make a difference in your career!
            </span>
                    </Fragment>
                }
                content2={
                    <Fragment>
            <span className="about-text184 thq-body-large">
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
                        <span className="about-text187 thq-heading-2">Meet our team</span>
                    </Fragment>
                }
                member1Job={
                    <Fragment>
            <span className="about-text188 thq-body-small">
              Co-Founder &amp; CEO
            </span>
                    </Fragment>
                }
                member2Job={
                    <Fragment>
            <span className="about-text189 thq-body-small">
              Head of Operations
            </span>
                    </Fragment>
                }
                member3Job={
                    <Fragment>
            <span className="about-text190 thq-body-small">
              Customer Relations Manager
            </span>
                    </Fragment>
                }
                member4Job={
                    <Fragment>
                        <span className="about-text191 thq-body-small">Lead Developer</span>
                    </Fragment>
                }
                member5Job={
                    <Fragment>
            <span className="about-text192 thq-body-small">
              Marketing Specialist
            </span>
                    </Fragment>
                }
                member6Job={
                    <Fragment>
            <span className="about-text193 thq-body-small">
              Finance Manager
            </span>
                    </Fragment>
                }
                member7Job={
                    <Fragment>
            <span className="about-text194 thq-body-small">
              Quality Assurance Lead
            </span>
                    </Fragment>
                }
                member8Job={
                    <Fragment>
            <span className="about-text195 thq-body-small">
              Business Development Manager
            </span>
                    </Fragment>
                }
                actionContent={
                    <Fragment>
                        <span className="about-text196 thq-body-small">Open positions</span>
                    </Fragment>
                }
                member1Content={
                    <Fragment>
            <span className="about-text197 thq-body-small">
              Alice is a visionary leader with a passion for innovation and
              customer satisfaction.
            </span>
                    </Fragment>
                }
                member2Content={
                    <Fragment>
            <span className="about-text198 thq-body-small">
              John ensures smooth operations and efficient delivery processes.
            </span>
                    </Fragment>
                }
                member3Content={
                    <Fragment>
            <span className="about-text199 thq-body-small">
              Emily focuses on building strong relationships with our users and
              drivers.
            </span>
                    </Fragment>
                }
                member4Content={
                    <Fragment>
            <span className="about-text200 thq-body-small">
              David leads the tech team in creating cutting-edge solutions for
              our platform.
            </span>
                    </Fragment>
                }
                member5Content={
                    <Fragment>
            <span className="about-text201 thq-body-small">
              Sarah drives our marketing efforts to reach more users and
              drivers.
            </span>
                    </Fragment>
                }
                member6Content={
                    <Fragment>
            <span className="about-text202 thq-body-small">
              Michael ensures the financial stability and growth of our
              platform.
            </span>
                    </Fragment>
                }
                member7Content={
                    <Fragment>
            <span className="about-text203 thq-body-small">
              Olivia guarantees the quality and security of every delivery made
              through our platform.
            </span>
                    </Fragment>
                }
                member8Content={
                    <Fragment>
            <span className="about-text204 thq-body-small">
              Daniel explores new partnerships and opportunities to expand our
              platform.
            </span>
                    </Fragment>
                }
            ></Team14>
            <Contact111
                email={
                    <Fragment>
            <span className="about-text205 thq-body-small">
              support@parcelconnect.com
            </span>
                    </Fragment>
                }
                phone1={
                    <Fragment>
                        <span className="about-text206 thq-body-small">+123-456-7890</span>
                    </Fragment>
                }
                address1={
                    <Fragment>
            <span className="about-text207 thq-body-small">
              123 Main Street, City, Country
            </span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="about-text208 thq-body-large">
              Have a question or need support? Reach out to us!
            </span>
                    </Fragment>
                }
                content2={
                    <Fragment>
            <span className="about-text209 thq-body-large">
              Our team is here to assist you.
            </span>
                    </Fragment>
                }
                content3={
                    <Fragment>
            <span className="about-text210 thq-body-large">
              Feel free to contact us via email or phone for any inquiries.
            </span>
                    </Fragment>
                }
                content5={
                    <Fragment>
            <span className="about-text211 thq-body-large">
              We are committed to providing excellent customer service.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
                        <span className="about-text212 thq-heading-2">Contact Us</span>
                    </Fragment>
                }
            ></Contact111>
            <CTA15
                action1={
                    <Fragment>
                        <span className="about-text213">Find a Driver</span>
                    </Fragment>
                }
                action2={
                    <Fragment>
                        <span className="about-text214">Send a Parcel</span>
                    </Fragment>
                }
                content1={
                    <Fragment>
            <span className="about-text215 thq-body-large">
              Join our platform now to experience a seamless and efficient
              parcel delivery service.
            </span>
                    </Fragment>
                }
                heading1={
                    <Fragment>
            <span className="about-text216 thq-heading-2">
              Start sending or delivering parcels today!
            </span>
                    </Fragment>
                }
                backgroundImageSrc="https://images.unsplash.com/photo-1729608630041-1369d645bfdf?ixid=M3w5MTMyMXwwfDF8YWxsfDM3fHx8fHx8fHwxNzI5NzA4MzQ3fA&amp;ixlib=rb-4.0.3&amp;w=1500"
            ></CTA15>
            <Footer10
                link1={
                    <Fragment>
                        <span className="about-text217 thq-body-small">Home</span>
                    </Fragment>
                }
                link2={
                    <Fragment>
                        <span className="about-text218 thq-body-small">About Us</span>
                    </Fragment>
                }
                link3={
                    <Fragment>
                        <span className="about-text219 thq-body-small">Services</span>
                    </Fragment>
                }
                link4={
                    <Fragment>
                        <span className="about-text220 thq-body-small">Pricing</span>
                    </Fragment>
                }
                link5={
                    <Fragment>
                        <span className="about-text221 thq-body-small">FAQ</span>
                    </Fragment>
                }
                link6={
                    <Fragment>
                        <span className="about-text222 thq-body-small">Contact Us</span>
                    </Fragment>
                }
                link7={
                    <Fragment>
                        <span className="about-text223 thq-body-small">Link 7</span>
                    </Fragment>
                }
                link8={
                    <Fragment>
                        <span className="about-text224 thq-body-small">Link 8</span>
                    </Fragment>
                }
                link9={
                    <Fragment>
                        <span className="about-text225 thq-body-small">Link 9</span>
                    </Fragment>
                }
                link10={
                    <Fragment>
                        <span className="about-text226 thq-body-small">Link 10</span>
                    </Fragment>
                }
                link11={
                    <Fragment>
                        <span className="about-text227 thq-body-small">Link 11</span>
                    </Fragment>
                }
                link12={
                    <Fragment>
                        <span className="about-text228 thq-body-small">Link 12</span>
                    </Fragment>
                }
                link13={
                    <Fragment>
                        <span className="about-text229 thq-body-small">Link 13</span>
                    </Fragment>
                }
                link14={
                    <Fragment>
                        <span className="about-text230 thq-body-small">Link 14</span>
                    </Fragment>
                }
                link15={
                    <Fragment>
                        <span className="about-text231 thq-body-small">Link 15</span>
                    </Fragment>
                }
                link16={
                    <Fragment>
                        <span className="about-text232 thq-body-small">Link 16</span>
                    </Fragment>
                }
                link17={
                    <Fragment>
                        <span className="about-text233 thq-body-small">Link 17</span>
                    </Fragment>
                }
                link18={
                    <Fragment>
                        <span className="about-text234 thq-body-small">Link 18</span>
                    </Fragment>
                }
                link19={
                    <Fragment>
                        <span className="about-text235 thq-body-small">Link 19</span>
                    </Fragment>
                }
                link20={
                    <Fragment>
                        <span className="about-text236 thq-body-small">Link 20</span>
                    </Fragment>
                }
                link21={
                    <Fragment>
                        <span className="about-text237 thq-body-small">Link 21</span>
                    </Fragment>
                }
                link22={
                    <Fragment>
                        <span className="about-text238 thq-body-small">Link 22</span>
                    </Fragment>
                }
                link23={
                    <Fragment>
                        <span className="about-text239 thq-body-small">Link 23</span>
                    </Fragment>
                }
                link24={
                    <Fragment>
                        <span className="about-text240 thq-body-small">Link 24</span>
                    </Fragment>
                }
                link25={
                    <Fragment>
                        <span className="about-text241 thq-body-small">Link 25</span>
                    </Fragment>
                }
                action1={
                    <Fragment>
            <span className="about-text242 thq-body-small">
              <span>Subscribe</span>
              <br></br>
            </span>
                    </Fragment>
                }
                logoSrc="/logo-1500h.png"
                content1={
                    <Fragment>
                        <span className="about-text245 thq-body-small">Default value</span>
                    </Fragment>
                }
                content2={
                    <Fragment>
                        <span className="about-text246 thq-body-small">Default value</span>
                    </Fragment>
                }
                copyright={
                    <Fragment>
                        <span className="about-text247 thq-body-small">Default value</span>
                    </Fragment>
                }
                termsLink={
                    <Fragment>
                        <span className="about-text248 thq-body-small">Default value</span>
                    </Fragment>
                }
                cookiesLink={
                    <Fragment>
                        <span className="about-text249 thq-body-small">Default value</span>
                    </Fragment>
                }
                privacyLink={
                    <Fragment>
                        <span className="about-text250 thq-body-small">Default value</span>
                    </Fragment>
                }
                column1Title={
                    <Fragment>
                        <span className="about-text251 thq-body-large">Column One</span>
                    </Fragment>
                }
                column2Title={
                    <Fragment>
                        <span className="about-text252 thq-body-large">Column Two</span>
                    </Fragment>
                }
                column3Title={
                    <Fragment>
                        <span className="about-text253 thq-body-large">Column Three</span>
                    </Fragment>
                }
                column4Title={
                    <Fragment>
                        <span className="about-text254 thq-body-large">Column Four</span>
                    </Fragment>
                }
                column5Title={
                    <Fragment>
                        <span className="about-text255 thq-body-large">Column Five</span>
                    </Fragment>
                }
            ></Footer10>
        </div>
    )
}

export default About
