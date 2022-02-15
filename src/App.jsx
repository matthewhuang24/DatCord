import React, {useState} from 'react';
import './style.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Login from './components/Login'
import SignUp from './components/SignUp';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="signup" element={ <SignUp /> } />
                <Route exact path="login" element={<Login setLoginId /> } />
            </Routes>
        </BrowserRouter> 
    )
}

export default App;