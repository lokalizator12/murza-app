import React, {Fragment, useState} from 'react'

import PropTypes from 'prop-types'

import './features24.css'

const Features24 = (props) => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className="thq-section-padding">
            <div className="features24-container2 thq-section-max-width">
                <div className="features24-image-container">
                    {activeTab === 0 && (
                        <img
                            alt={props.feature1ImgAlt}
                            src={props.feature1ImgSrc}
                            className="features24-image1 thq-img-ratio-16-9"
                        />
                    )}
                    {activeTab === 1 && (
                        <img
                            alt={props.feature2ImgAlt}
                            src={props.feature2ImgSrc}
                            className="features24-image2 thq-img-ratio-16-9"
                        />
                    )}
                    {activeTab === 2 && (
                        <img
                            alt={props.feature3ImgAlt}
                            src={props.feature3ImgSrc}
                            className="features24-image3 thq-img-ratio-16-9"
                        />
                    )}
                </div>
                <div className="features24-tabs-menu">
                    <div
                        onClick={() => setActiveTab(0)}
                        className="features24-tab-horizontal1"
                    >
                        <div className="features24-divider-container1">
                            {activeTab === 0 && <div className="features24-container3"></div>}
                        </div>
                        <div className="features24-content1">
                            <h2>
                                {props.feature1Title ?? (
                                    <Fragment>
                                        <h2 className="features24-text2 thq-heading-2">
                                            Find a Driver
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.feature1Description ?? (
                    <Fragment>
                    <span className="features24-text3 thq-body-small">
                      Quickly search for drivers who can deliver your parcel to
                      its destination with our user-friendly platform.
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab(1)}
                        className="features24-tab-horizontal2"
                    >
                        <div className="features24-divider-container2">
                            {activeTab === 1 && <div className="features24-container4"></div>}
                        </div>
                        <div className="features24-content2">
                            <h2>
                                {props.feature2Title ?? (
                                    <Fragment>
                                        <h2 className="features24-text4 thq-heading-2">
                                            Interactive Map
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.feature2Description ?? (
                    <Fragment>
                    <span className="features24-text1 thq-body-small">
                      Easily locate available drivers and parcels on the
                      interactive map for real-time tracking and delivery
                      updates.
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab(2)}
                        className="features24-tab-horizontal3"
                    >
                        <div className="features24-divider-container3">
                            {activeTab === 2 && <div className="features24-container5"></div>}
                        </div>
                        <div className="features24-content3">
                            <h2>
                                {props.feature3Title ?? (
                                    <Fragment>
                                        <h2 className="features24-text6 thq-heading-2">
                                            Search and Filter
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.feature3Description ?? (
                    <Fragment>
                    <span className="features24-text5 thq-body-small">
                      Filter drivers and parcels by destination, size, and date
                      to find the perfect match for your delivery needs.
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Features24.defaultProps = {
    feature1ImgSrc:
        'https://images.unsplash.com/photo-1554325139-bbd006cd3e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    feature2Description: undefined,
    feature2ImgSrc:
        'https://images.unsplash.com/photo-1723962845256-37b006d8f4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    feature1Title: undefined,
    feature2ImgAlt: 'Interactive Map',
    feature1Description: undefined,
    feature2Title: undefined,
    feature3Description: undefined,
    feature1ImgAlt: 'Find a Driver',
    feature3ImgAlt: 'Search and Filter',
    feature3Title: undefined,
    feature3ImgSrc:
        'https://images.unsplash.com/photo-1600695268275-1a6468700bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
}

Features24.propTypes = {
    feature1ImgSrc: PropTypes.string,
    feature2Description: PropTypes.element,
    feature2ImgSrc: PropTypes.string,
    feature1Title: PropTypes.element,
    feature2ImgAlt: PropTypes.string,
    feature1Description: PropTypes.element,
    feature2Title: PropTypes.element,
    feature3Description: PropTypes.element,
    feature1ImgAlt: PropTypes.string,
    feature3ImgAlt: PropTypes.string,
    feature3Title: PropTypes.element,
    feature3ImgSrc: PropTypes.string,
}

export default Features24
