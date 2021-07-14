import "./Yourscores.css"
import React, {useEffect, useState} from "react";
import Tile from "../../components/Tile/Tile";
import axios from "axios";
import {useStravaActivityContext} from "../../contexts/StravaContext";
import metersToKilometers from "../../helpers/metersToKM"
import secondsPerMeterToKMPH from "../../helpers/secondsPerMeterToKMPH"
import firebase from "../../contexts/Firebase";
import {useAuthContext} from "../../contexts/AuthContext";
import {createCurrentYearString} from "../../helpers/createDateStrings";


function YourScores() {
    const {user} = useAuthContext()
    const {
        stravaData,
        setStravaUserProfile,
        setStravaData,
        stravaUserProfile,
        error,
        setError,
        accessToken
    } = useStravaActivityContext()
    const [loading, setLoading] = useState(true)

    const currentYearNumber = createCurrentYearString()
    // const db = firebase.firestore()
    // const activityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=bf9c0141655bfb5c9712c57b9ca7d2bfc9f67244&per_page=200`

    // const clientID = '64170'
    // const clientSecret = '3ff187481c800d50cab4c77eaf228aeffa0d7d10'
    // const refreshToken = '436733875c77e77d8f547b2e2cf7e6d028e93f4c'
    // const token = "bf9c0141655bfb5c9712c57b9ca7d2bfc9f67244"

//     laat initial state nu staan als map() geen function krijg, zet hem op []
//
// zet die codes en in ENV//

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const result = await axios.get(`${activityLink}`)
    //             console.log("Strava results", result.data)
    //             setStravaData(result.data)
    //
    //             const resultProfile = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${token}`)
    //             console.log("is dit result", resultProfile.data)
    //             setStravaUserProfile(resultProfile.data)
    //             setLoading(false)
    //         } catch (e) {
    //             console.error(e)
    //             setError(true);
    //             setLoading(true);
    //         }
    //     }
    //     fetchData()
    // }, [])
    //
    // useEffect(() => {
    //
    //     if(!user) return
    //     //if user send new data to database
    //
    //     function sendData() {
    //         try {
    //             return db.collection('StravaData').doc(user.email).set({
    //                 stravaData:stravaData,
    //                 stravaUserProfile:stravaUserProfile
    //             })
    //
    //
    //         } catch (e){
    //             console.error('Firebase fail: ', e)
    //         }
    //
    //         console.log("what is the data now", stravaData,)
    //         console.log("what is the profile now", stravaUserProfile,)
    //     }
    //     sendData()
    //
    // },[stravaData,stravaUserProfile])

    const [yearScoresClimbing, setYearScoresClimbing] = useState("")
    const [yearScoresSpeed, setYearScoresSpeed] = useState("")
    const [yearScoresDistance, setYearScoresDistance] = useState("")


    useEffect(() => {

        if (!stravaData) return

        async function sendData() {
            try {
                //Get all ride activities from the logged in user's strava
                const activityRides = await stravaData.filter((ride) => {
                    return ride.type === "Ride"
                })

                // Filter ride activities to current year
                const currentYearRides = activityRides.filter((currentYearRide) => {
                    return currentYearRide.start_date.substring(0, 4) === currentYearNumber
                })

                // calculate current year totals and put them on the page
                const climbingMeters = Math.round(currentYearRides.reduce(function (accumulator, meter) {
                    return accumulator + meter.total_elevation_gain;
                }, 0))
                // console.log("meters?", climbingMeters)

                const distanceGained = Math.round(currentYearRides.reduce(function (accumulator, distance) {
                    return accumulator + distance.distance;
                }, 0))
                // console.log("afstand?", distanceGained)

                const avgSpeed = Math.round(currentYearRides.reduce(function (accumulator, speed) {
                    return accumulator + (speed.average_speed / currentYearRides.length);
                }, 0))

                // console.log("speed?", avgSpeed)

                setYearScoresDistance(distanceGained)
                setYearScoresClimbing(climbingMeters)
                setYearScoresSpeed(avgSpeed)
            } catch (e) {
                console.error('Firebase fail: ', e)
            }
        }

        sendData()

    }, [stravaData, stravaUserProfile])


    return (
        <>
            <div className="container">
                <Tile className="tile-scores">
                    <h2>You have climbed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-mountain fa-2x"/>
                    </div>
                    <div className="home-text">
                        {loading && (<p>Loading...</p>)}
                        {!loading && (<h4>{(yearScoresClimbing)} meter</h4>)}
                    </div>
                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>

                <Tile className="tile">
                    <h2>Distance gained:</h2>
                    <div className="score-logo">
                        <i className="fas fa-route fa-2x"/>
                    </div>
                    <div className="home-text">
                        {loading && (<p>Loading...</p>)}
                        {!loading && (<h4>{metersToKilometers(yearScoresDistance)}</h4>)}
                    </div>
                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>

                <Tile className="tile">
                    <h2>Your average speed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-tachometer-alt fa-2x"/>
                    </div>
                    <div className="home-text">
                        {loading && (<p>Loading...</p>)}
                        {!loading && (<h4>{secondsPerMeterToKMPH(yearScoresSpeed.toFixed(1))}</h4>)}
                    </div>
                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>
            </div>
        </>
    )
}

export default YourScores
