// export default function getStravaData () {
//
//     const auth_link = "https://www.strava.com/oauth/token"
//
//     function getActivites(res){
//
//         const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
//         fetch(activities_link)
//             .then((res) => console.log(res.json()))
//     }
//
//     function reAuthorize(){
//         fetch(auth_link,{
//             method: 'post',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'
//
//             },
//
//             body: JSON.stringify({
//
//                 client_id: '64170',
//                 client_secret: '3ff187481c800d50cab4c77eaf228aeffa0d7d10',
//                 refresh_token: '8bf89bb0f76dfd3cbc70620f402bd05414d72063',
//                 grant_type: 'refresh_token'
//             })
//         }).then(res => res.json())
//             .then(res => getActivites(res))
//     }
//
//     reAuthorize()
// }
//
//
