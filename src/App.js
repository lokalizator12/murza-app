import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./pages/home/home";
import Success from "./pages/Success";
import About from "./pages/about/about";
import './style.css'
import Legal from "./pages/legal/legal";
import NotFound from "./pages/not-found/not-found";
import AppMap from "./pages/Main";
import SignUp from "./pages/register/sign-up";
import SignIn1 from "./pages/login/SignIn1";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/Map" element={<AppMap/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<SignIn1/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/success" element={<Success/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/legal" element={<Legal/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;