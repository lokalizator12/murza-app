import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";

import Home from "./pages/home/home";
import Success from "./pages/Success";
import About from "./pages/about/about";
import './style.css'
import Legal from "./pages/legal/legal";
import NotFound from "./pages/not-found/not-found";
import SignUp from "./pages/register/sign-up";
import SignIn1 from "./pages/login/SignIn1";
import MainPage from "./pages/main/MainPage";
import 'mapbox-gl/dist/mapbox-gl.css';
import RequestForm from "./pages/test-wizard/MainFormRequest";
import ProfilePage from "./pages/profile/ProfilePage";
import {AuthProvider} from "./context/AuthContext";
import Navbar8 from "./components/navbar8";

function AppContent() {
    const location = useLocation(); // Получаем текущий путь

    // Путь, на котором навбар не должен отображаться
    const hideNavbarOnRoutes = ["/login", "/register", "*"];
    const shouldHideNavbar = hideNavbarOnRoutes.some((path) => location.pathname.startsWith(path));


    return (
        <>
            {!shouldHideNavbar && <Navbar8/>}
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/request" element={<RequestForm/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<SignIn1/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/legal" element={<Legal/>}/>
                <Route
                    path="/profile/:userId"
                    element={

                        <ProfilePage/>

                    }
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent/>
            </Router>
        </AuthProvider>
    );
}

export default App;