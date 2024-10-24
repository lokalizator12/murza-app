import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './cta15.css'

const CTA15 = (props) => {
    return (
        <div className="cta15-container thq-section-padding">
            <img
                alt={props.backgroundImageAlt}
                src={props.backgroundImageSrc}
                className="cta15-background-image thq-img-ratio-16-9"
            />
            <div className="cta15-max-width thq-section-max-width">
                <div className="cta15-column">
                    <div className="cta15-content">
                        <h2>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h2 className="cta15-text6 thq-heading-2">
                                        Start sending or delivering parcels today!
                                    </h2>
                                </Fragment>
                            )}
                        </h2>
                        <p>
                            {props.content1 ?? (
                                <Fragment>
                                    <p className="cta15-text7 thq-body-large">
                                        Join our platform now to experience a seamless and efficient
                                        parcel delivery service.
                                    </p>
                                </Fragment>
                            )}
                        </p>
                    </div>
                    <div className="cta15-actions">
                        <button type="button" className="thq-button-filled">
              <span>
                {props.action1 ?? (
                    <Fragment>
                        <span className="cta15-text8">Find a Driver</span>
                    </Fragment>
                )}
              </span>
                        </button>
                        <button type="button" className="thq-button-outline">
              <span>
                {props.action2 ?? (
                    <Fragment>
                        <span className="cta15-text5">Send a Parcel</span>
                    </Fragment>
                )}
              </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

CTA15.defaultProps = {
    backgroundImageSrc:
        'https://images.unsplash.com/photo-1727072206145-bf6f47befe9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    backgroundImageAlt: 'CTA background image',
    action2: undefined,
    heading1: undefined,
    content1: undefined,
    action1: undefined,
}

CTA15.propTypes = {
    backgroundImageSrc: PropTypes.string,
    backgroundImageAlt: PropTypes.string,
    action2: PropTypes.element,
    heading1: PropTypes.element,
    content1: PropTypes.element,
    action1: PropTypes.element,
}

export default CTA15
