import React, { useEffect } from "react";
import './User.css'
import { useState } from "react";
import axios from "axios";
import { getStringDate } from "../../api/gamesInfo";
import { gamesByDate } from "../../api/gamesInfo";
const User = (props) => {

    const [isLogedIn, setIsLogedIn] = useState(localStorage.getItem('isLogedIn'));
    const [userDeatails, setUserDeatails] = useState(JSON.parse(localStorage.getItem('userDeatails')))



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
                const stringDate = getStringDate(dateGame)
                const alldateGames = await gamesByDate(stringDate);
                for (let j = 0; j < alldateGames.length; j++) {
                    // console.log(`what i check:${alldateGames[j]}`)


                    console.log("ISGAME ID:" + alldateGames[j].GameID +" is equals to " + data.GameID + "? " + alldateGames[j].GameID === data.GameID)
                    console.log("Is Close:" + alldateGames[j].IsClosed +" is equals to " + alldateGames[j].IsClosed === true)

                    console.log("SECOND :" + alldateGames[j].IsClosed === true)

                    if (alldateGames[j].GameID === data.GameID && alldateGames[j].IsClosed === true) {
                        let win;
                        if (parseInt(alldateGames[j].HomeTeamScore) > parseInt(alldateGames[j].AwayTeamScore)) {
                            win = alldateGames[j].HomeTeam
                        }
                        else {
                            win = alldateGames[j].AwayTeam
                        }
                        if (win = data.onTeam) {
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
                betsID: []
            }
            const updatedUserData = await axios.put(`https://629deee9c6ef9335c0aa8da0.mockapi.io/users/${userDeatails.userData.id}`, updatedUser)
        }
    }


    useEffect(() => {
        analyze();

    })


    return (
        <div className="user">
            {isLogedIn ? <h1>hi user</h1> : <h1>login first</h1>}
        </div>
    )
}

export default User