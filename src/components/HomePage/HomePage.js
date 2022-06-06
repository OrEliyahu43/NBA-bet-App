import React from "react";
import UpComingGames from "../UpComingGames/UpComingGames.js";
import Navbar from "../Navbar/Navbar";
import './HomePage.css'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from '../Login/Login.js'
import User from "../MyUser/User.js";
import Register from "../Register/Register.js";

const HomePage = () => {





    return (

        <div>
            <Navbar />
            <Routes>
                <Route path="/" exact />
                <Route path="/login" exact element={<Login />} />
                <Route path="/user" exact element={<User/>} />
                <Route path="/register" exact element={<Register/>} />
            </Routes>
        </div>
    )

}

export default HomePage;