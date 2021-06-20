// import axios from "axios";
// // import {useState} from 'react';
// export default function getStravaData () {
//     async function fetchData() {
//         try {
//             const result = await axios.get("https://www.strava.com/api/v3/athlete/activities?access_token=202b06311a5c2e938593e6895f754bdbd47fe5b2");
//             // zet de data in pokemon, rerender
//             console.log(result)
//
//         } catch (e) {
//             console.error(e);
//         }
//
//     }
//     fetchData()
//
// }
//
//
//     // const [activities, setActivities] = useState()
//
//
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
//                 refresh_token: '0dcdd2b1b7e00d0ad31b1c49fa87c08797c1bc41',
//                 grant_type: 'refresh_token'
//             })
//         }).then(res => res.json())
//             .then(res => getActivites(res))
//     }
//
//     reAuthorize()
// }
//
//useEffect(() => {
//         async function fetchData() {
//
//
//             try {
//                 const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
//                 setWeatherData(result.data);
//             } catch (e) {
//                 console.error(e);
//                 setError(true);
//             }
//
//         }
//
//             fetchData();
//
//
//     }, [location]);





