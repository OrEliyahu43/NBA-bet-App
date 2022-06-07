import React, { useState } from "react";
import UpComingGames from "../UpComingGames/UpComingGames.js";
import Navbar from "../Navbar/Navbar";
import './HomePage.css'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from '../Login/Login.js'
import User from "../User/User.js";
import Register from "../Register/Register.js";
import { createContext } from "react";
import Bet from "../BettingPage/Bet.js";

const HomePage = () => {

    const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('isLogedIn'));
    const [userDeatails,setUserDeatails] = useState(null)
    const [betDeatails, setBetDeatails] = useState(null);
    

    const handleLogin = (bool,objDeatails) => {
        setUserDeatails(objDeatails);
        setIsLogedIn(bool);
    }
    return (

        <div>
            <Navbar setIsLogedIn={setIsLogedIn} isLogedIn={isLogedIn} />
            <Routes>
                <Route path="/" exact element={<UpComingGames updateParent={setBetDeatails} isLogedIn={isLogedIn}/>} />
                <Route path="/login" exact element={<Login login={handleLogin} />} />
                <Route path="/user" exact element={<User isLogedIn={isLogedIn}/>} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/bet" exact element={<Bet userDeatails={userDeatails} isLogedIn={isLogedIn} game={betDeatails}   />} />
            </Routes>
        </div>
    )

}

export default HomePage;