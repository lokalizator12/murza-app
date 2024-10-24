import React, {Fragment, useState} from 'react'

import PropTypes from 'prop-types'

import './features25.css'

const Features25 = (props) => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className="thq-section-padding">
            <div className="features25-container2 thq-section-max-width">
                <div className="features25-tabs-menu">
                    <div
                        onClick={() => setActiveTab(0)}
                        className="features25-tab-horizontal1"
                    >
                        <div className="features25-divider-container1">
                            {activeTab === 0 && <div className="features25-container3"></div>}
                        </div>
                        <div className="features25-content1">
                            <h2>
                                {props.feature1Title ?? (
                                    <Fragment>
                                        <h2 className="features25-text1 thq-heading-2">
                                            Find a Driver
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.feature1Description ?? (
                    <Fragment>
                    <span className="features25-text2 thq-body-small">
                      Easily locate a driver to deliver your parcel with just a
                      few clicks.
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab(1)}
                        className="features25-tab-horizontal2"
                    >
                        <div className="features25-divider-container2">
                            {activeTab === 1 && <div className="features25-container4"></div>}
                        </div>
                        <div className="features25-content2">
                            <h2>
                                {props.feature2Title ?? (
                                    <Fragment>
                                        <h2 className="features25-text3 thq-heading-2">
                                            Find a Parcel
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.feature2Description ?? (
                    <Fragment>
                    <span className="features25-text4 thq-body-small">
                      Search for available parcels that need to be delivered to
                      your desired destination.
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setActiveTab(2)}
                        className="features25-tab-horizontal3"
                    >
                        <div className="features25-divider-container3">
                            {activeTab === 2 && <div className="features25-container5"></div>}
                        </div>
                        <div className="features25-content3">
                            <h2>
                                {props.feature3Title ?? (
                                    <Fragment>
                                        <h2 className="features25-text6 thq-heading-2">
                                            Interactive Map
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.feature3Description ?? (
                    <Fragment>
                    <span className="features25-text5 thq-body-small">
                      Track the real-time locations of drivers and parcels on an
                      interactive map for efficient delivery.
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                </div>
                <div className="features25-image-container">
                    {activeTab === 0 && (
                        <img
                            alt={props.feature1ImgAlt}
                            src={props.feature1ImgSrc}
                            className="features25-image1 thq-img-ratio-16-9"
                        />
                    )}
                    {activeTab === 1 && (
                        <img
                            alt={props.feature2ImgAlt}
                            src={props.feature2ImgSrc}
                            className="features25-image2 thq-img-ratio-16-9"
                        />
                    )}
                    {activeTab === 2 && (
                        <img
                            alt={props.feature3ImgAlt}
                            src={props.feature3ImgSrc}
                            className="features25-image3 thq-img-ratio-16-9"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

Features25.defaultProps = {
    feature1ImgAlt: 'Image for Find a Driver',
    feature1Title: undefined,
    feature1Description: undefined,
    feature2Title: undefined,
    feature2ImgAlt: 'Image for Find a Parcel',
    feature2Description: undefined,
    feature3Description: undefined,
    feature3Title: undefined,
    feature3ImgSrc:
        'https://images.unsplash.com/photo-1610307522657-8c0304960189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    feature2ImgSrc:
        'https://images.unsplash.com/photo-1620219365994-f443a86ea626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    feature1ImgSrc:
        'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    feature3ImgAlt: 'Image for Interactive Map',
}

Features25.propTypes = {
    feature1ImgAlt: PropTypes.string,
    feature1Title: PropTypes.element,
    feature1Description: PropTypes.element,
    feature2Title: PropTypes.element,
    feature2ImgAlt: PropTypes.string,
    feature2Description: PropTypes.element,
    feature3Description: PropTypes.element,
    feature3Title: PropTypes.element,
    feature3ImgSrc: PropTypes.string,
    feature2ImgSrc: PropTypes.string,
    feature1ImgSrc: PropTypes.string,
    feature3ImgAlt: PropTypes.string,
}

export default Features25
