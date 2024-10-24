import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './testimonial17.css'

const Testimonial17 = (props) => {
    return (
        <div className="thq-section-padding">
            <div className="testimonial17-max-width thq-section-max-width">
                <div className="testimonial17-container10">
                    <h2>
                        {props.heading1 ?? (
                            <Fragment>
                                <h2 className="testimonial17-text33 thq-heading-2">
                                    Testimonials
                                </h2>
                            </Fragment>
                        )}
                    </h2>
                    <span>
            {props.content1 ?? (
                <Fragment>
                <span className="testimonial17-text28 thq-body-small">
                  Read what our users have to say about their experience with
                  our parcel delivery platform.
                </span>
                </Fragment>
            )}
          </span>
                </div>
                <div className="thq-grid-2">
                    <div className="thq-animated-card-bg-2">
                        <div className="thq-animated-card-bg-1">
                            <div
                                data-animated="true"
                                className="thq-card testimonial17-card1"
                            >
                                <div className="testimonial17-container12">
                                    <img
                                        alt={props.author1Alt}
                                        src={props.author1Src}
                                        className="testimonial17-image1"
                                    />
                                    <div className="testimonial17-container13">
                                        <strong>
                                            {props.author1Name ?? (
                                                <Fragment>
                                                    <strong className="testimonial17-text32 thq-body-large">
                                                        Alice Johnson
                                                    </strong>
                                                </Fragment>
                                            )}
                                        </strong>
                                        <span>
                      {props.author1Position ?? (
                          <Fragment>
                          <span className="testimonial17-text37 thq-body-small">
                            Freelancer
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                                <span>
                  {props.review1 ?? (
                      <Fragment>
                      <span className="testimonial17-text34 thq-body-small">
                        I needed to send an urgent parcel, and within minutes I
                        found a reliable driver through this platform. Highly
                        recommended!
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="thq-animated-card-bg-2">
                        <div className="thq-animated-card-bg-1">
                            <div
                                data-animated="true"
                                className="thq-card testimonial17-card2"
                            >
                                <div className="testimonial17-container14">
                                    <img
                                        alt={props.author2Alt}
                                        src={props.author2Src}
                                        className="testimonial17-image2"
                                    />
                                    <div className="testimonial17-container15">
                                        <strong>
                                            {props.author2Name ?? (
                                                <Fragment>
                                                    <strong className="testimonial17-text27 thq-body-large">
                                                        Bob Smith
                                                    </strong>
                                                </Fragment>
                                            )}
                                        </strong>
                                        <span>
                      {props.author2Position ?? (
                          <Fragment>
                          <span className="testimonial17-text24 thq-body-small">
                            Small Business Owner
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                                <span>
                  {props.review2 ?? (
                      <Fragment>
                      <span className="testimonial17-text36 thq-body-small">
                        As a small business owner, I rely on this service to
                        deliver my products to customers efficiently. It has
                        never let me down.
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="thq-animated-card-bg-2">
                        <div className="thq-animated-card-bg-1">
                            <div
                                data-animated="true"
                                className="thq-card testimonial17-card3"
                            >
                                <div className="testimonial17-container16">
                                    <img
                                        alt={props.author3Alt}
                                        src={props.author3Src}
                                        className="testimonial17-image3"
                                    />
                                    <div className="testimonial17-container17">
                                        <strong>
                                            {props.author3Name ?? (
                                                <Fragment>
                                                    <strong className="testimonial17-text25 thq-body-large">
                                                        Emily Davis
                                                    </strong>
                                                </Fragment>
                                            )}
                                        </strong>
                                        <span>
                      {props.author3Position ?? (
                          <Fragment>
                          <span className="testimonial17-text31 thq-body-small">
                            Student
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                                <span>
                  {props.review3 ?? (
                      <Fragment>
                      <span className="testimonial17-text29 thq-body-small">
                        I use this platform regularly to earn extra income by
                        delivering parcels in my free time. It&apos;s easy to
                        use and pays well.
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="thq-animated-card-bg-2">
                        <div className="thq-animated-card-bg-1">
                            <div
                                data-animated="true"
                                className="thq-card testimonial17-card4"
                            >
                                <div className="testimonial17-container18">
                                    <img
                                        alt={props.author4Alt}
                                        src={props.author4Src}
                                        className="testimonial17-image4"
                                    />
                                    <div className="testimonial17-container19">
                                        <strong>
                                            {props.author4Name ?? (
                                                <Fragment>
                                                    <strong className="testimonial17-text30 thq-body-large">
                                                        David Lee
                                                    </strong>
                                                </Fragment>
                                            )}
                                        </strong>
                                        <span>
                      {props.author4Position ?? (
                          <Fragment>
                          <span className="testimonial17-text35 thq-body-small">
                            Retiree
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                </div>
                                <span>
                  {props.review4 ?? (
                      <Fragment>
                      <span className="testimonial17-text26 thq-body-small">
                        Being retired, I enjoy the flexibility of choosing when
                        and where to deliver parcels. This platform has been a
                        great source of income for me.
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

Testimonial17.defaultProps = {
    author4Src:
        'https://images.unsplash.com/photo-1709651669999-57741c9bf085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    author1Src:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    author2Position: undefined,
    author3Name: undefined,
    author2Src:
        'https://images.unsplash.com/photo-1620853724625-4715441de25d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    review4: undefined,
    author2Name: undefined,
    author3Src:
        'https://images.unsplash.com/reserve/4bZZKXHQTseRktZuFYsi_OnTheDock.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNTc4OXw&ixlib=rb-4.0.3&q=80&w=1080',
    author3Alt: 'Image of Emily Davis',
    author4Alt: 'Image of David Lee',
    author2Alt: 'Image of Bob Smith',
    content1: undefined,
    review3: undefined,
    author4Name: undefined,
    author3Position: undefined,
    author1Name: undefined,
    heading1: undefined,
    review1: undefined,
    author4Position: undefined,
    review2: undefined,
    author1Position: undefined,
    author1Alt: 'Image of Alice Johnson',
}

Testimonial17.propTypes = {
    author4Src: PropTypes.string,
    author1Src: PropTypes.string,
    author2Position: PropTypes.element,
    author3Name: PropTypes.element,
    author2Src: PropTypes.string,
    review4: PropTypes.element,
    author2Name: PropTypes.element,
    author3Src: PropTypes.string,
    author3Alt: PropTypes.string,
    author4Alt: PropTypes.string,
    author2Alt: PropTypes.string,
    content1: PropTypes.element,
    review3: PropTypes.element,
    author4Name: PropTypes.element,
    author3Position: PropTypes.element,
    author1Name: PropTypes.element,
    heading1: PropTypes.element,
    review1: PropTypes.element,
    author4Position: PropTypes.element,
    review2: PropTypes.element,
    author1Position: PropTypes.element,
    author1Alt: PropTypes.string,
}

export default Testimonial17
