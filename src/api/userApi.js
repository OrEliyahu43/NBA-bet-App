import React from "react"
import axios from "axios"
import '../components/User/User.css'
    export const insertDate = (array) => {
        return (
            <div>
                <span className="date-info">{`${array[1]}${array[2]}`}
                    <br />{`${array[3]}`}</span><br></br>
                <span className="date-info">{`${array[4]}:${array[5]}`}</span>
            </div>
        )
    }


    const dateDeatails = (date) => {
        const stringDate = getStringDate(date)
        const array = stringDate.split('-');
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekDay = days[date.getDay()];
        const hour = date.getHours()
        let minute = date.getMinutes();
        if(minute===0)
        minute = '00';
        array.push(weekDay,hour,minute)
        console.log("array of date is : " + array)
        return array;
       
    }

    export async function getTeamsData() {
        try {
    
            const { data } = await axios.get(`https://intense-mesa-62220.herokuapp.com/api.sportsdata.io/v3/nba/scores/json/teams`,
                {
                    headers: { 'Ocp-Apim-Subscription-Key': '77ea9cb1c3154e5ea1c1e8cfb518223a' }
                }
            )
            return data;
        } catch (e) {
            console.log(e.message);
        }
    
    
    }


    export function getStringDate(date) {

        const monthNames = ["JAN", "FEB", "MRC", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        // const date = new Date();
        const [month, year] = [monthNames[date.getMonth()], date.getFullYear()];
        let day;
        if (date.getDate() < 10) {
            day = '0' + date.getDate()
        } else {
            day = date.getDate()
        }
    
        const dateString = `${year}-${month}-${day}`
        return dateString;
    }




    export const insertGamesData = async (games) => {
        const teamsData = await getTeamsData();
        console.log('check3')
        console.log(games)
        const gamesUI = games.map((game,index) => {

            const logoAway = teamsData[game.AwayTeamID - 1].WikipediaLogoUrl
            const logoHome = teamsData[game.HomeTeamID - 1].WikipediaLogoUrl
            game.awayLogo = logoAway;
            game.homeLogo = logoHome;
            const gameDate = new Date(game.DateTime)
            const dateInfo = dateDeatails(gameDate);
            console.log('datae-info')
            console.log(dateInfo)
            game.dateInfo = dateInfo;
            // gamesData.push(game);

            console.log('inside -game')
            console.log(game)

            return (
                <div key={index} className="game-container">
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
        console.log('inside10')
        console.log(gamesUI)
        // setSpinner(false)
        return gamesUI;
    }