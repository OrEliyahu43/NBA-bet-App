import React, { useEffect } from "react";
import { Link, Router } from "react-router-dom";
import Nba_logo from '../../assets/images/Nba_logo.png'
import './Navbar.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {



    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const nav = useNavigate();


    useEffect(() => {


        if (props.isLogedIn) {
            setIsUserLoggedIn(true)
        }


    }, [props.isLogedIn]);

    const logout = () => {
        localStorage.removeItem('isLogedIn')
        localStorage.removeItem('userName')
        localStorage.removeItem('id')
        localStorage.removeItem('userDeatails')
        localStorage.removeItem('game')
        setIsUserLoggedIn(false)
        props.setIsLogedIn(null);
        nav("/login");
    }

    return (
        <nav className="main-navbar">
            <div className="logo-container">
                <img className="nba-logo" src={Nba_logo}></img>
                <h2>NBA-betting-analyzer</h2>
            </div>
            <ul className="list-container">


                <li className="list-container-item">
                    {isUserLoggedIn === false ? <Link to="/login" className="disable-active">Login</Link> : <span onClick={logout}>Logout</span>}
                </li>
                <li className="list-container-item"><Link to="/" className="disable-active">Home</Link></li>
                <li className="list-container-item"><Link to="/user" className="disable-active">User</Link></li>

            </ul>
        </nav>
    )
}

export default Navbar