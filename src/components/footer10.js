import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './footer10.css'

const Footer10 = (props) => {
    return (
        <footer className="footer10-container1 thq-section-padding">
            <div className="footer10-max-width thq-section-max-width">
                <div className="footer10-newsletter">
                    <div className="footer10-container2">
            <span>
              {props.content1 ?? (
                  <Fragment>
                  <span className="footer10-text15 thq-body-small">
                    Default value
                  </span>
                  </Fragment>
              )}
            </span>
                    </div>
                    <div className="footer10-actions">
                        <div className="footer10-form">
                            <div className="footer10-container3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="footer10-text-input thq-input"
                                />
                            </div>
                            <button className="thq-button-outline footer10-button">
                <span>
                  {props.action1 ?? (
                      <Fragment>
                      <span className="footer10-text45 thq-body-small">
                        Default value
                      </span>
                      </Fragment>
                  )}
                </span>
                            </button>
                        </div>
                        <span>
              {props.content2 ?? (
                  <Fragment>
                  <span className="footer10-text38 thq-body-small">
                    Default value
                  </span>
                  </Fragment>
              )}
            </span>
                    </div>
                </div>
                <div className="thq-divider-horizontal"></div>
                <div className="footer10-content">
                    <img
                        alt={props.logoAlt}
                        src={props.logoSrc}
                        className="footer10-image1"
                    />
                    <div className="footer10-links thq-grid-5">
                        <div className="footer10-column1">
                            <strong>
                                {props.column1Title ?? (
                                    <Fragment>
                                        <strong className="footer10-text21 thq-body-large">
                                            Column One
                                        </strong>
                                    </Fragment>
                                )}
                            </strong>
                            <div className="footer10-footer-links1">
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link1 ?? (
                                        <Fragment>
                      <span className="footer10-text27 thq-body-small">
                        Home
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link2 ?? (
                                        <Fragment>
                      <span className="footer10-text28 thq-body-small">
                        About Us
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link3 ?? (
                                        <Fragment>
                      <span className="footer10-text42 thq-body-small">
                        Services
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link4 ?? (
                                        <Fragment>
                      <span className="footer10-text35 thq-body-small">
                        Pricing
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link5 ?? (
                                        <Fragment>
                      <span className="footer10-text36 thq-body-small">
                        FAQ
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                            </div>
                        </div>
                        <div className="footer10-column2">
                            <strong>
                                {props.column2Title ?? (
                                    <Fragment>
                                        <strong className="footer10-text34 thq-body-large">
                                            Column Two
                                        </strong>
                                    </Fragment>
                                )}
                            </strong>
                            <div className="footer10-footer-links2">
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link6 ?? (
                                        <Fragment>
                      <span className="footer10-text12 thq-body-small">
                        Contact Us
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link7 ?? (
                                        <Fragment>
                      <span className="footer10-text24 thq-body-small">
                        Link 7
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link8 ?? (
                                        <Fragment>
                      <span className="footer10-text37 thq-body-small">
                        Link 8
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link9 ?? (
                                        <Fragment>
                      <span className="footer10-text31 thq-body-small">
                        Link 9
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link10 ?? (
                                        <Fragment>
                      <span className="footer10-text17 thq-body-small">
                        Link 10
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                            </div>
                        </div>
                        <div className="footer10-column3">
                            <strong>
                                {props.column3Title ?? (
                                    <Fragment>
                                        <strong className="footer10-text10 thq-body-large">
                                            Column Three
                                        </strong>
                                    </Fragment>
                                )}
                            </strong>
                            <div className="footer10-footer-links3">
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link11 ?? (
                                        <Fragment>
                      <span className="footer10-text46 thq-body-small">
                        Link 11
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link12 ?? (
                                        <Fragment>
                      <span className="footer10-text22 thq-body-small">
                        Link 12
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link13 ?? (
                                        <Fragment>
                      <span className="footer10-text29 thq-body-small">
                        Link 13
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link14 ?? (
                                        <Fragment>
                      <span className="footer10-text44 thq-body-small">
                        Link 14
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link15 ?? (
                                        <Fragment>
                      <span className="footer10-text19 thq-body-small">
                        Link 15
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                            </div>
                        </div>
                        <div className="footer10-column4">
                            <strong>
                                {props.column4Title ?? (
                                    <Fragment>
                                        <strong className="footer10-text18 thq-body-large">
                                            Column Four
                                        </strong>
                                    </Fragment>
                                )}
                            </strong>
                            <div className="footer10-footer-links4">
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link16 ?? (
                                        <Fragment>
                      <span className="footer10-text30 thq-body-small">
                        Link 16
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link17 ?? (
                                        <Fragment>
                      <span className="footer10-text26 thq-body-small">
                        Link 17
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link18 ?? (
                                        <Fragment>
                      <span className="footer10-text33 thq-body-small">
                        Link 18
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link19 ?? (
                                        <Fragment>
                      <span className="footer10-text20 thq-body-small">
                        Link 19
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link20 ?? (
                                        <Fragment>
                      <span className="footer10-text25 thq-body-small">
                        Link 20
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                            </div>
                        </div>
                        <div className="footer10-column5">
                            <strong>
                                {props.column5Title ?? (
                                    <Fragment>
                                        <strong className="footer10-text16 thq-body-large">
                                            Column Five
                                        </strong>
                                    </Fragment>
                                )}
                            </strong>
                            <div className="footer10-footer-links5">
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link21 ?? (
                                        <Fragment>
                      <span className="footer10-text41 thq-body-small">
                        Link 21
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link22 ?? (
                                        <Fragment>
                      <span className="footer10-text32 thq-body-small">
                        Link 22
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link23 ?? (
                                        <Fragment>
                      <span className="footer10-text39 thq-body-small">
                        Link 23
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link24 ?? (
                                        <Fragment>
                      <span className="footer10-text40 thq-body-small">
                        Link 24
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                                <a
                                    href="https://example.com"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {props.link25 ?? (
                                        <Fragment>
                      <span className="footer10-text43 thq-body-small">
                        Link 25
                      </span>
                                        </Fragment>
                                    )}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="thq-divider-horizontal"></div>
                <div className="footer10-credits1">
                    <div className="footer10-row">
                        <div className="footer10-credits2">
              <span>
                {props.copyright ?? (
                    <Fragment>
                    <span className="footer10-text13 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <span>
                {props.privacyLink ?? (
                    <Fragment>
                    <span className="footer10-text23 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <span>
                {props.termsLink ?? (
                    <Fragment>
                    <span className="footer10-text11 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <span>
                {props.cookiesLink ?? (
                    <Fragment>
                    <span className="footer10-text14 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                        <div className="footer10-social-links">
                            <svg
                                viewBox="0 0 877.7142857142857 1024"
                                className="thq-icon-small"
                            >
                                <path
                                    d="M713.143 73.143c90.857 0 164.571 73.714 164.571 164.571v548.571c0 90.857-73.714 164.571-164.571 164.571h-107.429v-340h113.714l17.143-132.571h-130.857v-84.571c0-38.286 10.286-64 65.714-64l69.714-0.571v-118.286c-12-1.714-53.714-5.143-101.714-5.143-101.143 0-170.857 61.714-170.857 174.857v97.714h-114.286v132.571h114.286v340h-304c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571z"></path>
                            </svg>
                            <svg
                                viewBox="0 0 877.7142857142857 1024"
                                className="thq-icon-small"
                            >
                                <path
                                    d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                            </svg>
                            <svg
                                viewBox="0 0 950.8571428571428 1024"
                                className="thq-icon-small"
                            >
                                <path
                                    d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                            </svg>
                            <svg
                                viewBox="0 0 877.7142857142857 1024"
                                className="thq-icon-small"
                            >
                                <path
                                    d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                            </svg>
                            <svg viewBox="0 0 1024 1024" className="thq-icon-small">
                                <path
                                    d="M406.286 644.571l276.571-142.857-276.571-144.571v287.429zM512 152c215.429 0 358.286 10.286 358.286 10.286 20 2.286 64 2.286 102.857 43.429 0 0 31.429 30.857 40.571 101.714 10.857 82.857 10.286 165.714 10.286 165.714v77.714s0.571 82.857-10.286 165.714c-9.143 70.286-40.571 101.714-40.571 101.714-38.857 40.571-82.857 40.571-102.857 42.857 0 0-142.857 10.857-358.286 10.857v0c-266.286-2.286-348-10.286-348-10.286-22.857-4-74.286-2.857-113.143-43.429 0 0-31.429-31.429-40.571-101.714-10.857-82.857-10.286-165.714-10.286-165.714v-77.714s-0.571-82.857 10.286-165.714c9.143-70.857 40.571-101.714 40.571-101.714 38.857-41.143 82.857-41.143 102.857-43.429 0 0 142.857-10.286 358.286-10.286v0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

Footer10.defaultProps = {
    column3Title: undefined,
    termsLink: undefined,
    logoSrc: 'https://presentation-website-assets.teleporthq.io/logos/logo.png',
    link6: undefined,
    copyright: undefined,
    cookiesLink: undefined,
    content1: undefined,
    column5Title: undefined,
    link10: undefined,
    column4Title: undefined,
    link15: undefined,
    link19: undefined,
    column1Title: undefined,
    link12: undefined,
    privacyLink: undefined,
    link7: undefined,
    link20: undefined,
    link17: undefined,
    link1: undefined,
    logoAlt: 'Parcel Delivery Platform Logo',
    link2: undefined,
    link13: undefined,
    link16: undefined,
    link9: undefined,
    link22: undefined,
    link18: undefined,
    column2Title: undefined,
    link4: undefined,
    link5: undefined,
    link8: undefined,
    content2: undefined,
    link23: undefined,
    link24: undefined,
    link21: undefined,
    link3: undefined,
    link25: undefined,
    link14: undefined,
    action1: undefined,
    link11: undefined,
}

Footer10.propTypes = {
    column3Title: PropTypes.element,
    termsLink: PropTypes.element,
    logoSrc: PropTypes.string,
    link6: PropTypes.element,
    copyright: PropTypes.element,
    cookiesLink: PropTypes.element,
    content1: PropTypes.element,
    column5Title: PropTypes.element,
    link10: PropTypes.element,
    column4Title: PropTypes.element,
    link15: PropTypes.element,
    link19: PropTypes.element,
    column1Title: PropTypes.element,
    link12: PropTypes.element,
    privacyLink: PropTypes.element,
    link7: PropTypes.element,
    link20: PropTypes.element,
    link17: PropTypes.element,
    link1: PropTypes.element,
    logoAlt: PropTypes.string,
    link2: PropTypes.element,
    link13: PropTypes.element,
    link16: PropTypes.element,
    link9: PropTypes.element,
    link22: PropTypes.element,
    link18: PropTypes.element,
    column2Title: PropTypes.element,
    link4: PropTypes.element,
    link5: PropTypes.element,
    link8: PropTypes.element,
    content2: PropTypes.element,
    link23: PropTypes.element,
    link24: PropTypes.element,
    link21: PropTypes.element,
    link3: PropTypes.element,
    link25: PropTypes.element,
    link14: PropTypes.element,
    action1: PropTypes.element,
    link11: PropTypes.element,
}

export default Footer10
