import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./pages/home/home";
import Success from "./pages/Success";
import About from "./pages/about/about";
import './style.css'
import Legal from "./pages/legal/legal";
import NotFound from "./pages/not-found/not-found";
import SignUp from "./pages/register/sign-up";
import SignIn1 from "./pages/login/SignIn1";
import MapboxExample from "./pages/test-map";
import MainPage from "./pages/main/MainPage";
import 'mapbox-gl/dist/mapbox-gl.css';
import RequestForm from "./pages/test-wizard/MainFormRequest";


function App() {
    return (
        <Router>
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
                <Route path="/example" element={<MapboxExample/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;