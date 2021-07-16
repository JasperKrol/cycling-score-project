import React, {useEffect, useState} from "react";
import Tile from "../../components/Tile/Tile";
import axios from "axios";
import {useStravaActivityContext} from "../../contexts/StravaContext";
import metersToKilometers from "../../helpers/metersToKM"
import secondsPerMeterToKMPH from "../../helpers/secondsPerMeterToKMPH"
import firebase from "../../contexts/Firebase";
import {useAuthContext} from "../../contexts/AuthContext";
import {createCurrentYearString} from "../../helpers/createDateStrings";
import {useLocation} from "react-router-dom";

function YourScores() {
    const {user} = useAuthContext()
    const {
        stravaData,
        setStravaUserProfile,
        setStravaData,
        stravaUserProfile,
        error,
        setError
    } = useStravaActivityContext()
    const [loading, setLoading] = useState(true)
    const [yearScoresClimbing, setYearScoresClimbing] = useState("")
    const [yearScoresSpeed, setYearScoresSpeed] = useState("")
    const [yearScoresDistance, setYearScoresDistance] = useState("")
    const location = useLocation()

    const currentYearNumber = createCurrentYearString()
    const db = firebase.firestore()

    function cleanUpAuthToken(str) {
        return str.split("&")[1].slice(5);
    }

    async function testAuthGetter(authTok) {
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
    useEffect(() => {
        async function fetchAllStravaData(accestoken) {
            try {
                const resultProfile = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${accestoken}`)
                console.log("is dit resultProfile", resultProfile.data)
                setStravaUserProfile(resultProfile.data)

                const resultActivities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${accestoken}&per_page=200`)
                console.log("is dit resultActivities", resultActivities.data)
                setStravaData(resultActivities.data)
                setLoading(false)


                //return data
                return resultProfile, resultActivities
                // variable const

            } catch (e) {
                console.error(e)
                setLoading(false)
                setError(true);
                setLoading(true);
            }
            fetchAllStravaData()
        }

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
                await fetchAllStravaData(accesToken)


            } catch (e) {
                console.error(e);
            }
        }

        fetchData()
    }, [user])

    useEffect(() => {

        if (!user) return

        //if user send new data to database

        function sendData() {
            try {
                return db.collection('StravaData').doc(user.email).set({
                    stravaData: stravaData,
                    stravaUserProfile: stravaUserProfile
                })


            } catch (e) {
                console.error('Firebase fail: ', e)
            }

            console.log("what is the data now", stravaData,)
            console.log("what is the profile now", stravaUserProfile,)
        }

        sendData()

    }, [stravaData, stravaUserProfile])


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
                <Tile>
                    <h2>You have climbed:</h2>
                    {/*<div className="score-logo">*/}
                    <i className="fas fa-mountain fa-4x"/>
                    {/*</div>*/}
                    <div className="home-text">
                        {loading && (<p>Loading...</p>)}
                        {!loading && (<h4>{(yearScoresClimbing)} meter</h4>)}
                    </div>
                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>

                <Tile className="tile-score">
                    <h2>Distance gained:</h2>
                    <div className="score-logo">
                        <i className="fas fa-route fa-4x"/>
                    </div>
                    <div className="home-text">
                        {loading && (<p>Loading...</p>)}
                        {!loading && (<h4>{metersToKilometers(yearScoresDistance)}</h4>)}
                    </div>
                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>

                <Tile className="tile-score">
                    <h2>Your average speed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-tachometer-alt fa-4x"/>
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
