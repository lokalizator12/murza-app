import React, {Fragment, useState} from 'react'

import PropTypes from 'prop-types'

import './faq141.css'

const FAQ141 = (props) => {
    const [faq1Visible, setFaq1Visible] = useState(false)
    const [faq2Visible, setFaq2Visible] = useState(false)
    const [faq3Visible, setFaq3Visible] = useState(false)
    const [faq5Visible, setFaq5Visible] = useState(false)
    const [faq4Visible, setFaq4Visible] = useState(false)
    return (
        <div className="faq141faq8 thq-section-padding">
            <div className="faq141-max-width thq-section-max-width">
                <div className="faq141-container10 thq-flex-column">
                    <div className="faq141-section-title thq-flex-column">
                        <h2>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h2 className="faq141-text30 thq-heading-2">FAQs</h2>
                                </Fragment>
                            )}
                        </h2>
                        <p>
                            {props.content1 ?? (
                                <Fragment>
                                    <p className="faq141-text22 thq-body-large">
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
                        <span className="faq141-text28">Contact</span>
                    </Fragment>
                )}
              </span>
                        </button>
                    </div>
                    <div className="faq141-list thq-flex-column">
                        <div className="thq-divider-horizontal"></div>
                        <div className="faq141-faq1">
                            <div
                                onClick={() => setFaq1Visible(!faq1Visible)}
                                className="faq141-trigger1"
                            >
                                <p>
                                    {props.faq1Question ?? (
                                        <Fragment>
                                            <p className="faq141-text25 thq-body-large">
                                                How can I find a driver to deliver my parcel?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq141-icons-container1">
                                    {!faq1Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon10">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq1Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon12">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq1Visible && (
                                <div className="faq141-container13">
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
                        <div className="faq141-faq2">
                            <div
                                onClick={() => setFaq2Visible(!faq2Visible)}
                                className="faq141-trigger2"
                            >
                                <p>
                                    {props.faq2Question ?? (
                                        <Fragment>
                                            <p className="faq141-text24 thq-body-large">
                                                Can I track my parcel in real-time?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq141-icons-container2">
                                    {!faq2Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon14">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq2Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon16">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq2Visible && (
                                <div className="faq141-container16">
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
                        <div className="faq141-faq3">
                            <div
                                onClick={() => setFaq3Visible(!faq3Visible)}
                                className="faq141-trigger3"
                            >
                                <p>
                                    {props.faq3Question ?? (
                                        <Fragment>
                                            <p className="faq141-text29 thq-body-large">
                                                What pricing plans do you offer?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq141-icons-container3">
                                    {!faq3Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon18">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq3Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon20">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq3Visible && (
                                <div className="faq141-container19">
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
                        <div className="faq141-faq4">
                            <div
                                onClick={() => setFaq4Visible(!faq4Visible)}
                                className="faq141-trigger4"
                            >
                                <p>
                                    {props.faq4Question ?? (
                                        <Fragment>
                                            <p className="faq141-text27 thq-body-large">
                                                How can I trust the drivers on your platform?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq141-icons-container4">
                                    {!faq4Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon22">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq4Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon24">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq4Visible && (
                                <div className="faq141-container22">
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
                        <div className="faq141-faq5">
                            <div
                                onClick={() => setFaq5Visible(!faq5Visible)}
                                className="faq141-trigger5"
                            >
                                <p>
                                    {props.faq5Question ?? (
                                        <Fragment>
                                            <p className="faq141-text26 thq-body-large">
                                                Can I read testimonials from other users?
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <div className="faq141-icons-container5">
                                    {!faq5Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon26">
                                                <path d="M316 366l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </div>
                                    )}
                                    {faq5Visible && (
                                        <div>
                                            <svg viewBox="0 0 1024 1024" className="faq141-icon28">
                                                <path d="M316 658l-60-60 256-256 256 256-60 60-196-196z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {faq5Visible && (
                                <div className="faq141-container25">
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
                <div className="faq141-content1 thq-flex-column">
                    <div className="faq141-content2">
                        <h2>
                            {props.heading2 ?? (
                                <Fragment>
                                    <h2 className="faq141-text23 thq-heading-2">
                                        Still have a question?
                                    </h2>
                                </Fragment>
                            )}
                        </h2>
                        <span>
              {props.content2 ?? (
                  <Fragment>
                  <span className="faq141-text31 thq-body-large">
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
                      <span className="faq141-text21">Email us</span>
                  </Fragment>
              )}
            </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

FAQ141.defaultProps = {
    action2: undefined,
    content1: undefined,
    heading2: undefined,
    faq2Question: undefined,
    faq1Question: undefined,
    faq5Question: undefined,
    faq4Question: undefined,
    action1: undefined,
    faq3Question: undefined,
    heading1: undefined,
    content2: undefined,
}

FAQ141.propTypes = {
    action2: PropTypes.element,
    content1: PropTypes.element,
    heading2: PropTypes.element,
    faq2Question: PropTypes.element,
    faq1Question: PropTypes.element,
    faq5Question: PropTypes.element,
    faq4Question: PropTypes.element,
    action1: PropTypes.element,
    faq3Question: PropTypes.element,
    heading1: PropTypes.element,
    content2: PropTypes.element,
}

export default FAQ141
