import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './hero9.css'

const Hero9 = (props) => {
    return (
        <div className="hero9-header30 thq-section-padding">
            <img
                alt={props.image1Alt}
                src={props.image1Src}
                className="hero9-image"
            />
            <div className="hero9-container"></div>
            <div className="hero9-max-width thq-section-max-width">
                <div className="hero9-content">
                    <h1>
                        {props.heading1 ?? (
                            <Fragment>
                                <h1 className="hero9-text7 thq-heading-1">
                                    Efficient and Secure Parcel Deliveries
                                </h1>
                            </Fragment>
                        )}
                    </h1>
                    <p>
                        {props.content1 ?? (
                            <Fragment>
                                <p className="hero9-text5 thq-body-large">
                                    Connect with reliable drivers for your parcel deliveries
                                </p>
                            </Fragment>
                        )}
                    </p>
                    <div className="hero9-actions">
                        <button className="thq-button-filled hero9-button1">
              <span>
                {props.action1 ?? (
                    <Fragment>
                    <span className="hero9-text8 thq-body-small">
                      Learn More
                    </span>
                    </Fragment>
                )}
              </span>
                        </button>
                        <button className="thq-button-outline hero9-button2">
              <span>
                {props.action2 ?? (
                    <Fragment>
                    <span className="hero9-text6 thq-body-small">
                      Get Started
                    </span>
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

Hero9.defaultProps = {
    image1Alt: 'Parcel Delivery Platform',
    content1: undefined,
    action2: undefined,
    image1Src:
        'https://images.unsplash.com/photo-1622058232222-2700277d1a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwODY0Nnw&ixlib=rb-4.0.3&q=80&w=1080',
    heading1: undefined,
    action1: undefined,
}

Hero9.propTypes = {
    image1Alt: PropTypes.string,
    content1: PropTypes.element,
    action2: PropTypes.element,
    image1Src: PropTypes.string,
    heading1: PropTypes.element,
    action1: PropTypes.element,
}

export default Hero9
