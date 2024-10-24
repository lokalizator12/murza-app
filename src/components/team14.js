import React, {Fragment} from 'react'

import PropTypes from 'prop-types'

import './team14.css'

const Team14 = (props) => {
    return (
        <div className="thq-section-padding">
            <div className="team14-max-width thq-section-max-width">
                <div className="team14-section-title">
          <span>
            {props.content1 ?? (
                <Fragment>
                <span className="team14-text83 thq-body-small">
                  Join our team and make a difference in your career!
                </span>
                </Fragment>
            )}
          </span>
                    <button className="team14-button thq-button-filled">
            <span>
              {props.actionContent ?? (
                  <Fragment>
                  <span className="team14-text68 thq-body-small">
                    Open positions
                  </span>
                  </Fragment>
              )}
            </span>
                    </button>
                    <div className="team14-content10">
                        <h2>
                            {props.heading1 ?? (
                                <Fragment>
                                    <h2 className="team14-text96 thq-heading-2">Meet our team</h2>
                                </Fragment>
                            )}
                        </h2>
                        <p>
                            {props.content2 ?? (
                                <Fragment>
                                    <p className="team14-text75 thq-body-large">
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
                                    </p>
                                </Fragment>
                            )}
                        </p>
                    </div>
                </div>
                <div
                    data-thq="slider"
                    data-loop="true"
                    data-autoplay="true"
                    data-navigation="true"
                    data-pagination="true"
                    className="team14-slider1 swiper"
                >
                    <div data-thq="slider-wrapper" className="swiper-wrapper">
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide10 swiper-slide"
                        >
                            <div className="team14-card10">
                                <img
                                    alt={props.member1Alt}
                                    src={props.member1Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content11">
                                    <div className="team14-title10">
                    <span>
                      {props.member1 ?? (
                          <Fragment>
                          <span className="team14-text92 thq-body-small">
                            Alice Smith
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member1Job ?? (
                          <Fragment>
                          <span className="team14-text69 thq-body-small">
                            Co-Founder &amp; CEO
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member1Content ?? (
                        <Fragment>
                        <span className="team14-text89 thq-body-small">
                          Alice is a visionary leader with a passion for
                          innovation and customer satisfaction.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons10">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="team14-card11">
                                <img
                                    alt={props.member2Alt}
                                    src={props.member2Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content12">
                                    <div className="team14-title11">
                    <span>
                      {props.member2 ?? (
                          <Fragment>
                          <span className="team14-text81 thq-body-small">
                            John Doe
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member2Job ?? (
                          <Fragment>
                          <span className="team14-text71 thq-body-small">
                            Head of Operations
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member2Content ?? (
                        <Fragment>
                        <span className="team14-text73 thq-body-small">
                          John ensures smooth operations and efficient delivery
                          processes.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons11">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="team14-card12">
                                <img
                                    alt={props.member3Alt}
                                    src={props.member3Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content13">
                                    <div className="team14-title12">
                    <span>
                      {props.member3 ?? (
                          <Fragment>
                          <span className="team14-text86 thq-body-small">
                            Emily Brown
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member3Job ?? (
                          <Fragment>
                          <span className="team14-text84 thq-body-small">
                            Customer Relations Manager
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member3Content ?? (
                        <Fragment>
                        <span className="team14-text72 thq-body-small">
                          Emily focuses on building strong relationships with
                          our users and drivers.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons12">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="team14-card13">
                                <img
                                    alt={props.member4Alt}
                                    src={props.member4Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content14">
                                    <div className="team14-title13">
                    <span>
                      {props.member4 ?? (
                          <Fragment>
                          <span className="team14-text70 thq-body-small">
                            David Lee
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member4Job ?? (
                          <Fragment>
                          <span className="team14-text90 thq-body-small">
                            Lead Developer
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member4Content ?? (
                        <Fragment>
                        <span className="team14-text80 thq-body-small">
                          David leads the tech team in creating cutting-edge
                          solutions for our platform.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons13">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide11 swiper-slide"
                        >
                            <div className="team14-card14">
                                <img
                                    alt={props.member5Alt}
                                    src={props.member5Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content15">
                                    <div className="team14-title14">
                                        <span>Full name</span>
                                        <span>
                      <span>Job title</span>
                                            {props.member5Job ?? (
                                                <Fragment>
                          <span className="team14-text74 thq-body-small">
                            Marketing Specialist
                          </span>
                                                </Fragment>
                                            )}
                    </span>
                                    </div>
                                    <span>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </span>
                                        {props.member5Content ?? (
                                            <Fragment>
                        <span className="team14-text82 thq-body-small">
                          Sarah drives our marketing efforts to reach more users
                          and drivers.
                        </span>
                                            </Fragment>
                                        )}
                  </span>
                                </div>
                                <div className="team14-social-icons14">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="team14-card15">
                                <img
                                    alt={props.member6Alt}
                                    src={props.member6Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content16">
                                    <div className="team14-title15">
                    <span>
                      <span>Full name</span>
                        {props.member6 ?? (
                            <Fragment>
                          <span className="team14-text85 thq-body-small">
                            Michael Wang
                          </span>
                            </Fragment>
                        )}
                    </span>
                                        <span>Job title</span>
                                    </div>
                                    <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius enim in eros elementum tristique.
                  </span>
                                </div>
                                <div className="team14-social-icons15">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="team14-card16">
                                <img
                                    alt={props.member7Alt}
                                    src={props.member7Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content17">
                                    <div className="team14-title16">
                    <span>
                      <span>Full name</span>
                        {props.member7 ?? (
                            <Fragment>
                          <span className="team14-text91 thq-body-small">
                            Olivia Garcia
                          </span>
                            </Fragment>
                        )}
                    </span>
                                        <span>Job title</span>
                                    </div>
                                    <span>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros elementum tristique.
                    </span>
                                        {props.member7Content ?? (
                                            <Fragment>
                        <span className="team14-text87 thq-body-small">
                          Olivia guarantees the quality and security of every
                          delivery made through our platform.
                        </span>
                                            </Fragment>
                                        )}
                  </span>
                                </div>
                                <div className="team14-social-icons16">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="team14-card17">
                                <img
                                    alt={props.member8Alt}
                                    src={props.member8Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content18">
                                    <div className="team14-title17">
                    <span>
                      {props.member8 ?? (
                          <Fragment>
                          <span className="team14-text79 thq-body-small">
                            Daniel Kim
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>Job title</span>
                                    </div>
                                    <span>
                    {props.member8Content ?? (
                        <Fragment>
                        <span className="team14-text97 thq-body-small">
                          Daniel explores new partnerships and opportunities to
                          expand our platform.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons17">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        data-thq="slider-pagination"
                        className="team14-slider-pagination1 swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
                    >
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet swiper-pagination-bullet-active"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                    </div>
                    <div
                        data-thq="slider-button-prev"
                        className="swiper-button-prev"
                    ></div>
                    <div
                        data-thq="slider-button-next"
                        className="swiper-button-next"
                    ></div>
                </div>
                <div
                    data-thq="slider"
                    data-navigation="true"
                    data-pagination="true"
                    className="team14-slider2 swiper"
                >
                    <div data-thq="slider-wrapper" className="swiper-wrapper">
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide12 swiper-slide"
                        >
                            <div className="team14-card18">
                                <img
                                    alt={props.member1Alt}
                                    src={props.member1Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content19">
                                    <div className="team14-title18">
                    <span>
                      <span>Full name</span>
                        {props.member1 ?? (
                            <Fragment>
                          <span className="team14-text92 thq-body-small">
                            Alice Smith
                          </span>
                            </Fragment>
                        )}
                    </span>
                                        <span>
                      {props.member1Job ?? (
                          <Fragment>
                          <span className="team14-text69 thq-body-small">
                            Co-Founder &amp; CEO
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member1Content ?? (
                        <Fragment>
                        <span className="team14-text89 thq-body-small">
                          Alice is a visionary leader with a passion for
                          innovation and customer satisfaction.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons18">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide13 swiper-slide"
                        >
                            <div className="team14-card19">
                                <img
                                    alt={props.member2Alt}
                                    src={props.member2Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content20">
                                    <div className="team14-title19">
                                        <span>Full name</span>
                                        <span>
                      {props.member2Job ?? (
                          <Fragment>
                          <span className="team14-text71 thq-body-small">
                            Head of Operations
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member2Content ?? (
                        <Fragment>
                        <span className="team14-text73 thq-body-small">
                          John ensures smooth operations and efficient delivery
                          processes.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons19">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide14 swiper-slide"
                        >
                            <div className="team14-card20">
                                <img
                                    alt={props.member3Alt}
                                    src={props.member3Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content21">
                                    <div className="team14-title20">
                    <span>
                      {props.member3 ?? (
                          <Fragment>
                          <span className="team14-text86 thq-body-small">
                            Emily Brown
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member3Job ?? (
                          <Fragment>
                          <span className="team14-text84 thq-body-small">
                            Customer Relations Manager
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member3Content ?? (
                        <Fragment>
                        <span className="team14-text72 thq-body-small">
                          Emily focuses on building strong relationships with
                          our users and drivers.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons20">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide15 swiper-slide"
                        >
                            <div className="team14-card21">
                                <img
                                    alt={props.member4Alt}
                                    src={props.member4Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content22">
                                    <div className="team14-title21">
                    <span>
                      {props.member4 ?? (
                          <Fragment>
                          <span className="team14-text70 thq-body-small">
                            David Lee
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member4Job ?? (
                          <Fragment>
                          <span className="team14-text90 thq-body-small">
                            Lead Developer
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member4Content ?? (
                        <Fragment>
                        <span className="team14-text80 thq-body-small">
                          David leads the tech team in creating cutting-edge
                          solutions for our platform.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons21">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide16 swiper-slide"
                        >
                            <div className="team14-card22">
                                <img
                                    alt={props.member5Alt}
                                    src={props.member5Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content23">
                                    <div className="team14-title22">
                    <span>
                      {props.member5 ?? (
                          <Fragment>
                          <span className="team14-text95 thq-body-small">
                            Sarah Johnson
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member5Job ?? (
                          <Fragment>
                          <span className="team14-text74 thq-body-small">
                            Marketing Specialist
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member5Content ?? (
                        <Fragment>
                        <span className="team14-text82 thq-body-small">
                          Sarah drives our marketing efforts to reach more users
                          and drivers.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons22">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide17 swiper-slide"
                        >
                            <div className="team14-card23">
                                <img
                                    alt={props.member6Alt}
                                    src={props.member6Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content24">
                                    <div className="team14-title23">
                    <span>
                      {props.member6 ?? (
                          <Fragment>
                          <span className="team14-text85 thq-body-small">
                            Michael Wang
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member6Job ?? (
                          <Fragment>
                          <span className="team14-text78 thq-body-small">
                            Finance Manager
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member6Content ?? (
                        <Fragment>
                        <span className="team14-text88 thq-body-small">
                          Michael ensures the financial stability and growth of
                          our platform.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons23">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide18 swiper-slide"
                        >
                            <div className="team14-card24">
                                <img
                                    alt={props.member7Alt}
                                    src={props.member7Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content25">
                                    <div className="team14-title24">
                    <span>
                      {props.member7 ?? (
                          <Fragment>
                          <span className="team14-text91 thq-body-small">
                            Olivia Garcia
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>Job title</span>
                                    </div>
                                    <span>
                    {props.member7Content ?? (
                        <Fragment>
                        <span className="team14-text87 thq-body-small">
                          Olivia guarantees the quality and security of every
                          delivery made through our platform.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons24">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div
                            data-thq="slider-slide"
                            className="team14-slider-slide19 swiper-slide"
                        >
                            <div className="team14-card25">
                                <img
                                    alt={props.member8Alt}
                                    src={props.member8Src}
                                    className="thq-img-ratio-1-1"
                                />
                                <div className="team14-content26">
                                    <div className="team14-title25">
                    <span>
                      {props.member8 ?? (
                          <Fragment>
                          <span className="team14-text79 thq-body-small">
                            Daniel Kim
                          </span>
                          </Fragment>
                      )}
                    </span>
                                        <span>
                      {props.member8Job ?? (
                          <Fragment>
                          <span className="team14-text93 thq-body-small">
                            Business Development Manager
                          </span>
                          </Fragment>
                      )}
                    </span>
                                    </div>
                                    <span>
                    {props.member8Content ?? (
                        <Fragment>
                        <span className="team14-text97 thq-body-small">
                          Daniel explores new partnerships and opportunities to
                          expand our platform.
                        </span>
                        </Fragment>
                    )}
                  </span>
                                </div>
                                <div className="team14-social-icons25">
                                    <svg
                                        viewBox="0 0 877.7142857142857 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M135.429 808h132v-396.571h-132v396.571zM276 289.143c-0.571-38.857-28.571-68.571-73.714-68.571s-74.857 29.714-74.857 68.571c0 37.714 28.571 68.571 73.143 68.571h0.571c46.286 0 74.857-30.857 74.857-68.571zM610.286 808h132v-227.429c0-121.714-65.143-178.286-152-178.286-70.857 0-102.286 39.429-119.429 66.857h1.143v-57.714h-132s1.714 37.143 0 396.571v0h132v-221.714c0-11.429 0.571-23.429 4-32 9.714-23.429 31.429-48 68-48 47.429 0 66.286 36 66.286 89.714v212zM877.714 237.714v548.571c0 90.857-73.714 164.571-164.571 164.571h-548.571c-90.857 0-164.571-73.714-164.571-164.571v-548.571c0-90.857 73.714-164.571 164.571-164.571h548.571c90.857 0 164.571 73.714 164.571 164.571z"></path>
                                    </svg>
                                    <svg
                                        viewBox="0 0 950.8571428571428 1024"
                                        className="thq-icon-small"
                                    >
                                        <path
                                            d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        data-thq="slider-pagination"
                        className="team14-slider-pagination2 swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"
                    >
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet swiper-pagination-bullet-active"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                        <div
                            data-thq="slider-pagination-bullet"
                            className="swiper-pagination-bullet"
                        ></div>
                    </div>
                    <div
                        data-thq="slider-button-prev"
                        className="swiper-button-prev"
                    ></div>
                    <div
                        data-thq="slider-button-next"
                        className="swiper-button-next"
                    ></div>
                </div>
            </div>
        </div>
    )
}

Team14.defaultProps = {
    member8Src:
        'https://images.unsplash.com/photo-1510582029005-689cfc56b48c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMXw&ixlib=rb-4.0.3&q=80&w=1080',
    actionContent: undefined,
    member1Job: undefined,
    member4: undefined,
    member7Alt: 'Image of Olivia Garcia',
    member2Job: undefined,
    member3Src:
        'https://images.unsplash.com/photo-1658027076409-edf5df5c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMXw&ixlib=rb-4.0.3&q=80&w=1080',
    member1Src:
        'https://images.unsplash.com/photo-1634309490604-1270c0d486e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    member3Content: undefined,
    member3Alt: 'Image of Emily Brown',
    member2Content: undefined,
    member5Job: undefined,
    content2: undefined,
    member6Job: undefined,
    member4Alt: 'Image of David Lee',
    member8: undefined,
    member4Content: undefined,
    member2: undefined,
    member5Content: undefined,
    content1: undefined,
    member3Job: undefined,
    member7Src:
        'https://images.unsplash.com/photo-1413847394921-b259543f4872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMXw&ixlib=rb-4.0.3&q=80&w=1080',
    member6: undefined,
    member3: undefined,
    member7Content: undefined,
    member8Alt: 'Image of Daniel Kim',
    member6Content: undefined,
    member2Alt: 'Image of John Doe',
    member1Content: undefined,
    member4Job: undefined,
    member1Alt: 'Image of Alice Smith',
    member2Src:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    member7: undefined,
    member5Alt: 'Image of Sarah Johnson',
    member1: undefined,
    member6Src:
        'https://images.unsplash.com/photo-1475563011407-6bf489b1c361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMXw&ixlib=rb-4.0.3&q=80&w=1080',
    member8Job: undefined,
    member7Job: undefined,
    member4Src:
        'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMXw&ixlib=rb-4.0.3&q=80&w=1080',
    member5: undefined,
    member5Src:
        'https://images.unsplash.com/photo-1505302548595-187075e7cdb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNzUzMHw&ixlib=rb-4.0.3&q=80&w=1080',
    heading1: undefined,
    member6Alt: 'Image of Michael Wang',
    member8Content: undefined,
}

Team14.propTypes = {
    member8Src: PropTypes.string,
    actionContent: PropTypes.element,
    member1Job: PropTypes.element,
    member4: PropTypes.element,
    member7Alt: PropTypes.string,
    member2Job: PropTypes.element,
    member3Src: PropTypes.string,
    member1Src: PropTypes.string,
    member3Content: PropTypes.element,
    member3Alt: PropTypes.string,
    member2Content: PropTypes.element,
    member5Job: PropTypes.element,
    content2: PropTypes.element,
    member6Job: PropTypes.element,
    member4Alt: PropTypes.string,
    member8: PropTypes.element,
    member4Content: PropTypes.element,
    member2: PropTypes.element,
    member5Content: PropTypes.element,
    content1: PropTypes.element,
    member3Job: PropTypes.element,
    member7Src: PropTypes.string,
    member6: PropTypes.element,
    member3: PropTypes.element,
    member7Content: PropTypes.element,
    member8Alt: PropTypes.string,
    member6Content: PropTypes.element,
    member2Alt: PropTypes.string,
    member1Content: PropTypes.element,
    member4Job: PropTypes.element,
    member1Alt: PropTypes.string,
    member2Src: PropTypes.string,
    member7: PropTypes.element,
    member5Alt: PropTypes.string,
    member1: PropTypes.element,
    member6Src: PropTypes.string,
    member8Job: PropTypes.element,
    member7Job: PropTypes.element,
    member4Src: PropTypes.string,
    member5: PropTypes.element,
    member5Src: PropTypes.string,
    heading1: PropTypes.element,
    member6Alt: PropTypes.string,
    member8Content: PropTypes.element,
}

export default Team14
