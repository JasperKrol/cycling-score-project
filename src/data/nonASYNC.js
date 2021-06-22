export default function getStravaData () {

    const auth_link = "https://www.strava.com/oauth/token"

    function getActivities(res){
        const token = "c5ef90cdeabeae0c9dd29541ff487f30544b425c"
        const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=100`
        console.log(res)
        fetch(activities_link)
            .then((res) => console.log(res.json()))
    }

    function reAuthorize(){
        fetch(auth_link,{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                client_id: '64170',
                client_secret: '3ff187481c800d50cab4c77eaf228aeffa0d7d10',
                refresh_token: '436733875c77e77d8f547b2e2cf7e6d028e93f4c',
                grant_type: 'refresh_token'
            })
        }).then(res => res.json())
            .then(res => getActivities(res))
    }

    reAuthorize()
}


