import React from "react";
import { getTeamsData, gamesRange } from '../../api/gamesInfo.js'
import './UpComingGames.css'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { insertGamesData } from "../../api/betApi.js";

const UpComingGames = (props) => {


    const [games, setGames] = useState([]);
    const [insertGames, setInsertGames] = useState([])
    console.log(games)
    const nav = useNavigate();


    const insertDate = (array) => {
        return (
            <div>
                <span className="date-info">{`${array[1]}${array[2]}`}
                  <br/>{`${array[3]}`}</span><br></br>
                <span className="date-info">{`${array[4]}:${array[5]}`}</span>
            </div>
        )
    }

    const betHandle = (game) => {
        console.log(props.isLogedIn)
        if(props.isLogedIn !== true){
            alert('please login first')
        }
        else{
            props.updateParent(game)
            nav("/bet")
        }
    }


    const insertGamesData = () => {

        const gamesUI = games.map(game => {

            return (
                <div key={game.GameID} className="game-container">
                    <div className="team-bet">
                        <img className="team-logo" src={game.homeLogo}></img>
                        <h4>{game.HomeTeam}</h4>
                        <h6>MoneyLine:</h6>
                        <h3>{game.HomeTeamMoneyLine ? game.HomeTeamMoneyLine : 'not set yet'}</h3>
                    </div>
                    <div className="option-bet">
                        {insertDate(game.dateInfo)}
                        {game.HomeTeamMoneyLine ? <button onClick={e => {betHandle(game)}} className="bet-button">set a bet!</button> : 'not accesble'}

                    </div>
                    <div className="team-bet">
                        <img className="team-logo" src={game.awayLogo}></img>
                        <h4>{game.AwayTeam}</h4>
                        <h6>MoneyLine:</h6>
                        <h3>{game.AwayTeamMoneyLine ? game.AwayTeamMoneyLine : 'not set yet'}</h3>
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
        else {
            setInsertGames(insertGamesData())

        }


    }, [games])





    return (
        <div className="games-container">
            <h1>Games next week</h1>
            {insertGames}
        </div>
    )
}

export default UpComingGames