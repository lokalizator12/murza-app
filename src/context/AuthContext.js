import React, {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import axios from '../axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = () => {
        console.error('setIsAuthenticated true:');
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');

            Cookies.remove('token');

            setIsAuthenticated(false);

            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
