import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useEffect} from "react";
import firebase from "../../contexts/Firebase"
import {useStravaActivityContext} from "../../contexts/StravaContext";
import axios from "axios";
import {useAuthContext} from "../../contexts/AuthContext";


function Home() {

    //state & contextmanagement
    const {
        loading, toggleLoading, stravaUserProfile, setStravaUserProfile, error,
        setError, clientSecret, setClientSecret, clientId, setClientID
    } = useStravaActivityContext()
    const {user} = useAuthContext()
    const db = firebase.firestore()


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