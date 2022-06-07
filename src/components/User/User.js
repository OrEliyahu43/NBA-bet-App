import React, { useEffect } from "react";
import './User.css'
import { useState } from "react";


const User = (props) => {

    const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('isLogedIn'));



    useEffect(() => {

        setIsLogedIn(props.isLogedIn)

    },[props.isLogedIn])


    return(
        <div className="user">
           {isLogedIn ? <h1>hi user</h1> : <h1>login first</h1>}
        </div>
    )
}

export default User