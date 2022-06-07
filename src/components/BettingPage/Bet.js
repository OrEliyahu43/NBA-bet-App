import React, { useEffect, useState } from "react";
import axios from "axios";
import { insertGameData } from "../../api/betApi";
import './Bet.css'
const Bet = (props) => {


    const [moneyTerm, setMoneyTerm] = useState('')
    const [teamChosen, setTeamChosen] = useState(null);
    console.log(props.game)
    const handleChange = (e) => {
        setMoneyTerm(e.target.value)

    }

    const checkPosible = async () => {
        try {

            const { data } = await axios.get(`https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData`);
        
            const isAlreadyBet = data.find(bet => {
                console.log('start')
                console.log(bet.gameID)
                console.log(props.game.GameID)
                console.log(bet.userName)
                console.log(props.userDeatails.name)
                if (bet.gameID === props.game.GameID && bet.userName === props.userDeatails.name) {
                    return true;
                }
            })
            console.log(`isAlreadyBet:${isAlreadyBet}`)
            if (isAlreadyBet) {
                alert('you already bet on the game')
            }
            else {
                bet();
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
            userName: props.userDeatails.name,
            gameID: props.game.GameID,
            onTeam: teamChosen,
            DateTime: props.game.DateTime,
            money: moneyTerm,
            IsClosed: false,
        }
        try {

            const { data } = await axios.post(`https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData`, betObject)
            console.log(data);
            const updateUser = {
                ...props.userDeatails.userData,
                betID: props.userDeatails.userData.betsID.push(data.ID)
            }
            const postedUpdate = await axios.put(`https://629deee9c6ef9335c0aa8da0.mockapi.io/users/${props.userDeatails.userData.id}`, updateUser)
        } catch (e) {
            console.log(e.message)
        }

    }

    const handleSelect = (e) => {
        setTeamChosen(e.target.value)
    }


    return (
        <div className="bet-container">
            {insertGameData(props.game)}
            <label>
                <h2>Money ammout</h2>
            </label>
            <input onChange={e => { handleChange(e) }} value={moneyTerm}></input>
            <label for="bet">Choose a team:</label>
            <select onClick={e => { handleSelect(e) }} id="bet" name="cars">
                <option value={props.game.AwayTeam}>{props.game.AwayTeam}</option>
                <option value={props.game.HomeTeam}>{props.game.HomeTeam}</option>

            </select>

            <button onClick={checkPosible}>bet</button>
        </div>
    )
}

export default Bet;