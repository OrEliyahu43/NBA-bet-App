import React, { useEffect, useState } from "react";
import './Register.css'
import axios, { Axios } from "axios";
import bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



const Register = () => {

    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: '',
        verifyPassword: ''
    })
    const [users, setUsers] = useState([])
    const [isRegistered, setIsRegistered] = useState(false)

    const getUsersNames = async () => {
        const { data } = await axios.get('https://629deee9c6ef9335c0aa8da0.mockapi.io/users')
        setUsers(data);
    }

    const checkUser = (username) => {
        const availble = users.some(user => {
            if (username === user.userName) {
                console.log(userInfo.userName)
                return true;
            }
        })
        return (!availble);
    }

    const createUser = async (e) => {
        e.preventDefault()
        const availble = checkUser(userInfo.userName)
        if (availble && userInfo.userName !== '' & userInfo.password != '') {
            try {
                const newUser = {
                    userName: userInfo.userName,
                    password: userInfo.password,
                    earnedMoney : 0,
                    looseMoney : 0,
                    success : 0,
                    bestTeams:null,
                }
                const postedData = await axios.post('https://629deee9c6ef9335c0aa8da0.mockapi.io/users', newUser)
                console.log(postedData)
                console.log(userInfo)
                setIsRegistered(true)
            } catch (e) {
                console.log(e.message)
            }
        }
        else {
            alert("user name not avaible or empty fields")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('https://629deee9c6ef9335c0aa8da0.mockapi.io/users')
            console.log(data)
            setUsers(data);
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

    if (isRegistered) {
        return (
            <div>
                <h1>welcome!</h1>
                <h1>you succesful registerd!</h1>
            </div>
        )
    }


    return (
        <div className="register">
            <div className="form-container">
                <h2>Register</h2>
                <form className="form">
                    <label>User Name</label>
                    <input className="form-control form-control-sm" name="userName" onChange={e => { inputHandler(e) }} value={userInfo.userName} type="text"></input>
                    <label>password</label>
                    <input className="form-control form-control-sm" name="password" onChange={e => { inputHandler(e) }} value={userInfo.password} type="password"></input>
                    <label>password verify</label>
                    <input className="form-control form-control-sm" name="verifyPassword" onChange={e => { inputHandler(e) }} value={userInfo.verifyPassword} type="password"></input>

                    <button className="button-6" onClick={e => { createUser(e) }} >Create account</button>
                </form>
            </div>
        </div>
    )

}

export default Register