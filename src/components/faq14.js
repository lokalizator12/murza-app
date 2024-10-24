import React, {Fragment, useState} from 'react'

import PropTypes from 'prop-types'

import './faq14.css'

const FAQ14 = (props) => {
    const [faq1Visible, setFaq1Visible] = useState(false)
    const [faq5Visible, setFaq5Visible] = useState(false)
    const [faq4Visible, setFaq4Visible] = useState(false)
    const [faq2Visible, setFaq2Visible] = useState(false)
    const [faq3Visible, setFaq3Visible] = useState(false)
    return (
        <div className="faq14faq8 thq-section-padding">
            <div className="faq14-max-width thq-section-max-width">
                <div className="faq14-container10 thq-flex-column">
                    <div className="faq14-section-title thq-flex-column">
                        <h2>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h2 className="faq14-text26 thq-heading-2">FAQs</h2>
                                </Fragment>
                            )}
                        </h2>
                        <p>
                            {props.content1 ?? (
                                <Fragment>
                                    <p className="faq14-text27 thq-body-large">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse varius enim in eros elementum tristique.
                                    </p>
                                </Fragment>
                            )}
                        </p>
                        <button type="button" className="thq-button-filled">
              <span>
                {props.action1 ?? (
                    <Fragment>
                        <span className="faq14-text31">Contact</span>
                    </Fragment>
                )}
              </span>
                        </button>
                    </div>
                    <div className="faq14-list thq-flex-column">
                        <div className="thq-divider-horizontal"></div>
                        <div className="faq14-faq1">
                            <div
                                onClick={() => setFaq1Visible(!faq1Visible)}
                                className="faq14-trigger1"
                            >
                                <p>
                                    {props.faq1Question ?? (
                                        <Fragment>
                                            <p className="faq14-text22 thq-body-large">
                                                How does the parcel delivery platform work?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq14-icons-container1">
                                    {!faq1Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon10">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq1Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon12">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq1Visible && (
                                <div className="faq14-container13">
                  <span className="thq-body-small">
                    Lorem ipsum dolor sit amet. Est eaque sint ut blanditiis
                    sunt aut deleniti illum non repudiandae voluptatem. Aut
                    praesentium doloribus qui distinctio neque ut unde
                    temporibus. Cum exercitationem eveniet in omnis animi in
                    corporis nulla. Sed tempora excepturi et voluptatem modi et
                    exercitationem voluptate cum illum quisquam 33 quia
                    blanditiis eos minus consequatur.Ut neque quam qui
                    dignissimos voluptates ut voluptate totam aut consequuntur
                    quod. Ut voluptas incidunt ut fuga nostrum ut quaerat enim
                    eum earum tenetur? Est esse harum et Quis officiis et enim
                    amet.Et minima tempore et neque voluptatem eos amet officiis
                    et temporibus Quis. Et suscipit esse id nemo sunt At nihil
                    earum et consequatur fuga aut sapiente voluptate est
                    cupiditate esse non dolor cumque. Ut obcaecati recusandae et
                    beatae quae qui doloremque eligendi sit eaque labore.
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="thq-divider-horizontal"></div>
                        <div className="faq14-faq2">
                            <div
                                onClick={() => setFaq2Visible(!faq2Visible)}
                                className="faq14-trigger2"
                            >
                                <p>
                                    {props.faq2Question ?? (
                                        <Fragment>
                                            <p className="faq14-text21 thq-body-large">
                                                Can I track the real-time location of my parcel?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq14-icons-container2">
                                    {!faq2Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon14">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq2Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon16">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq2Visible && (
                                <div className="faq14-container16">
                  <span className="thq-body-small">
                    Et minima tempore et neque voluptatem eos amet officiis et
                    temporibus Quis. Et suscipit esse id nemo sunt At nihil
                    earum et consequatur fuga aut sapiente voluptate est
                    cupiditate esse non dolor cumque. Ut obcaecati recusandae et
                    beatae quae qui doloremque eligendi sit eaque labore.
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="thq-divider-horizontal"></div>
                        <div className="faq14-faq3">
                            <div
                                onClick={() => setFaq3Visible(!faq3Visible)}
                                className="faq14-trigger3"
                            >
                                <p>
                                    {props.faq3Question ?? (
                                        <Fragment>
                                            <p className="faq14-text28 thq-body-large">
                                                What pricing plans are available?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq14-icons-container3">
                                    {!faq3Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon18">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq3Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon20">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq3Visible && (
                                <div className="faq14-container19">
                  <span className="thq-body-small">
                    A quia temporibus aut ullam assumenda vel eius sapiente ut
                    eligendi molestias. Ex ipsum incidunt ut excepturi eaque sed
                    nulla quia qui exercitationem alias aut consequuntur nihil
                    et animi voluptas.
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="thq-divider-horizontal"></div>
                        <div className="faq14-faq4">
                            <div
                                onClick={() => setFaq4Visible(!faq4Visible)}
                                className="faq14-trigger4"
                            >
                                <p>
                                    {props.faq4Question ?? (
                                        <Fragment>
                                            <p className="faq14-text30 thq-body-large">
                                                How do I find a driver for my parcel?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq14-icons-container4">
                                    {!faq4Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon22">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq4Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon24">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq4Visible && (
                                <div className="faq14-container22">
                  <span className="thq-body-small">
                    A quia temporibus aut ullam assumenda vel eius sapiente ut
                    eligendi molestias. Ex ipsum incidunt ut excepturi eaque sed
                    nulla quia qui exercitationem alias aut consequuntur nihil
                    et animi voluptas.
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="thq-divider-horizontal"></div>
                        <div className="faq14-faq5">
                            <div
                                onClick={() => setFaq5Visible(!faq5Visible)}
                                className="faq14-trigger5"
                            >
                                <p>
                                    {props.faq5Question ?? (
                                        <Fragment>
                                            <p className="faq14-text32 thq-body-large">
                                                Are there testimonials from other users?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq14-icons-container5">
                                    {!faq5Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon26">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq5Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq14-icon28">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq5Visible && (
                                <div className="faq14-container25">
                  <span className="thq-body-small">
                    Lorem ipsum dolor sit amet. Est eaque sint ut blanditiis
                    sunt aut deleniti illum non repudiandae voluptatem. Aut
                    praesentium doloribus qui distinctio neque ut unde
                    temporibus. Cum exercitationem eveniet in omnis animi in
                    corporis nulla. Sed tempora excepturi et voluptatem modi et
                    exercitationem voluptate cum illum quisquam 33 quia
                    blanditiis eos minus consequatur.Ut neque quam qui
                    dignissimos voluptates ut voluptate totam aut consequuntur
                    quod. Ut voluptas incidunt ut fuga nostrum ut quaerat enim
                    eum earum tenetur? Est esse harum et Quis officiis et enim
                    amet.Et minima tempore et neque voluptatem eos amet officiis
                    et temporibus Quis. Et suscipit esse id nemo sunt At nihil
                    earum et consequatur fuga aut sapiente voluptate est
                    cupiditate esse non dolor cumque. Ut obcaecati recusandae et
                    beatae quae qui doloremque eligendi sit eaque labore.
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="thq-divider-horizontal"></div>
                    </div>
                </div>
                <div className="faq14-content1 thq-flex-column">
                    <div className="faq14-content2">
                        <h2>
                            {props.heading2 ?? (
                                <Fragment>
                                    <h2 className="faq14-text29 thq-heading-2">
                                        Still have a question?
                                    </h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.content2 ?? (
                  <Fragment>
                  <span className="faq14-text23 thq-body-large">
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <span
                          dangerouslySetInnerHTML={{
                              __html: ' ',
                          }}
                      />
                    </span>
                    <span>
                      <span
                          dangerouslySetInnerHTML={{
                              __html: ' ',
                          }}
                      />
                    </span>
                  </span>
                  </Fragment>
              )}
            </span>
                    </div>
                    <button type="button" className="thq-button-filled">
            <span>
              {props.action2 ?? (
                  <Fragment>
                      <span className="faq14-text33">Email us</span>
                  </Fragment>
              )}
            </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

FAQ14.defaultProps = {
    faq2Question: undefined,
    faq1Question: undefined,
    content2: undefined,
    heading1: undefined,
    content1: undefined,
    faq3Question: undefined,
    heading2: undefined,
    faq4Question: undefined,
    action1: undefined,
    faq5Question: undefined,
    action2: undefined,
}

FAQ14.propTypes = {
    faq2Question: PropTypes.element,
    faq1Question: PropTypes.element,
    content2: PropTypes.element,
    heading1: PropTypes.element,
    content1: PropTypes.element,
    faq3Question: PropTypes.element,
    heading2: PropTypes.element,
    faq4Question: PropTypes.element,
    action1: PropTypes.element,
    faq5Question: PropTypes.element,
    action2: PropTypes.element,
}

export default FAQ14
