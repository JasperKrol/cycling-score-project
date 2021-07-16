import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useEffect} from "react";
import firebase from "../../contexts/Firebase"
import {useStravaActivityContext} from "../../contexts/StravaContext";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useAuthContext} from "../../contexts/AuthContext";
import {Link, useLocation} from "react-router-dom";
import Button from "../../components/Button/Button";
import {
    cleanUpAuthToken,
    fetchUserActivities,
    fetchUserProfile,
    testAuthGetter
} from "../../helpers/stravaAuthFunctions";

function Home() {

    //state & contextmanagement
    const {
        loading, toggleLoading, stravaUserProfile, setStravaUserProfile, error,
        setError, clientSecret, setClientSecret, clientId, setClientID
    } = useStravaActivityContext()
    const db = firebase.firestore()
    const {user} = useAuthContext()
    const location = useLocation()

    // const {formState: {errors}, register} = useForm({mode: "onBlur"});

    // Getting the data from Strava
    // useEffect(() => {
    //
    //     // No user? Exit
    //     if (!user) return
    //
    //     // User logged in? Get data
    //     return db.collection('StravaUserTokens').doc(user.email).onSnapshot(doc => {
    //
    //         const data = doc.data()
    //         if (!data) return
    //         setClientID(data.clientId)
    //         setClientSecret(data.clientSecret)
    //     })
    //
    // }, [user])

        // const token = "3ff187481c800d50cab4c77eaf228aeffa0d7d10"
    // // const activityLink = `https://www.strava.com/api/v3/athlete`
    //
    //
    // useEffect(() => {
    //     async function fetchUserProfile() {
    //         try {
    //             const result = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${token}`)
    //             console.log("is dit result", result.data)
    //             setStravaUserProfile(result.data)
    //             toggleLoading(false)
    //
    //         } catch (e) {
    //             console.error(e)
    //             setError(true);
    //             toggleLoading(false);
    //         }
    //     }
    //
    //     fetchUserProfile()
    //
    // }, [])
    // @todo hier de informatie uit de context halen via use effect
    // const stravaProfilePicture = stravaUserProfile.profile



//     function cleanUpAuthToken (str)  {
//         return str.split("&")[1].slice(5);
//     }
//
//
//
//
//     async function testAuthGetter (authTok) {
//         try {
//             const response = await axios.post(
//                 `https://www.strava.com/api/v3/oauth/token?client_id=64170&client_secret=3ff187481c800d50cab4c77eaf228aeffa0d7d10&code=${authTok}&grant_type=authorization_code`
//             );
//             console.log("response", response)
//             return response.data;
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
// // get mogen samen
//
//     async function fetchUserProfile(accestoken) {
//         try {
//             const result = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accestoken}`)
//             console.log("is dit result", result.data)
//
//             //return data
//             // variable const
//
//         } catch (e) {
//             console.error(e)
//
//         }
//     }
//
//     async function fetchUserActivities(accestoken) {
//         try {
//             const result = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${accestoken}&per_page=200`)
//             console.log("is dit result", result.data)
//
//         } catch (e) {
//             console.error(e)
//
//         }
//     }

    useEffect(() => {

        async function fetchData() {

            try {
                // Haal eerst de accesstoken op
                // eslint-disable-next-line no-restricted-globals
                console.log("location???", location)
                const stravaAuthToken = cleanUpAuthToken(location.search)
                console.log("stravaAuthToken", stravaAuthToken)
                // setAutToken
                const responseTokens = await testAuthGetter(stravaAuthToken);
                console.log("responseTokens", responseTokens)

                //@todo hier gaat het fout met opslaan
                const accesToken = responseTokens.access_token;
                console.log("accesToken", accesToken)
                const profile = fetchUserProfile(accesToken)
                //set state met activities en profile data
                console.log("profile", profile)
                const activities = fetchUserActivities(accesToken)
                console.log("activities", activities)

            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, []);


    return (
        <>
            <div className="container">
                <Tile>
                    {(user) ? <h3>Hello {user.email}</h3> : ""}
                    <div className="photo-div">
                        {loading && (<span>Loading...</span>)}

                        {/*@todo maak profielfoto zichtbaar*/}
                        {/*<img src={stravaProfilePicture} className="picture" alt="profile-picture"/>*/}

                    </div>
                    <div className="home-text">
                        <h4>View the leaderboards to plan you next trip or training!</h4>
                    </div>

                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>
            </div>
        </>
    )
}

export default Home