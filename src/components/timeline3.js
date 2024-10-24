import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './timeline3.css'

const Timeline3 = (props) => {
    return (
        <div className="thq-section-padding">
            <div className="timeline3-max-width thq-section-max-width">
                <div className="timeline3-container11">
                    <h2>
                        {props.title1 ?? (
                            <Fragment>
                                <h2 className="timeline3-text36 thq-heading-2">Timeline</h2>
                            </Fragment>
                        )}
                    </h2>
                    <span>
            {props.heading1 ?? (
                <Fragment>
                <span className="timeline3-text34 thq-body-small">
                  Our Journey
                </span>
                </Fragment>
            )}
          </span>
                    <div className="timeline3-container12">
                        <button type="button" className="thq-button-filled">
              <span>
                {props.action1 ?? (
                    <Fragment>
                        <span className="timeline3-text27">Learn More</span>
                    </Fragment>
                )}
              </span>
                        </button>
                        <button type="button" className="thq-button-outline">
              <span>
                {props.action2 ?? (
                    <Fragment>
                        <span className="timeline3-text29">Sign Up</span>
                    </Fragment>
                )}
              </span>
                        </button>
                    </div>
                </div>
                <div className="timeline3-timeline-container">
                    <div className="timeline3-step1">
                        <div className="timeline3-container13">
                            <div className="timeline3-progress010"></div>
                            <div className="timeline3-container14"></div>
                            <div className="timeline3-progress011"></div>
                        </div>
                        <div className="timeline3-container15">
                            <h3>
                                {props.card1Date ?? (
                                    <Fragment>
                                        <h3 className="timeline3-text35 thq-heading-3">
                                            January 2020
                                        </h3>
                                    </Fragment>
                                )}
                            </h3>
                            <span>
                {props.card1Content ?? (
                    <Fragment>
                    <span className="timeline3-text30 thq-body-small">
                      Platform development started
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div className="timeline3-step2">
                        <div className="timeline3-container16">
                            <div className="timeline3-progress012"></div>
                            <div className="timeline3-container17"></div>
                            <div className="timeline3-progress013"></div>
                        </div>
                        <div className="timeline3-container18">
                            <h3>
                                {props.card2Date ?? (
                                    <Fragment>
                                        <h3 className="timeline3-text37 thq-heading-3">
                                            March 2020
                                        </h3>
                                    </Fragment>
                                )}
                            </h3>
                            <span>
                {props.card2Content ?? (
                    <Fragment>
                    <span className="timeline3-text24 thq-body-small">
                      First successful delivery completed
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div className="timeline3-step3">
                        <div className="timeline3-container19">
                            <div className="timeline3-progress014"></div>
                            <div className="timeline3-container20"></div>
                            <div className="timeline3-progress015"></div>
                        </div>
                        <div className="timeline3-container21">
                            <h3>
                                {props.card3Date ?? (
                                    <Fragment>
                                        <h3 className="timeline3-text26 thq-heading-3">
                                            June 2020
                                        </h3>
                                    </Fragment>
                                )}
                            </h3>
                            <span>
                {props.card3Content ?? (
                    <Fragment>
                    <span className="timeline3-text25 thq-body-small">
                      Reached 1000 registered users
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div className="timeline3-step4">
                        <div className="timeline3-container22">
                            <div className="timeline3-progress016"></div>
                            <div className="timeline3-container23"></div>
                            <div className="timeline3-progress017"></div>
                        </div>
                        <div className="timeline3-container24">
                            <h3>
                                {props.card4Date ?? (
                                    <Fragment>
                                        <h3 className="timeline3-text28 thq-heading-3">
                                            September 2020
                                        </h3>
                                    </Fragment>
                                )}
                            </h3>
                            <span>
                {props.card4Content ?? (
                    <Fragment>
                    <span className="timeline3-text31 thq-body-small">
                      Expanded services to neighboring cities
                    </span>
                    </Fragment>
                )}
              </span>
                        </div>
                    </div>
                    <div className="timeline3-step5">
                        <div className="timeline3-container25">
                            <div className="timeline3-progress018"></div>
                            <div className="timeline3-container26"></div>
                            <div className="timeline3-progress019"></div>
                        </div>
                        <div className="timeline3-container27">
                            <h3>
                                {props.card5Date ?? (
                                    <Fragment>
                                        <h3 className="timeline3-text32 thq-heading-3">
                                            December 2020
                                        </h3>
                                    </Fragment>
                                )}
                            </h3>
                            <span>
                {props.card5Content ?? (
                    <Fragment>
                    <span className="timeline3-text33 thq-body-small">
                      Celebrated one year anniversary
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

Timeline3.defaultProps = {
    card2Content: undefined,
    card3Content: undefined,
    card3Date: undefined,
    action1: undefined,
    card4Date: undefined,
    action2: undefined,
    card1Content: undefined,
    card4Content: undefined,
    card5Date: undefined,
    card5Content: undefined,
    heading1: undefined,
    card1Date: undefined,
    title1: undefined,
    card2Date: undefined,
}

Timeline3.propTypes = {
    card2Content: PropTypes.element,
    card3Content: PropTypes.element,
    card3Date: PropTypes.element,
    action1: PropTypes.element,
    card4Date: PropTypes.element,
    action2: PropTypes.element,
    card1Content: PropTypes.element,
    card4Content: PropTypes.element,
    card5Date: PropTypes.element,
    card5Content: PropTypes.element,
    heading1: PropTypes.element,
    card1Date: PropTypes.element,
    title1: PropTypes.element,
    card2Date: PropTypes.element,
}

export default Timeline3
