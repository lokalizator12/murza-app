import React from 'react'

import {Helmet} from 'react-helmet'
import {Link} from 'react-router-dom'

import './not-found.css'

const NotFound = (props) => {
    return (
        <div className="not-found-container1">
            <Helmet>
                <title>404 - Not Found</title>
            </Helmet>
            <h3>Murza couldn't find this route</h3>
            <div className="not-found-container2">
                <h1 className="not-found-text2">404</h1>
            </div>
            <div className="not-found-container3">
                <h2 className="not-found-text3">
                    The page you requested isn't here.
                </h2>
            </div>
            <Link className="murza-button" to="/">Back to Murza</Link>
        </div>
    )
}

export default NotFound
