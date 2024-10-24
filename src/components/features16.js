import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './features16.css'

const Features16 = (props) => {
    return (
        <div className="features16-layout300 thq-section-padding">
            <div className="features16-max-width thq-section-max-width">
                <div className="features16-section-title">
          <span>
            {props.slogan1 ?? (
                <Fragment>
                    <span className="features16-text18 thq-body-small">Slogan</span>
                </Fragment>
            )}
          </span>
                    <div className="features16-content1">
                        <h2>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h2 className="features16-text14 thq-heading-2">
                                        Efficient Parcel Delivery
                                    </h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.content1 ?? (
                  <Fragment>
                  <span className="features16-text16 thq-body-large">
                    Our platform connects users with drivers for quick and
                    secure deliveries.
                  </span>
                  </Fragment>
              )}
            </span>
                    </div>
                </div>
                <div className="features16-content2">
                    <div className="features16-row thq-flex-row">
                        <div className="features16-feature1">
                            <img
                                alt={props.feature1ImageAlt}
                                src={props.feature1ImageSrc}
                                className="thq-img-ratio-4-3"
                            />
                            <div className="features16-content3">
                                <h3>
                                    {props.feature1Title ?? (
                                        <Fragment>
                                            <h3 className="features16-text21 thq-heading-3">
                                                Real-time Tracking
                                            </h3>
                                        </Fragment>
                                    )}
                                </h3>
                                <span>
                  {props.feature1Description ?? (
                      <Fragment>
                      <span className="features16-text15 thq-body-small">
                        Track your parcel every step of the way to ensure its
                        safe delivery.
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                        <div className="features16-feature2">
                            <img
                                alt={props.feature2ImageAlt}
                                src={props.feature2ImageSrc}
                                className="thq-img-ratio-4-3"
                            />
                            <div className="features16-content4">
                                <h3>
                                    {props.feature2Title ?? (
                                        <Fragment>
                                            <h3 className="features16-text20 thq-heading-3">
                                                Flexible Pricing Plans
                                            </h3>
                                        </Fragment>
                                    )}
                                </h3>
                                <span>
                  {props.feature2Description ?? (
                      <Fragment>
                      <span className="features16-text13 thq-body-small">
                        Choose from a variety of pricing plans that suit your
                        delivery needs.
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                        <div className="features16-feature3">
                            <img
                                alt={props.feature3ImageAlt}
                                src={props.feature3ImageSrc}
                                className="thq-img-ratio-4-3"
                            />
                            <div className="features16-content5">
                                <h3>
                                    {props.feature3Title ?? (
                                        <Fragment>
                                            <h3 className="features16-text19 thq-heading-3">
                                                Driver Search
                                            </h3>
                                        </Fragment>
                                    )}
                                </h3>
                                <span>
                  {props.feature3Description ?? (
                      <Fragment>
                      <span className="features16-text17 thq-body-small">
                        Search and select drivers based on your preferences for
                        personalized service.
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Features16.defaultProps = {
    feature2Description: undefined,
    heading1: undefined,
    feature1Description: undefined,
    feature3ImageSrc:
        'https://images.unsplash.com/photo-1690288505715-977d41c653d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    content1: undefined,
    feature3Description: undefined,
    slogan1: undefined,
    feature1ImageSrc:
        'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    feature3Title: undefined,
    feature2Title: undefined,
    feature1ImageAlt: 'Real-time Tracking Image',
    feature3ImageAlt: 'Driver Search Image',
    feature2ImageAlt: 'Flexible Pricing Plans Image',
    feature2ImageSrc:
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    feature1Title: undefined,
}

Features16.propTypes = {
    feature2Description: PropTypes.element,
    heading1: PropTypes.element,
    feature1Description: PropTypes.element,
    feature3ImageSrc: PropTypes.string,
    content1: PropTypes.element,
    feature3Description: PropTypes.element,
    slogan1: PropTypes.element,
    feature1ImageSrc: PropTypes.string,
    feature3Title: PropTypes.element,
    feature2Title: PropTypes.element,
    feature1ImageAlt: PropTypes.string,
    feature3ImageAlt: PropTypes.string,
    feature2ImageAlt: PropTypes.string,
    feature2ImageSrc: PropTypes.string,
    feature1Title: PropTypes.element,
}

export default Features16
