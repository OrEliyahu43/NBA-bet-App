import React from "react";
import { Link, Router } from "react-router-dom";
import Nba_logo from '../../assets/images/Nba_logo.png'
import './Navbar.css'
const Navbar = () => {




    return (
        <nav className="main-navbar">
            <img className="nba-logo" src={Nba_logo}></img>
            <ul className="list-container">


                <li className="list-container-item"><Link to="/login" className="disable-active">Login</Link></li>
                <li className="list-container-item"><Link to="/homePage" className="disable-active">HomePage</Link></li>
                <li className="list-container-item"><Link to="/user" className="disable-active">User</Link></li>

            </ul>
        </nav>
    )
}

export default Navbar