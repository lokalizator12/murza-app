import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './stats8.css'

const Stats8 = (props) => {
    return (
        <div className="thq-section-padding">
            <div className="stats8-max-width thq-section-max-width">
                <div className="stats8-container2">
                    <h2>
                        {props.heading1 ?? (
                            <Fragment>
                                <h2 className="stats8-text28 thq-heading-2">Our Stats</h2>
                            </Fragment>
                        )}
                    </h2>
                    <span>
            {props.content1 ?? (
                <Fragment>
                <span className="stats8-text26 thq-body-small">
                  Join us now for a seamless delivery experience!
                </span>
                </Fragment>
            )}
          </span>
                </div>
                <div className="stats8-container3 thq-grid-4">
                    <div className="stats8-container4 thq-box-shadow thq-card">
                        <h2>
                            {props.stat1 ?? (
                                <Fragment>
                                    <h2 className="stats8-text27 thq-heading-2">98%</h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.stat1ShortDescription ?? (
                  <Fragment>
                  <span className="stats8-text30 thq-body-small">
                    On-time deliveries
                  </span>
                  </Fragment>
              )}
            </span>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className="stats8-container5 thq-box-shadow thq-card">
                        <h2>
                            {props.stat2 ?? (
                                <Fragment>
                                    <h2 className="stats8-text24 thq-heading-2">24/7</h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.stat2ShortDescription ?? (
                  <Fragment>
                      <span className="stats8-text25 thq-body-small">Support</span>
                  </Fragment>
              )}
            </span>
                        <p>
                            {props.stat2Description ?? (
                                <Fragment>
                                    <p className="stats8-text29 thq-body-large">
                                        Customer support available around the clock
                                    </p>
                                </Fragment>
                            )}
                        </p>
                    </div>
                    <div className="stats8-container6 thq-box-shadow thq-card">
                        <h2>
                            {props.stat3 ?? (
                                <Fragment>
                                    <h2 className="stats8-text22 thq-heading-2">4.9/5</h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.stat3ShortDescription ?? (
                  <Fragment>
                  <span className="stats8-text34 thq-body-small">
                    Customer Rating
                  </span>
                  </Fragment>
              )}
            </span>
                        <p>
                            {props.stat3Description ?? (
                                <Fragment>
                                    <p className="stats8-text33 thq-body-large">
                                        Average rating given by our users
                                    </p>
                                </Fragment>
                            )}
                        </p>
                    </div>
                    <div className="stats8-container7 thq-box-shadow thq-card">
                        <h2>
                            {props.stat4 ?? (
                                <Fragment>
                                    <h2 className="stats8-text23 thq-heading-2">$1M+</h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.stat4ShortDescription ?? (
                  <Fragment>
                  <span className="stats8-text31 thq-body-small">
                    Transactions Handled
                  </span>
                  </Fragment>
              )}
            </span>
                        <p>
                            {props.stat4Description ?? (
                                <Fragment>
                                    <p className="stats8-text32 thq-body-large">
                                        Total value of transactions processed through our platform
                                    </p>
                                </Fragment>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Stats8.defaultProps = {
    stat3: undefined,
    stat4: undefined,
    stat2: undefined,
    stat2ShortDescription: undefined,
    content1: undefined,
    stat1: undefined,
    heading1: undefined,
    stat2Description: undefined,
    stat1ShortDescription: undefined,
    stat4ShortDescription: undefined,
    stat4Description: undefined,
    stat3Description: undefined,
    stat3ShortDescription: undefined,
}

Stats8.propTypes = {
    stat3: PropTypes.element,
    stat4: PropTypes.element,
    stat2: PropTypes.element,
    stat2ShortDescription: PropTypes.element,
    content1: PropTypes.element,
    stat1: PropTypes.element,
    heading1: PropTypes.element,
    stat2Description: PropTypes.element,
    stat1ShortDescription: PropTypes.element,
    stat4ShortDescription: PropTypes.element,
    stat4Description: PropTypes.element,
    stat3Description: PropTypes.element,
    stat3ShortDescription: PropTypes.element,
}

export default Stats8
