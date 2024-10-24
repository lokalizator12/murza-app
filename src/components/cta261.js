import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './cta261.css'

const CTA261 = (props) => {
    return (
        <div className="thq-section-padding">
            <div className="thq-section-max-width">
                <div className="cta261-accent2-bg">
                    <div className="cta261-accent1-bg">
                        <div className="cta261-container2">
                            <div className="cta261-content">
                <span>
                  {props.heading1 ?? (
                      <Fragment>
                      <span className="cta261-text5 thq-heading-2">
                        Start sending and receiving parcels with ease
                      </span>
                      </Fragment>
                  )}
                </span>
                                <p>
                                    {props.content1 ?? (
                                        <Fragment>
                                            <p className="cta261-text4 thq-body-large">
                                                Join our platform today to experience seamless parcel
                                                deliveries
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                            </div>
                            <div className="cta261-actions">
                                <button
                                    type="button"
                                    className="thq-button-filled cta261-button"
                                >
                  <span>
                    {props.action1 ?? (
                        <Fragment>
                            <span className="cta261-text6">Sign Up Now</span>
                        </Fragment>
                    )}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CTA261.defaultProps = {
    content1: undefined,
    heading1: undefined,
    action1: undefined,
}

CTA261.propTypes = {
    content1: PropTypes.element,
    heading1: PropTypes.element,
    action1: PropTypes.element,
}

export default CTA261
