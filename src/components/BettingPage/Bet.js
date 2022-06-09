import React, { useEffect, useState } from "react";
import axios from "axios";
import { insertGameData } from "../../api/betApi";
import './Bet.css'
import { useNavigate } from "react-router-dom"
const Bet = (props) => {

    const nav = useNavigate();

    const [moneyTerm, setMoneyTerm] = useState('')
    const [teamChosen, setTeamChosen] = useState(null);
    const [betComplete, setBetComplete] = useState(false);
    const [gameData , setGameData] = useState(JSON.parse(localStorage.getItem('game')));
    const [userDeatails , setUserDeatails] = useState(JSON.parse(localStorage.getItem('userDeatails')));
    const [moneyLine,SetMoneyLine] = useState(null)
    
    const handleChange = (e) => {
        setMoneyTerm(e.target.value)

    }

    const checkPosible = async () => {
        try {

            const { data } = await axios.get(`https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData`);
        
            const isAlreadyBet = data.find(bet => {
               
                if (bet.GameID === gameData.GameID && bet.userName === userDeatails.name) {
                    return true;
                }
            })

            console.log(isAlreadyBet)
            if (isAlreadyBet) {
                alert('you already bet on the game')
            }
            else {
                setBetComplete(true)
                bet();
                nav("/user")
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {


      


    })
    // https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData
    const bet = async () => {

        console.log(`props.game: ${props.game}`)

        const betObject = {
            userName: userDeatails.name  ,
            GameID: gameData.GameID,
            onTeam: teamChosen,
            DateTime: gameData.DateTime,
            money: moneyTerm,
            IsClosed: false,
            moneyLine : moneyLine
        }
        try {

            const { data } = await axios.post(`https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData`, betObject)
            console.log(data);
            const array = userDeatails.userData.betsID
            array.push(data.ID)
            const updatedUser = {
                ...userDeatails.userData,
                betsID: array
            }

            const postedUpdate = await axios.put(`https://629deee9c6ef9335c0aa8da0.mockapi.io/users/${props.userDeatails.userData.id}`, updatedUser)
            console.log(postedUpdate);
            const loginDeatails = {
                userData: updatedUser,
                name: userDeatails.userData.userName,
                id: userDeatails.userData.id
            }

            localStorage.setItem('userDeatails', JSON.stringify(loginDeatails));
        } catch (e) {
            console.log(e.message)
        }

    }

    const handleSelect = (e) => {
        setTeamChosen(e.target.value)
        if(gameData.AwayTeam === e.target.value){
            SetMoneyLine(gameData.AwayTeamMoneyLine)
        }
        else{
            SetMoneyLine(gameData.HomeTeamMoneyLine)
        }
    }

    if(betComplete){
        return(
            <div className="bet-container">
                <h1>you successfull bet on this game </h1>
                <h1> check it on your user section</h1>

            </div>
        )
    }


    return (
        <div className="bet-page-container">
        <div className="bet-container">
            {insertGameData(gameData)}
            <label>
                <h2>Money ammout</h2>
            </label>
            <input className="form-control form-control-sms" onChange={e => { handleChange(e) }} value={moneyTerm}></input>
            <label htmlFor="bet">Choose a team:</label>
            <select className="form-select"  onClick={e => { handleSelect(e) }} id="bet" name="cars">
                <option value={null}  >select team </option>
                <option value={gameData.AwayTeam}>{gameData.AwayTeam}</option>
                <option value={gameData.HomeTeam}>{gameData.HomeTeam}</option>

            </select>

            <button className="button-6" onClick={checkPosible}>bet</button>
        </div>
        </div>
    )
}

export default Bet;