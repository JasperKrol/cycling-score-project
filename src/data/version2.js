export default async (req, res) => {

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({
        client_id: '64170',
        client_secret: '3ff187481c800d50cab4c77eaf228aeffa0d7d10',
        refresh_token: '436733875c77e77d8f547b2e2cf7e6d028e93f4c',
        grant_type: 'refresh_token'
    })

    const reauthorizeResponds = await fetch(`https://www.strava.com/oauth/token`, {
        method: 'post',
        "headers": headers,
        "body": body,
    })

    const reAuthJson = await reauthorizeResponds.json()

    const response = await fetch(`https://www.strava.com/api/v3/athletes/8696836/stats?access_token=${reAuthJson.access_token}`)
    const json = await response.json()

    console.log("json", json)

    return res.status(200).json({
        count,
        distance,
        movingTime
    })

}