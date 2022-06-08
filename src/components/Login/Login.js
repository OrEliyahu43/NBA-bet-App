import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './Login.css'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: '',

    })

    const [users, setUsers] = useState([])

    const nav = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try{

                const { data } = await axios.get('https://629deee9c6ef9335c0aa8da0.mockapi.io/users')
                console.log(data)
                setUsers(data);
            }catch(e){
                console.log(e.message);
            }
        }
        fetchData();
    }, [])

    const inputHandler = (e) => {
        const value = e.target.value
        setUserInfo({
            ...userInfo,
            [e.target.name]: value
        })
    }

    const loginCheck = (e) => {
        e.preventDefault()
        const loginUser = users.find(user => {
            return (user.userName === userInfo.userName && user.password === userInfo.password)
        })
        console.log(loginUser)
        if (loginUser) {
            localStorage.setItem('isLogedIn', true)
            localStorage.setItem('userName', loginUser.userName)
            localStorage.setItem('id', loginUser.id)
            alert('succes login!')
            const loginDeatails ={
                userData: loginUser,
                name: loginUser.userName,
                id: loginUser.id
            }
            props.login(true,loginDeatails)
            nav("/");
        }
        else {
            alert('incorrect deatils')
        }
    }



    return (
        <div className="login">
            <div className="form-container">
                <h2>Login</h2>
                <form className="form">
                    <label>User Name</label>
                    <input className="form-control form-control-sm" name="userName" onChange={e => { inputHandler(e) }} value={userInfo.userName} type="text"></input>
                    <label>password</label>
                    <input className="form-control form-control-sm" name="password" onChange={e => { inputHandler(e) }} value={userInfo.password} type="text"></input>


                    <button className="button-6" onClick={e => { loginCheck(e) }} >Login</button>
                </form>

                <p className="create-user"><Link to="/register">Sign up</Link></p>

            </div>
        </div>
    )
}

export default Login