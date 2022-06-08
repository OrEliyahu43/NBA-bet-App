import axios from "axios";

const key = 'e7f43c3751fe43c893f3a379c09c6efa';

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
    const weekDay = days[date.getDay()];
    const hour = date.getHours()
    let minute = date.getMinutes();
    if(minute===0)
    minute = '00';
    array.push(weekDay,hour,minute)
    console.log("array of date is : " + array)
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
            for(let i = 0 ; i<result.length;i++){

                const teamsData = await getTeamsData();
                const logoAway = teamsData[result[i].AwayTeamID - 1].WikipediaLogoUrl
                const logoHome = teamsData[result[i].HomeTeamID - 1].WikipediaLogoUrl
                result[i].awayLogo = logoAway;
                result[i].homeLogo = logoHome;
                const gameDate = new Date(result[i].DateTime)
                const dateInfo = dateDeatails(gameDate);
                result[i].dateInfo = dateInfo;
                gamesData.push(result[i]);
            }
        }

    }

    return gamesData;

}