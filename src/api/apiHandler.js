import axios from "axios";

const key = 'e7f43c3751fe43c893f3a379c09c6efa';

function getStringDate(date) {

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


export async function UpComingPost() {

    const year = new Date().getFullYear();
    try {
        const { data } = await axios.get(`https://intense-mesa-62220.herokuapp.com/api.sportsdata.io/v3/nba/scores/json/Games/${year}POST`,
            {
                headers: { 'Ocp-Apim-Subscription-Key': 'e7f43c3751fe43c893f3a379c09c6efa' }
            }
        )
        console.log(data)
        const result = [];
        for (let index = data.length - 1; index >= 0; index--) {

            console.log(data[index].IsClosed)
            if (data[index].IsClosed === false) {
                result.push(data[index])
            }
            else {
                break;
            }
        };

        return result;

    } catch (err) {
        console.log(err.message)
    }

}


export async function gamesByDate(dateString) {
    // https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/{date}
    try {

        const { data } = await axios.get(`https://intense-mesa-62220.herokuapp.com/api.sportsdata.io/v3/nba/scores/json/GamesByDate/${dateString}`,
            {
                headers: { 'Ocp-Apim-Subscription-Key': 'e7f43c3751fe43c893f3a379c09c6efa' }
            }
        )
        return data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function getTeamsData() {
    try {

        const { data } = await axios.get(`https://intense-mesa-62220.herokuapp.com/api.sportsdata.io/v3/nba/scores/json/teams`,
            {
                headers: { 'Ocp-Apim-Subscription-Key': 'e7f43c3751fe43c893f3a379c09c6efa' }
            }
        )
        return data;
    } catch (e) {
        console.log(e.message);
    }


}

const dateDeatails = (date) => {
    const stringDate = getStringDate(date)
    const array = stringDate.split('-');
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = days[date.getDay()];
    const hour = date.getHours()
    const minute = date.getMinutes();
    array.push(hour,minute)
    return array;
   
}


export async function gamesRange(rangeNumber) {

    //set range of week to get dates
    const gamesData = [];
    for (let i = 0; i < rangeNumber; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const stringDate = getStringDate(date);
        const result = await gamesByDate(stringDate);
        if (result.length > 0) {
            const teamsData = await getTeamsData();
            const logoAway = teamsData[result[0].AwayTeamID - 1].WikipediaLogoUrl
            const logoHome = teamsData[result[0].HomeTeamID - 1].WikipediaLogoUrl
            result[0].awayLogo = logoAway;
            result[0].homeLogo = logoHome;
            const dateInfo = dateDeatails(date);
            result[0].dateInfo = dateInfo;
            gamesData.push(result[0]);
        }

    }

    return gamesData;

}