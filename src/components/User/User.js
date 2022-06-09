import React, { useEffect } from "react";
import './User.css'
import { useState } from "react";
import axios from "axios";
import { getStringDate } from "../../api/gamesInfo";
import { gamesByDate } from "../../api/gamesInfo";
import { insertGamesData } from "../../api/userApi";

const User = (props) => {

    const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('isLogedIn'));
    const [userDeatails, setUserDeatails] = useState(JSON.parse(localStorage.getItem('userDeatails')))
    const [analysisFinish,setAnalysisFinish ] = useState(false)
    const [spinner, setSpinner] = useState(true)
    const [winBetsDisplay, setWinBetsDisplay] = useState([])
    const [looseBetsDisplay, setLooseBetsDisplay] = useState([])
    const [waitingBetsDisplay, setWatingBetsDisplay] = useState([])
    
    const insertAllGames = () => {
        if(userDeatails.userData.winBetsID.length !== 0){

            setWinBetsDisplay(prev => {insertGamesData(userDeatails.userData.winBetsID)})
            
        }
        
        if(userDeatails.userData.looseBetsID.length !== 0 ){
            
            setLooseBetsDisplay(prev => {insertGamesData(userDeatails.userData.looseBetsID)})
        }

        if(userDeatails.userData.looseBetsID.length !== 0 ){
            
            setWatingBetsDisplay(prev => {insertGamesData(userDeatails.userData.waitingBets)})
        }
        setSpinner(false)


    }


    const analysisMoney = (monyline, money) => {
        let earn;
        if (monyline > 0) {
            earn = (money / 100) * monyline;
        }
        else {
            earn = (money / Math.abs(monyline)) * 100;
        }
        return earn;
    }



    const analyze = async () => {
        const betsData = userDeatails.userData.betsID;
        const waitingBets =[]
        const winBets = []
        const looseBets = []
        let earn = 0;
        let loose = 0;
        for (let i = 0; i < betsData.length; i++) {
            const betid = betsData[i];
            console.log(`betid:${betid}`)
            try {
                const { data } = await axios.get(`https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData/${betid}`)
                console.log(data)
                const dateGame = new Date(data.DateTime);
                const stringDate = getStringDate(dateGame);
                console.log('requesttttt')
                
                const alldateGames = await gamesByDate(stringDate);
                for (let j = 0; j < alldateGames.length; j++) {
                    // console.log(`what i check:${alldateGames[j]}`)


                    // console.log("ISGAME ID:" + alldateGames[j].GameID +" is equals to " + data.GameID + "? " + alldateGames[j].GameID === data.GameID)
                    // console.log("Is Close:" + alldateGames[j].IsClosed +" is equals to " + alldateGames[j].IsClosed === true)

                    // console.log("SECOND :" + alldateGames[j].IsClosed === true)
                    console.log("Check", alldateGames[j].GameID);
                    console.log("Bet", data.GameID)
                    console.log("Closed", alldateGames[j].IsClosed)
                    if(alldateGames[j].GameID === data.GameID && alldateGames[j].IsClosed === false){
                        waitingBets.push(alldateGames[j]);
                    }
                    if (alldateGames[j].GameID === data.GameID && alldateGames[j].IsClosed === true) {
                        let win;
                        if (parseInt(alldateGames[j].HomeTeamScore) > parseInt(alldateGames[j].AwayTeamScore)) {
                            win = alldateGames[j].HomeTeam
                            console.log("enter1",win)
                        }
                        else {
                            win = alldateGames[j].AwayTeam
                            console.log("enter2",win)
                        }
                        if (win === data.onTeam) {
                            earn += analysisMoney(parseInt(data.moneyLine), parseInt(data.money));
                            alldateGames[j].earned = earn;
                            winBets.push(alldateGames[j])
                            console.log('pushwinnnn')
                        }
                        else {
                            loose += parseInt(data.money);
                            alldateGames[j].looses = loose;
                            looseBets.push(alldateGames[j]);
                            console.log(data.money)
                            console.log(`looose`)
                        }
                    }
                }
                const updatedData = {
                    ...data,
                    IsClosed: true
                }
                const postedData = await axios.put(`https://629deee9c6ef9335c0aa8da0.mockapi.io/bettingData/${betid}`, updatedData)
                console.log(postedData)

            } catch (e) {
                console.log(e.message)
            }
        }
        if (betsData.length !== 0) {

            const updateWinArr = [...userDeatails.userData.winBetsID, ...winBets]
            const updateLooseArr = [...userDeatails.userData.looseBetsID, ...looseBets]
            let userEarnedMoney;
            let userLoosesMoney;
            if (userDeatails.userData.earnedMoney === null) {
                userEarnedMoney = 0;
            } else {
                userEarnedMoney = parseInt(userDeatails.userData.earnedMoney);
            }
            if (userDeatails.userData.looseMoney === null) {
                userLoosesMoney = 0;
            } else {
                userLoosesMoney = parseInt(userDeatails.userData.looseMoney);
            }

            const updatedUser = {
                ...userDeatails.userData,
                earnedMoney: userEarnedMoney + earn,
                looseMoney: userLoosesMoney + loose,
                winBetsID: updateWinArr,
                looseBetsID: updateLooseArr,
                betsID: [],
                waitingBets : waitingBets

            }
            const updatedUserData = await axios.put(`https://629deee9c6ef9335c0aa8da0.mockapi.io/users/${userDeatails.userData.id}`, updatedUser)
            const loginDeatails ={
                userData: updatedUser,
                name: userDeatails.userData.userName,
                id: userDeatails.userData.id
            }
            localStorage.setItem('userDeatails',JSON.stringify(loginDeatails));
            setAnalysisFinish(true)
        }
    }


    useEffect(() => {
        if(analysisFinish === false){
            analyze();
        }
        else{ 
            insertAllGames();
        }

    },[analysisFinish])


    if (spinner) {

        return (
            <div className="games-container">

                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div >
        )
    }
    if(isLogedIn===false){

        return(
            <div>
            <h1>please login first</h1>
            </div>
        )
    }

    return (
        <div className="user">

             
            <h1> your wining bets </h1>  
            {winBetsDisplay}
            <h1> your loosing bets </h1>
            {looseBetsDisplay}
            <h1> your waiting bets </h1> 
            {waitingBetsDisplay}

        </div>
    )
}

export default User