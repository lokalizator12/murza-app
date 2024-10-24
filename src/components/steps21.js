import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './steps21.css'

const Steps21 = (props) => {
    return (
        <div className="steps21-container1 thq-section-padding">
            <div className="steps21-max-width thq-section-max-width">
                <div className="steps21-container2 thq-grid-2">
                    <div className="steps21-section-header">
                        <h2 className="thq-heading-2">
                            Discover the Power of Our Products
                        </h2>
                        <p className="thq-body-large">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius enim in eros elementum tristique. Duis cursus,
                            mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
                            libero vitae erat.
                        </p>
                        <div className="steps21-actions">
                            <button className="thq-button-filled thq-button-animated steps21-button">
                                <span className="thq-body-small">Main action</span>
                            </button>
                        </div>
                    </div>
                    <div className="steps21-container3">
                        <div className="steps21-container4 thq-card">
                            <h2>
                                {props.step1Title ?? (
                                    <Fragment>
                                        <h2 className="steps21-text31 thq-heading-2">
                                            Default value
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.step1Description ?? (
                    <Fragment>
                    <span className="steps21-text29 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <label className="steps21-text15 thq-heading-3">01</label>
                        </div>
                        <div className="steps21-container5 thq-card">
                            <h2>
                                {props.step2Title ?? (
                                    <Fragment>
                                        <h2 className="steps21-text32 thq-heading-2">
                                            Default value
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.step2Description ?? (
                    <Fragment>
                    <span className="steps21-text30 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <label className="steps21-text18 thq-heading-3">02</label>
                        </div>
                        <div className="steps21-container6 thq-card">
                            <h2>
                                {props.step3Title ?? (
                                    <Fragment>
                                        <h2 className="steps21-text26 thq-heading-2">
                                            Default value
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.step3Description ?? (
                    <Fragment>
                    <span className="steps21-text25 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <label className="steps21-text21 thq-heading-3">03</label>
                        </div>
                        <div className="steps21-container7 thq-card">
                            <h2>
                                {props.step4Title ?? (
                                    <Fragment>
                                        <h2 className="steps21-text28 thq-heading-2">
                                            Default value
                                        </h2>
                                    </Fragment>
                                )}
                            </h2>
                            <span>
                {props.step4Description ?? (
                    <Fragment>
                    <span className="steps21-text27 thq-body-small">
                      Default value
                    </span>
                    </Fragment>
                )}
              </span>
                            <label className="steps21-text24 thq-heading-3">04</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Steps21.defaultProps = {
    step3Description: undefined,
    step3Title: undefined,
    step4Description: undefined,
    step4Title: undefined,
    step1Description: undefined,
    step2Description: undefined,
    step1Title: undefined,
    step2Title: undefined,
}

Steps21.propTypes = {
    step3Description: PropTypes.element,
    step3Title: PropTypes.element,
    step4Description: PropTypes.element,
    step4Title: PropTypes.element,
    step1Description: PropTypes.element,
    step2Description: PropTypes.element,
    step1Title: PropTypes.element,
    step2Title: PropTypes.element,
}

export default Steps21
