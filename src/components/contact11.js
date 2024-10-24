import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './contact11.css'

const Contact11 = (props) => {
    return (
        <div className="contact11-container thq-section-padding">
            <div className="contact11-max-width thq-section-max-width">
                <div className="contact11-section-title">
                    <div className="contact11-content1">
                        <h2>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h2 className="contact11-text19 thq-heading-2">
                                        Default value
                                    </h2>
                                </Fragment>
                            )}
                        </h2>
                        <p>
                            {props.content1 ?? (
                                <Fragment>
                                    <p className="contact11-text23 thq-body-large">
                                        Default value
                                    </p>
                                </Fragment>
                            )}
                        </p>
                    </div>
                </div>
                <div className="contact11-content2 thq-flex-row">
                    <div className="contact11-content3">
                        <div className="contact11-content4">
                            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
                                <path
                                    d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"></path>
                            </svg>
                            <div className="contact11-contact-info1">
                                <h3 className="contact11-text12 thq-heading-3">Email</h3>
                                <p>
                                    {props.content2 ?? (
                                        <Fragment>
                                            <p className="contact11-text22 thq-body-large">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Suspendisse varius enim in ero.
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <span>
                  {props.email ?? (
                      <Fragment>
                      <span className="contact11-text26 thq-body-small">
                        hello@teleporthq.io
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                        <div className="contact11-content5">
                            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
                                <path
                                    d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"></path>
                            </svg>
                            <div className="contact11-contact-info2">
                                <h3 className="contact11-text14 thq-heading-3">Phone</h3>
                                <p>
                                    {props.content3 ?? (
                                        <Fragment>
                                            <p className="contact11-text20 thq-body-large">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Suspendisse varius enim in ero.
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <span>
                  {props.phone1 ?? (
                      <Fragment>
                      <span className="contact11-text21 thq-body-small">
                        +1 (555) 000-0000
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                        <div className="contact11-content6">
                            <svg viewBox="0 0 1024 1024" className="thq-icon-medium">
                                <path
                                    d="M512 0c-176.732 0-320 143.268-320 320 0 320 320 704 320 704s320-384 320-704c0-176.732-143.27-320-320-320zM512 512c-106.040 0-192-85.96-192-192s85.96-192 192-192 192 85.96 192 192-85.96 192-192 192z"></path>
                            </svg>
                            <div className="contact11-contact-info3">
                                <h3 className="contact11-text17 thq-heading-3">Office</h3>
                                <p>
                                    {props.content5 ?? (
                                        <Fragment>
                                            <p className="contact11-text25 thq-body-large">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Suspendisse varius enim in ero.
                                            </p>
                                        </Fragment>
                                    )}
                                </p>
                                <span>
                  {props.address1 ?? (
                      <Fragment>
                      <span className="contact11-text24 thq-body-small">
                        456 Test Ave, Bucharest
                      </span>
                      </Fragment>
                  )}
                </span>
                            </div>
                        </div>
                    </div>
                    <iframe
                        src={props.location1GoogleMap}
                        title="Map"
                        className="contact11-iframe thq-img-ratio-16-9"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

Contact11.defaultProps = {
    heading1: undefined,
    content3: undefined,
    phone1: undefined,
    content2: undefined,
    content1: undefined,
    location1GoogleMap:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1555.8765778275674!2d17.932741336303433!3d50.67278349645561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47105307fd0f9285%3A0x937ed7d74e908050!2sOpole%20University%20Faculty%20of%20History%20and%20Education!5e1!3m2!1sen!2spl!4v1729760230130!5m2!1sen!2spl',
    address1: undefined,
    content5: undefined,
    email: undefined,
}

Contact11.propTypes = {
    heading1: PropTypes.element,
    content3: PropTypes.element,
    phone1: PropTypes.element,
    content2: PropTypes.element,
    content1: PropTypes.element,
    location1GoogleMap: PropTypes.string,
    address1: PropTypes.element,
    content5: PropTypes.element,
    email: PropTypes.element,
}

export default Contact11
