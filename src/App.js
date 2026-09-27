import React, {Suspense} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';

import Home from "./pages/home/home";
import Success from "./pages/Success";
import About from "./pages/about/about";
import './style.css'
import './styles/murza.css'
import Legal from "./pages/legal/legal";
import NotFound from "./pages/not-found/not-found";
import 'mapbox-gl/dist/mapbox-gl.css';
import {AuthProvider} from "./context/AuthContext";
import Navbar8 from "./components/navbar8";
import MurzaGuide from "./components/MurzaGuide";
import PrivateRoute from "./services/PrivateRoute";
import Activate from "./pages/register/Activate";
const SignUp = React.lazy(() => import('./pages/register/sign-up'));
const SignIn1 = React.lazy(() => import('./pages/login/SignIn1'));
const MainPage = React.lazy(() => import('./pages/main/MainPage'));
const ProfilePage = React.lazy(() => import('./pages/profile/ProfilePage'));
const ChatPage = React.lazy(() => import('./components/chat/ChatPage'));
const ConversationList = React.lazy(() => import('./components/chat/Conversations/ConversationList'));
const ResetPassword = React.lazy(() => import('./pages/login/ResetPassword'));

function AppContent() {
    const location = useLocation(); // Получаем текущий путь

    // Путь, на котором навбар не должен отображаться
    const hideNavbarOnRoutes = ["/login", "/register"];
    const shouldHideNavbar = hideNavbarOnRoutes.some((path) => location.pathname.startsWith(path));


    return (
        <>
            {!shouldHideNavbar && <Navbar8/>}
            <Suspense fallback={<div className="murza-route-loading" role="status">Murza is getting things ready…</div>}>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/main" element={<PrivateRoute><MainPage/></PrivateRoute>}/>
                <Route path="/request" element={<Navigate to="/main?create=parcel" replace/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<SignIn1/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/about" element={<About/>}/>
                <Route
                    path="/chat/:userId"
                    element={
                        <PrivateRoute>
                            <ChatPage/>
                        </PrivateRoute>
                    }
                />
                <Route path="/legal" element={<Legal/>}/>

                <Route
                    path="/profile/:userId"
                    element={
                        <PrivateRoute><ProfilePage/></PrivateRoute>
                    }
                />
                <Route
                    path="/inbox"
                    element={
                        <PrivateRoute>
                            <ConversationList/>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound/>}/>
                <Route path="/activate" element={<Activate/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
            </Suspense>
            <MurzaGuide/>
        </>
    );
}

function App() {
    const theme = createTheme({
        palette: {primary: {main: '#62442e'}, secondary: {main: '#547568'}},
        typography: {fontFamily: 'Arial, Helvetica, sans-serif'},
        shape: {borderRadius: 12}
    });
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <AppContent/>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
