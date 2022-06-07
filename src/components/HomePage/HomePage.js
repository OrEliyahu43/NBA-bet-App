import React, { useState } from "react";
import UpComingGames from "../UpComingGames/UpComingGames.js";
import Navbar from "../Navbar/Navbar";
import './HomePage.css'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from '../Login/Login.js'
import User from "../User/User.js";
import Register from "../Register/Register.js";
import { createContext } from "react";

const HomePage = () => {

    const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('isLogedIn'));
    const handleLogin = (bool) => {

        setIsLogedIn(bool);
    }
    return (

        <div>
            <Navbar setIsLogedIn={setIsLogedIn} isLogedIn={isLogedIn} />
            <Routes>
                <Route path="/" exact element={<UpComingGames/>} />
                <Route path="/login" exact element={<Login login={handleLogin} />} />
                <Route path="/user" exact element={<User isLogedIn={isLogedIn}/>} />
                <Route path="/register" exact element={<Register />} />
            </Routes>
        </div>
    )

}

export default HomePage;