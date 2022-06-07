import axios from "axios";


export function insertGameData(game)  {

        return (
            <div className="game-container">
                <div className="team-bet">
                    <img className="team-logo" src={game.homeLogo}></img>
                    <h4>{game.HomeTeam}</h4>
                    <h6>MoneyLine:</h6>
                    <h3>{game.HomeTeamMoneyLine ? game.HomeTeamMoneyLine : 'not set yet'}</h3>
                </div>
                <div className="option-bet">
                    {insertDate(game.dateInfo)}

                </div>
                <div className="team-bet">
                    <img className="team-logo" src={game.awayLogo}></img>
                    <h4>{game.AwayTeam}</h4>
                    <h6>MoneyLine:</h6>
                    <h3>{game.AwayTeamMoneyLine ? game.AwayTeamMoneyLine : 'not set yet'}</h3>
                </div>

            </div>
        )
    
}

export const insertDate = (array) => {
    return (
        <div>
            <span className="date-info">{`${array[1]}${array[2]}`}
              <br/>{`${array[3]}`}</span><br></br>
            <span className="date-info">{`${array[4]}:${array[5]}`}</span>
        </div>
    )
}