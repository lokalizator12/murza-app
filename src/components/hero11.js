import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './hero11.css'

const Hero11 = (props) => {
    return (
        <div className="hero11-header77">
            <div className="hero11-max-width thq-section-max-width">
                <div className="hero11-column thq-section-padding">
                    <div className="hero11-content1">
                        <h1>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h1 className="hero11-text5 thq-heading-1">Default value</h1>
                                </Fragment>
                            )}
                        </h1>
                        <p>
                            {props.content1 ?? (
                                <Fragment>
                                    <p className="hero11-text6 thq-body-large">Default value</p>
                                </Fragment>
                            )}
                        </p>
                        <div className="hero11-actions">
                            <button className="hero11-button1 thq-button-filled">
                <span>
                  {props.action1 ?? (
                      <Fragment>
                      <span className="hero11-text8 thq-body-small">
                        Default value
                      </span>
                      </Fragment>
                  )}
                </span>
                            </button>
                            <button className="hero11-button2 thq-button-outline">
                <span>
                  {props.action2 ?? (
                      <Fragment>
                      <span className="hero11-text7 thq-body-small">
                        Default value
                      </span>
                      </Fragment>
                  )}
                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hero11-content2">
                    <div className="hero11-row1">
                        <img
                            alt={props.image1Alt}
                            src={props.image1Src}
                            className="hero11-placeholder-image1 thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image2Alt}
                            src={props.image2Src}
                            className="hero11-placeholder-image2 thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image3Alt}
                            src={props.image3Src}
                            className="hero11-placeholder-image3 thq-img-ratio-1-1"
                        />
                    </div>
                    <div className="hero11-row2">
                        <img
                            alt={props.image4Alt}
                            src={props.image4Src}
                            className="hero11-placeholder-image4 thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image5Alt}
                            src={props.image5Src}
                            className="hero11-placeholder-image5 thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image6Alt}
                            src={props.image6Src}
                            className="hero11-placeholder-image6 thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image7Alt}
                            src={props.image7Src}
                            className="hero11-placeholder-image7 thq-img-ratio-1-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

Hero11.defaultProps = {
    image7Alt: 'Hero Image',
    image5Src:
        'https://images.unsplash.com/photo-1686535916782-a5208e6a94c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5NHw&ixlib=rb-4.0.3&q=80&w=1080',
    image4Alt: 'Hero Image',
    image4Src:
        'https://images.unsplash.com/photo-1647982450179-018d6b61eafa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5M3w&ixlib=rb-4.0.3&q=80&w=1080',
    image6Alt: 'Hero Image',
    heading1: undefined,
    content1: undefined,
    image1Src:
        'https://images.unsplash.com/photo-1473773386757-42bbe7288351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE1OXw&ixlib=rb-4.0.3&q=80&w=1080',
    action2: undefined,
    image7Src:
        'https://images.unsplash.com/photo-1536254305839-311d57dce311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5NHw&ixlib=rb-4.0.3&q=80&w=1080',
    image3Src:
        'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5M3w&ixlib=rb-4.0.3&q=80&w=1080',
    action1: undefined,
    image5Alt: 'Hero Image',
    image3Alt: 'Hero Image',
    image2Src:
        'https://images.unsplash.com/photo-1633838067288-808f810e0681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5M3w&ixlib=rb-4.0.3&q=80&w=1080',
    image2Alt: 'Hero Image',
    image1Alt: 'image',
    image6Src:
        'https://images.unsplash.com/photo-1694878981819-1084b2d7dd0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5NHw&ixlib=rb-4.0.3&q=80&w=1080',
}

Hero11.propTypes = {
    image7Alt: PropTypes.string,
    image5Src: PropTypes.string,
    image4Alt: PropTypes.string,
    image4Src: PropTypes.string,
    image6Alt: PropTypes.string,
    heading1: PropTypes.element,
    content1: PropTypes.element,
    image1Src: PropTypes.string,
    action2: PropTypes.element,
    image7Src: PropTypes.string,
    image3Src: PropTypes.string,
    action1: PropTypes.element,
    image5Alt: PropTypes.string,
    image3Alt: PropTypes.string,
    image2Src: PropTypes.string,
    image2Alt: PropTypes.string,
    image1Alt: PropTypes.string,
    image6Src: PropTypes.string,
}

export default Hero11
