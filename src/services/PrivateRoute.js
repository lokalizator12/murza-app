// PrivateRoute.js
import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    const next = encodeURIComponent(location.pathname + location.search);
    return isAuthenticated ? children : <Navigate to={`/login?next=${next}`} replace/>;
};

export default PrivateRoute;
