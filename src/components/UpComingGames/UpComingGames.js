import React from "react";
import { getTeamsData, gamesRange } from '../../api/apiHandler.js'
import './UpComingGames.css'
import { useState } from "react";
import { useEffect } from "react";
const UpComingGames = () => {


    const [games, setGames] = useState([]);
    const [insertGames, setInsertGames] = useState([])
    console.log(games)
    const insertGamesData =  () => {

        const gamesUI = games.map(game => {
           
            return (
                <div className="game-container">
                    <div className="team-bet">
                        <img className="team-logo" src={game.homeLogo}></img>
                        <h4>{game.HomeTeam}</h4>
                        <h6>MoneyLine:</h6>
                        <h3>{game.HomeTeamMoneyLine ? game.HomeTeamMoneyLine: 'not set yet'}</h3>
                    </div>
                    <div className="option-bet">
                        {game.HomeTeamMoneyLine ?<button className="bet-button">set a bet!</button>: 'not accesble'}
                        
                    </div>
                    <div className="team-bet">
                        <img className="team-logo" src={game.awayLogo}></img>
                        <h4>{game.AwayTeam}</h4>
                        <h6>MoneyLine:</h6>
                        <h3>{game.AwayTeamMoneyLine ? game.AwayTeamMoneyLine: 'not set yet'}</h3>
                    </div>

                </div>
            )
        })
        console.log(gamesUI)
        return gamesUI;
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await gamesRange(7);
            setGames(result);
        }

        if (games.length === 0) {
            fetchData();

        }
        else{
            setInsertGames(insertGamesData())

        }

       
    },[games])





    return (
        <div className="games-container">
            <h1>Games next week</h1>
                { insertGames  }
        </div>
    )
}

export default UpComingGames