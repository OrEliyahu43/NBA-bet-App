import React from "react"

    export const insertDate = (array) => {
        return (
            <div>
                <span className="date-info">{`${array[1]}${array[2]}`}
                    <br />{`${array[3]}`}</span><br></br>
                <span className="date-info">{`${array[4]}:${array[5]}`}</span>
            </div>
        )
    }


    export const insertGamesData = (games) => {

        const gamesUI = games.map(game => {

            return (
                <div key={game.GameID} className="game-container">
                    <div className="team-bet">
                        <img alt="problem" className="team-logo" src={game.homeLogo}></img>
                        <h4>{game.HomeTeam}</h4>
                        <h6>MoneyLine:</h6>
                        <h3>{game.HomeTeamMoneyLine ? game.HomeTeamMoneyLine : 'not set yet'}</h3>
                    </div>
                    <div className="option-bet">
                        {insertDate(game.dateInfo)}
                        {/* {game.HomeTeamMoneyLine ? <button onClick={e => { betHandle(game) }} className="bet-button">set a bet!</button> : 'not accesble'} */}

                    </div>
                    <div className="team-bet">
                        <img alt="problem" className="team-logo" src={game.awayLogo}></img>
                        <h4>{game.AwayTeam}</h4>
                        <h6>MoneyLine:</h6>
                        <h3>{game.AwayTeamMoneyLine ? game.AwayTeamMoneyLine : 'not set yet'}</h3>
                    </div>

                </div>
            )
        })
        console.log(gamesUI)
        // setSpinner(false)
        return gamesUI;
    }