import axios from "axios";


export function cleanUpAuthToken (str)  {
    return str.split("&")[1].slice(5);
}




export async function testAuthGetter (authTok) {
    try {
        const response = await axios.post(
            `https://www.strava.com/api/v3/oauth/token?client_id=64170&client_secret=3ff187481c800d50cab4c77eaf228aeffa0d7d10&code=${authTok}&grant_type=authorization_code`
        );
        console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// get mogen samen

export async function fetchUserProfile(accestoken) {
    try {
        const result = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accestoken}`)
        console.log("is dit result", result.data)

        //return data
        // variable const

    } catch (e) {
        console.error(e)

    }
}

export async function fetchUserActivities(accestoken) {
    try {
        const result = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${accestoken}&per_page=200`)
        console.log("is dit result", result.data)

    } catch (e) {
        console.error(e)

    }
}