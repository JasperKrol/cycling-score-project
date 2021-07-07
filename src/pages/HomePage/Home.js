import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useState, useEffect} from "react";
import firebase from "../../contexts/Firebase"
import {useStravaActivityContext} from "../../contexts/StravaContext";
import axios from "axios";
import {useAuthContext} from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";


const db = firebase.firestore()

function Home() {


    const {
        loading, toggleLoading, stravaUserProfile, setStravaUserProfile, error,
        setError, clientSecret, setClientSecret, clientId, setClientID
    } = useStravaActivityContext()
    const {user, setUser} = useAuthContext()
    //
    // // Listen to the user state
    // useEffect(() => {
    //
    //     // Listen to user
    //     console.log('Add user listener')
    //     firebase.auth().onAuthStateChanged(user => {
    //         console.log('User changed to ', user)
    //         setUser(user)
    //         toggleLoading(false)
    //     })
    //
    // }, [])

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
    const token = "a87aa9cc5d0aae5de16c1f0b2a5d99fb99911998"
    // const activityLink = `https://www.strava.com/api/v3/athlete`


    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const result = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${token}`)
                console.log("is dit result", result.data)
                setStravaUserProfile(result.data)
                toggleLoading(false)

            } catch (e) {
                console.error(e)
                setError(true);
                toggleLoading(false);
            }
        }

        fetchUserProfile()

    }, [])

    const stravaProfilePicture = stravaUserProfile.profile


    return (
        <>
            <div className="container">
                <Tile>
                    {(user) ? <h3>Hello {user.email}</h3> : ""}
                    <div className="photo-div">
                        {loading && (<span>Loading...</span>)}
                        <img src={stravaProfilePicture} className="picture" alt="profile-picture"/>
                    </div>
                    <div className="home-text">
                        <p>View the leaderboards to plan you next trip or training!</p>
                    </div>

                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}

                    {/*client id evt op password zetten*/}
                    <form onSubmit={onSubmit}>

                        <label htmlFor="clientSecret"><h4>Insert your client secret</h4></label>
                        <input onChange={e => setClientSecret(e.target.value)} placeholder='Insert client secret'
                               type='text'
                               name='clientSecret' value={clientSecret}/>
                        <label htmlFor="clientId"><h4>Insert your client ID</h4></label>
                        <input onChange={e => setClientID(e.target.value)} placeholder='Client id please' type='text'
                               name='clientId' value={clientId}/>
                        <Button
                            text="Save"
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