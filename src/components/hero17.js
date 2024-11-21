import React, {Fragment} from 'react'

import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'

import './hero17.css'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Hero17 = (props) => {


    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleFindDriverClick = () => {
        if (isAuthenticated) {
            navigate('/main');
        } else {
            navigate('/login');
        }
    };

    const handleFindParcelClick = () => {
        if (isAuthenticated) {
            navigate('/main');
        } else {
            navigate('/login'); // Navigate to the login page
        }
    };
    return (
        <div className="hero17-header78">
            <div className="hero17-column thq-section-padding thq-section-max-width">
                <div className="hero17-content1">
                    <h1 className="hero17-text1 thq-heading-1">
                        {props.heading1 ?? (
                            <Fragment>
                                <span className="hero17-text7">a</span>
                            </Fragment>
                        )}
                    </h1>
                    <p className="hero17-text2 thq-body-large">
                        {props.content1 ?? (
                            <Fragment>
                                <span className="hero17-text8">a</span>
                            </Fragment>
                        )}
                    </p>
                </div>
                <div className="hero17-actions">
                    <button className="thq-button-filled hero17-button1" onClick={handleFindParcelClick}>
            <span className="thq-body-small">
              {props.action1 ?? (
                  <Fragment>
                      <span className="hero17-text6">a</span>
                  </Fragment>
              )}
            </span>
                    </button>
                    <button className="thq-button-outline hero17-button2" onClick={handleFindDriverClick}>
            <span className="thq-body-small">
              {props.action2 ?? (
                  <Fragment>
                      <span className="hero17-text5">a</span>
                  </Fragment>
              )}
            </span>
                    </button>
                </div>
            </div>
            <div className="hero17-content2">
                <div
                    className="hero17-row-container1 thq-animated-group-container-horizontal thq-mask-image-horizontal">
                    <div className="thq-animated-group-horizontal">
                        <img
                            alt={props.image1Alt}
                            src={props.image1Src}
                            className="hero17-placeholder-image10 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image2Alt}
                            src={props.image2Src}
                            className="hero17-placeholder-image11 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image3Alt}
                            src={props.image3Src}
                            className="hero17-placeholder-image12 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image4Alt}
                            src={props.image4Src}
                            className="hero17-placeholder-image13 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image5Alt}
                            src={props.image5Src}
                            className="hero17-placeholder-image14 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image6Alt}
                            src={props.image6Src}
                            className="hero17-placeholder-image15 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                    <div className="thq-animated-group-horizontal">
                        <img
                            alt={props.image1Alt}
                            src={props.image1Src}
                            className="hero17-placeholder-image16 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image2Alt}
                            src={props.image2Src}
                            className="hero17-placeholder-image17 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image3Alt}
                            src={props.image3Src}
                            className="hero17-placeholder-image18 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image4Alt}
                            src={props.image4Src}
                            className="hero17-placeholder-image19 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image5Alt}
                            src={props.image5Src}
                            className="hero17-placeholder-image20 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="Hero Image"
                            src="https://images.unsplash.com/photo-1534312527009-56c7016453e6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIxfHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&amp;ixlib=rb-4.0.3&amp;w=1500"
                            className="hero17-placeholder-image21 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                </div>
                <div
                    className="hero17-row-container2 thq-animated-group-container-horizontal thq-mask-image-horizontal">
                    <div className="thq-animated-group-horizontal-reverse">
                        <img
                            alt={props.image7Alt}
                            src={props.image7Src}
                            className="hero17-placeholder-image22 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image8Alt}
                            src={props.image8Src}
                            className="hero17-placeholder-image23 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image9Alt}
                            src={props.image9Src}
                            className="hero17-placeholder-image24 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image10Alt}
                            src={props.image10Src}
                            className="hero17-placeholder-image25 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image11Alt}
                            src={props.image11Src}
                            className="hero17-placeholder-image26 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image12Alt}
                            src={props.image12Src}
                            className="hero17-placeholder-image27 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                    <div className="thq-animated-group-horizontal-reverse">
                        <img
                            alt={props.image7Alt}
                            src={props.image7Src}
                            className="hero17-placeholder-image28 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image8Alt}
                            src={props.image8Src}
                            className="hero17-placeholder-image29 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image9Alt}
                            src={props.image9Src}
                            className="hero17-placeholder-image30 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image10Alt}
                            src={props.image10Src}
                            className="hero17-placeholder-image31 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt={props.image11Alt}
                            src={props.image11Src}
                            className="hero17-placeholder-image32 thq-img-scale thq-img-ratio-1-1"
                        />
                        <img
                            alt="Hero Image"
                            src="https://images.unsplash.com/photo-1568214379698-8aeb8c6c6ac8?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEyfHxncmFmaWN8ZW58MHx8fHwxNzE1Nzk0OTk5fDA&amp;ixlib=rb-4.0.3&amp;w=1500"
                            className="hero17-placeholder-image33 thq-img-scale thq-img-ratio-1-1"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="hero17-container2">
                    <Script
                        html={`<style>
  @keyframes scroll-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 16px));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - 16px));
    }
  }
</style>
`}
                    ></Script>
                </div>
            </div>
        </div>
    )
}

Hero17.defaultProps = {
    image3Src:
        'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5M3w&ixlib=rb-4.0.3&q=80&w=1080',
    image8Alt: 'Hero Image',
    image2Src:
        'https://images.unsplash.com/photo-1633838067288-808f810e0681?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5M3w&ixlib=rb-4.0.3&q=80&w=1080',
    image6Alt: 'Hero Image',
    image11Src:
        'https://images.unsplash.com/photo-1524169358666-79f22534bc6e?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDI3fHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&ixlib=rb-4.0.3&w=1500',
    image5Alt: 'Hero Image',
    image1Alt: 'image',
    image7Src:
        'https://images.unsplash.com/photo-1536254305839-311d57dce311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5NHw&ixlib=rb-4.0.3&q=80&w=1080',
    image7Alt: 'Hero Image',
    image12Alt: 'Hero Image',
    image2Alt: 'Hero Image',
    image6Src:
        'https://images.unsplash.com/photo-1694878981819-1084b2d7dd0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5NHw&ixlib=rb-4.0.3&q=80&w=1080',
    image12Src:
        'https://images.unsplash.com/photo-1568214379698-8aeb8c6c6ac8?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEyfHxncmFmaWN8ZW58MHx8fHwxNzE1Nzk0OTk5fDA&ixlib=rb-4.0.3&w=1500',
    image3Alt: 'Hero Image',
    image9Src:
        'https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDExfHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&ixlib=rb-4.0.3&w=1500',
    image11Alt: 'Hero Image',
    action2: undefined,
    action1: undefined,
    image8Src:
        'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEwfHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&ixlib=rb-4.0.3&w=1500',
    image5Src:
        'https://images.unsplash.com/photo-1686535916782-a5208e6a94c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5NHw&ixlib=rb-4.0.3&q=80&w=1080',
    image4Src:
        'https://images.unsplash.com/photo-1647982450179-018d6b61eafa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE5M3w&ixlib=rb-4.0.3&q=80&w=1080',
    image10Alt: 'Hero Image',
    image4Alt: 'Hero Image',
    heading1: undefined,
    content1: undefined,
    image10Src:
        'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDI0fHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&ixlib=rb-4.0.3&w=1500',
    image9Alt: 'Hero Image',
    image1Src:
        'https://images.unsplash.com/photo-1473773386757-42bbe7288351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyOTcwNjE1OXw&ixlib=rb-4.0.3&q=80&w=1080',
}

Hero17.propTypes = {
    image3Src: PropTypes.string,
    image8Alt: PropTypes.string,
    image2Src: PropTypes.string,
    image6Alt: PropTypes.string,
    image11Src: PropTypes.string,
    image5Alt: PropTypes.string,
    image1Alt: PropTypes.string,
    image7Src: PropTypes.string,
    image7Alt: PropTypes.string,
    image12Alt: PropTypes.string,
    image2Alt: PropTypes.string,
    image6Src: PropTypes.string,
    image12Src: PropTypes.string,
    image3Alt: PropTypes.string,
    image9Src: PropTypes.string,
    image11Alt: PropTypes.string,
    action2: PropTypes.element,
    action1: PropTypes.element,
    image8Src: PropTypes.string,
    image5Src: PropTypes.string,
    image4Src: PropTypes.string,
    image10Alt: PropTypes.string,
    image4Alt: PropTypes.string,
    heading1: PropTypes.element,
    content1: PropTypes.element,
    image10Src: PropTypes.string,
    image9Alt: PropTypes.string,
    image1Src: PropTypes.string,
}

export default Hero17
