import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'

import './navbar8.css'

const Navbar8 = (props) => {
    const [link5DropdownVisible, setLink5DropdownVisible] = useState(false)
    const [link5AccordionOpen, setLink5AccordionOpen] = useState(false)
    return (
        <header className={`navbar8-container1 ${props.rootClassName} `}>
            <header data-thq="thq-navbar" className="navbar8-navbar-interactive">
                <img
                    alt={props.imageAlt1}
                    src={props.imageSrc1}
                    className="navbar8-image"
                />
                <div data-thq="thq-navbar-nav" className="navbar8-desktop-menu">
                    <nav className="navbar8-links1">
                        <a href={props.link1Url}>
                            {props.link1 ?? (
                                <Fragment>
                  <span className="navbar8-text19 thq-body-small thq-link">
                    Login
                  </span>
                                </Fragment>
                            )}
                        </a>
                        <a href={props.link2Url}>
                            {props.link2 ?? (
                                <Fragment>
                  <span className="navbar8-text20 thq-body-small thq-link">
                    Register
                  </span>
                                </Fragment>
                            )}
                        </a>
                        <a href={props.linkAbout} target="_blank" rel="noreferrer noopener">
                            {props.link3 ?? (
                                <Fragment>
                  <span className="navbar8-text15 thq-body-small thq-link">
                    Find a Driver
                  </span>
                                </Fragment>
                            )}
                        </a>
                        <div
                            onClick={() => setLink5DropdownVisible(!link5DropdownVisible)}
                            className="navbar8-link4-dropdown-trigger"
                        >
              <span>
                {props.link4 ?? (
                    <Fragment>
                    <span className="navbar8-text16 thq-body-small thq-link">
                      Find a Parcel
                    </span>
                    </Fragment>
                )}
              </span>
                            <div className="navbar8-icon-container1">
                                {link5DropdownVisible && (
                                    <div className="navbar8-container2">
                                        <svg viewBox="0 0 1024 1024" className="navbar8-icon10">
                                            <path d="M298 426h428l-214 214z"></path>
                                        </svg>
                                    </div>
                                )}
                                {!link5DropdownVisible && (
                                    <div className="navbar8-container3">
                                        <svg viewBox="0 0 1024 1024" className="navbar8-icon12">
                                            <path d="M426 726v-428l214 214z"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link to="/about" className="navbar8-link32">
                            {props.link31 ?? (
                                <Fragment>
                  <span className="navbar8-text24 thq-body-small thq-link">
                    <span>About us</span>
                    <br></br>
                  </span>
                                </Fragment>
                            )}
                        </Link>
                    </nav>
                    <div className="navbar8-buttons1">
                        <button className="navbar8-action11 thq-button-filled thq-button-animated"
                                onClick={() => {
                                    window.location.href = '/login';
                                }}>
              <span className="thq-body-small">
                {props.action1 ?? (
                    <Fragment>
                        <span className="navbar8-text18">Main Action</span>
                    </Fragment>
                )}
              </span>
                        </button>
                        <button className="navbar8-action21 thq-button-outline thq-button-animated"
                                onClick={() => {
                                    window.location.href = '/register';
                                }}>
              <span className="thq-body-small">
                {props.action2 ?? (
                    <Fragment>
                        <span className="navbar8-text22">Secondary Action</span>
                    </Fragment>
                )}
              </span>
                        </button>
                    </div>
                </div>
                <div data-thq="thq-burger-menu" className="navbar8-burger-menu">
                    <svg viewBox="0 0 1024 1024" className="navbar8-icon14">
                        <path
                            d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                </div>
                <div data-thq="thq-mobile-menu" className="navbar8-mobile-menu">
                    <div className="navbar8-nav">
                        <div className="navbar8-top">
                            <img
                                alt={props.logoAlt}
                                src={props.logoSrc}
                                className="navbar8-logo"
                            />
                            <div data-thq="thq-close-menu" className="navbar8-close-menu">
                                <svg viewBox="0 0 1024 1024" className="navbar8-icon16">
                                    <path
                                        d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                                </svg>
                            </div>
                        </div>
                        <nav className="navbar8-links2">
                            <Link to="/login" className="navbar8-link32">
                                {props.link1 ?? (
                                    <Fragment>
                    <span className="navbar8-text19 thq-body-small thq-link">
                      Login
                    </span>
                                    </Fragment>
                                )}
                            </Link>
                            <a href={props.link2Url}>
                                {props.link2 ?? (
                                    <Fragment>
                    <span className="navbar8-text20 thq-body-small thq-link">
                      Register
                    </span>
                                    </Fragment>
                                )}
                            </a>
                            <a href={props.linkAbout}>
                                {props.link3 ?? (
                                    <Fragment>
                    <span className="navbar8-text15 thq-body-small thq-link">
                      Find a Driver
                    </span>
                                    </Fragment>
                                )}
                            </a>
                            <div className="navbar8-link4-accordion">
                                <div
                                    onClick={() => setLink5AccordionOpen(!link5AccordionOpen)}
                                    className="navbar8-trigger"
                                >
                  <span>
                    {props.link4 ?? (
                        <Fragment>
                        <span className="navbar8-text16 thq-body-small thq-link">
                          Find a Parcel
                        </span>
                        </Fragment>
                    )}
                  </span>
                                    <div className="navbar8-icon-container2">
                                        {link5AccordionOpen && (
                                            <div className="navbar8-container4">
                                                <svg viewBox="0 0 1024 1024" className="navbar8-icon18">
                                                    <path d="M298 426h428l-214 214z"></path>
                                                </svg>
                                            </div>
                                        )}
                                        {!link5AccordionOpen && (
                                            <div className="navbar8-container5">
                                                <svg viewBox="0 0 1024 1024" className="navbar8-icon20">
                                                    <path d="M426 726v-428l214 214z"></path>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {link5AccordionOpen && (
                                    <div className="navbar8-container6">
                                        <a href={props.linkUrlPage3}>
                                            <div className="navbar8-menu-item1">
                                                <img
                                                    alt={props.page1ImageAlt}
                                                    src={props.page1ImageSrc}
                                                    className="navbar8-page1-image1"
                                                />
                                                <div className="navbar8-content1">
                          <span>
                            {props.page1 ?? (
                                <Fragment>
                                <span className="navbar8-text29 thq-body-large">
                                  Login
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                    <span>
                            {props.page1Description ?? (
                                <Fragment>
                                <span className="navbar8-text30 thq-body-small">
                                  Log in to your account
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                </div>
                                            </div>
                                        </a>
                                        <a href={props.link2Url}>
                                            <div className="navbar8-menu-item2">
                                                <img
                                                    alt={props.page2ImageAlt}
                                                    src={props.page2ImageSrc}
                                                    className="navbar8-page2-image1"
                                                />
                                                <div className="navbar8-content2">
                          <span>
                            {props.page2 ?? (
                                <Fragment>
                                <span className="navbar8-text14 thq-body-large">
                                  Register
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                    <span>
                            <a href={props.link2Url}>
                            {props.page2Description ?? (
                                <Fragment>
                                <span className="navbar8-text23 thq-body-small">
                                  Create a new account
                                </span>
                                </Fragment>
                            )}</a>
                          </span>
                                                </div>
                                            </div>
                                        </a>
                                        <a href={props.linkUrlPage3}>
                                            <div className="navbar8-menu-item3">
                                                <img
                                                    alt={props.page3ImageAlt}
                                                    src={props.page3ImageSrc}
                                                    className="navbar8-page3-image1"
                                                />
                                                <div className="navbar8-content3">
                          <span>
                            {props.page3 ?? (
                                <Fragment>
                                <span className="navbar8-text27 thq-body-large">
                                  Find a Driver
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                    <span>
                            {props.page3Description ?? (
                                <Fragment>
                                <span className="navbar8-text21 thq-body-small">
                                  Search for available drivers
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                </div>
                                            </div>
                                        </a>
                                        <a href={props.linkUrlPage4}>
                                            <div className="navbar8-menu-item4">
                                                <img
                                                    alt={props.page4ImageAlt}
                                                    src={props.page4ImageSrc}
                                                    className="navbar8-page4-image1"
                                                />
                                                <div className="navbar8-content4">
                          <span>
                            {props.page4 ?? (
                                <Fragment>
                                <span className="navbar8-text17 thq-body-large">
                                  Find a Parcel
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                    <span>
                            {props.page4Description ?? (
                                <Fragment>
                                <span className="navbar8-text28 thq-body-small">
                                  Search for available parcels
                                </span>
                                </Fragment>
                            )}
                          </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </nav>
                        <div className="navbar8-buttons2">
                            <button className="thq-button-filled">
                <span>
                  {props.action1 ?? (
                      <Fragment>
                          <span className="navbar8-text18">Main Action</span>
                      </Fragment>
                  )}
                </span>
                            </button>
                            <button className="thq-button-outline">
                <span>
                  {props.action2 ?? (
                      <Fragment>
                          <span className="navbar8-text22">Secondary Action</span>
                      </Fragment>
                  )}
                </span>
                            </button>
                        </div>
                    </div>
                    <div className="navbar8-icon-group">
                        <svg
                            viewBox="0 0 950.8571428571428 1024"
                            className="thq-icon-x-small"
                        >
                            <path
                                d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                        </svg>
                        <svg
                            viewBox="0 0 877.7142857142857 1024"
                            className="thq-icon-x-small"
                        >
                            <path
                                d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                        </svg>
                        <svg
                            viewBox="0 0 602.2582857142856 1024"
                            className="thq-icon-small"
                        >
                            <path
                                d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                        </svg>
                    </div>
                </div>
                {link5DropdownVisible && (
                    <div className="navbar8-container7 thq-box-shadow">
                        <div className="navbar8-link5-menu-list">
                            <a href={props.linkUrlPage3}>
                                <div className="navbar8-menu-item5">
                                    <img
                                        alt={props.page1ImageAlt}
                                        src={props.page1ImageSrc}
                                        className="navbar8-page1-image2 thq-img-ratio-1-1"
                                    />
                                    <div className="navbar8-content5">
                    <span>
                      {props.page1 ?? (
                          <Fragment>
                          <span className="navbar8-text29 thq-body-large">
                            Login
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.page1Description ?? (
                          <Fragment>
                          <span className="navbar8-text30 thq-body-small">
                            Log in to your account
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                            </a>
                            <a href={props.linkUrlPage2}>
                                <div className="navbar8-menu-item6">
                                    <img
                                        alt={props.page2ImageAlt}
                                        src={props.page2ImageSrc}
                                        className="navbar8-page2-image2 thq-img-ratio-1-1"
                                    />
                                    <div className="navbar8-content6">
                    <span>
                      {props.page2 ?? (
                          <Fragment>
                          <span className="navbar8-text14 thq-body-large">
                            Register
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.page2Description ?? (
                          <Fragment>
                          <span className="navbar8-text23 thq-body-small">
                            Create a new account
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                            </a>
                            <a href={props.linkUrlPage3}>
                                <div className="navbar8-menu-item7">
                                    <img
                                        alt={props.page3ImageAlt}
                                        src={props.page3ImageSrc}
                                        className="navbar8-page3-image2 thq-img-ratio-1-1"
                                    />
                                    <div className="navbar8-content7">
                    <span>
                      {props.page3 ?? (
                          <Fragment>
                          <span className="navbar8-text27 thq-body-large">
                            Find a Driver
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.page3Description ?? (
                          <Fragment>
                          <span className="navbar8-text21 thq-body-small">
                            Search for available drivers
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                            </a>
                            <a href={props.linkUrlPage4}>
                                <div className="navbar8-menu-item8">
                                    <img
                                        alt={props.page4ImageAlt}
                                        src={props.page4ImageSrc}
                                        className="navbar8-page4-image2 thq-img-ratio-1-1"
                                    />
                                    <div className="navbar8-content8">
                    <span>
                      {props.page4 ?? (
                          <Fragment>
                          <span className="navbar8-text17 thq-body-large">
                            Find a Parcel
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.page4Description ?? (
                          <Fragment>
                          <span className="navbar8-text28 thq-body-small">
                            Search for available parcels
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </header>
            {link5DropdownVisible && (
                <div
                    onClick={() => setLink5DropdownVisible(false)}
                    className="navbar8-container8"
                ></div>
            )}
        </header>
    )
}

Navbar8.defaultProps = {
    page2ImageAlt: 'Register Image',
    page2: undefined,
    linkFindDriver: '/find-driver',
    linkUrlPage3: '/login',
    link3: undefined,
    link4: undefined,
    page4: undefined,
    action1: undefined,
    link2Url: '/register',
    link1: undefined,
    link2: undefined,
    page3Description: undefined,
    link1Url: '/login',
    page2ImageSrc:
        'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    action2: undefined,
    imageSrc1: '/logo-1500h.png',
    logoSrc: '/logo-1500h.png',
    page2Description: undefined,
    linkUrlPage4: '/find-parcel',
    link31: undefined,
    page4ImageSrc:
        'https://images.unsplash.com/photo-1691809840543-0a3a4db49348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    page3: undefined,
    page4Description: undefined,
    page1: undefined,
    linkUrlPage2: 'https://www.teleporthq.io',
    logoAlt: 'Parcel Delivery Platform Logo',
    rootClassName: '',
    page1ImageAlt: 'Login Image',
    page3ImageSrc:
        'https://images.unsplash.com/photo-1544830826-4ccc3bf5ceb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    page3ImageAlt: 'Find a Driver Image',
    page4ImageAlt: 'Find a Parcel Image',
    page1Description: undefined,
    imageAlt1: 'image',
    page1ImageSrc:
        'https://images.unsplash.com/photo-1550852464-dfac1e62181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
}

/*Navbar8.propTypes = {
  page2ImageAlt: 'Register Image',
  page2: undefined,
  linkAbout: `${BASE_URL}/about`,
  linkUrlPage3: `${BASE_URL}/success`,
  link3: undefined,
  link4: undefined,
  page4: undefined,
  action1: `${BASE_URL}/login`,
  link2Url: `${BASE_URL}/register`,
  link1: undefined,
  link2: undefined,
  page3Description: undefined,
  link1Url: `${BASE_URL}/login`,
  page2ImageSrc:
      'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
  action2: undefined,
  imageSrc1: '/logo-1500h.png',
  logoSrc: '/logo-1500h.png',
  page2Description: undefined,
  linkUrlPage4: `${BASE_URL}/legal`,
  link31: undefined,
  page4ImageSrc:
      'https://images.unsplash.com/photo-1691809840543-0a3a4db49348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
  page3: undefined,
  page4Description: undefined,
  page1: undefined,
  linkUrlPage2: `${BASE_URL}/home`,
  logoAlt: 'Parcel Delivery Platform Logo',
  rootClassName: '',
  page1ImageAlt: 'Login Image',
  page3ImageSrc:
      'https://images.unsplash.com/photo-1544830826-4ccc3bf5ceb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
  page3ImageAlt: 'Find a Driver Image',
  linkUrlPage1: `${BASE_URL}/home`,
  page4ImageAlt: 'Find a Parcel Image',
  page1Description: undefined,
  imageAlt1: 'image',
  page1ImageSrc:
      'https://images.unsplash.com/photo-1550852464-dfac1e62181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
};*/

export default Navbar8
