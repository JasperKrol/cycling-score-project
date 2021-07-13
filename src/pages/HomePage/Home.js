import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useEffect} from "react";
import firebase from "../../contexts/Firebase"
import {useStravaActivityContext} from "../../contexts/StravaContext";
import axios from "axios";
import {useForm} from "react-hook-form";

import {useAuthContext} from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";

const db = firebase.firestore()

function Home() {

    //state & contextmanagement
    const {
        loading, toggleLoading, stravaUserProfile, setStravaUserProfile, error,
        setError, clientSecret, setClientSecret, clientId, setClientID
    } = useStravaActivityContext()

    const {user} = useAuthContext()
    const {handleSubmit, register} = useForm();

    // const {formState: {errors}, register} = useForm({mode: "onBlur"});

    // Getting the data from Strava
    useEffect(() => {

        // No user? Exit
        if (!user) return

        // User logged in? Get data
        return db.collection('StravaUserTokens').doc(user.email).onSnapshot(doc => {

            const data = doc.data()
            if (!data) return
            setClientID(data.clientId)
            setClientSecret(data.clientSecret)
        })

    }, [user])

    // handle submit

    async function onSubmit(e) {
        // Prevent page reload
        e.preventDefault()
        console.log(`client id pushed: ${clientId} and client secret pushed:${clientSecret}`)

        // Do the actual registration
        try {
            await db.collection('StravaUserTokens').doc(user.email).set({
                clientSecret: clientSecret,
                clientId: clientId
            })

        } catch (e) {
            console.error('Firebase fail: ', e)
        }
    }

    //  code opschonen met private gegevens
    // const userID = "64170"

    // const token = "1ca7e824526c0a610e5307e82ae0b7795840f26a"
    // const activityLink = `https://www.strava.com/api/v3/athlete`


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

                        {/*@todo maak profielfoto waar*/}
                        {/*<img src={stravaProfilePicture} className="picture" alt="profile-picture"/>*/}

                    </div>
                    <div className="home-text">
                        <h4>View the leaderboards to plan you next trip or training!</h4>
                    </div>

                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}

                    {/*@todo client id evt op password zetten*/}
                    <form onSubmit={onSubmit}>
                        <label htmlFor="clientId">client ID:
                            <input
                                placeholder='Client ID'
                                type='text'
                                name='clientId'
                                value={clientId}
                                onChange={e => setClientID(e.target.value)}
                            />
                        </label>
                        <label htmlFor="clientSecret">clientSecret:
                            <input
                                placeholder='client secret'
                                type='text'
                                name='clientSecret'
                                value={clientSecret}
                                onChange={e => setClientSecret(e.target.value)}
                            />

                        </label>

                        <Button
                            text="Save"
                            // disabled={errors.clientSecret || errors.clientId}
                        />
                    </form>
                    <Link to="/why-strava">
                        <p className='login-text'>*Why we need your STRAVA details*</p>
                    </Link>
                </Tile>
            </div>
        </>
    )
}

export default Home