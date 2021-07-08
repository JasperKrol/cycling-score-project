import "./Yourscores.css"
import React, {useEffect, useState} from "react";
import Tile from "../../components/Tile/Tile";
// import Data from "../../data/response_1624349677573.json"
import axios from "axios";
import {useStravaActivityContext} from "../../contexts/StravaContext";
import metersToKM from "../../helpers/metersToKM"
import secondsPerMeterToKMPH from "../../helpers/secondsPerMeterToKMPH"
import firebase from "../../contexts/Firebase";
import {useAuthContext} from "../../contexts/AuthContext";


function YourScores() {

    // const clientID = '64170'
    // const clientSecret = '3ff187481c800d50cab4c77eaf228aeffa0d7d10'
    // const refreshToken = '436733875c77e77d8f547b2e2cf7e6d028e93f4c'
    const token = "56a173e311ee50a6295a3811f970f0dab9736143"
    const activityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=200`
    // laat initial state nu staan als map() geen function krijg, zet hem op []
    const {stravaData, setStravaData, error, setError} = useStravaActivityContext()
    const [loading, setLoading] = useState(true)
    const {user} = useAuthContext()
    const db = firebase.firestore()

// zet die codes en in ENV//

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`${activityLink}?acces_token=${token}`)
                console.log("Strava results", result.data)
                setStravaData(result.data)
                setLoading(false)


            } catch (e) {
                console.error(e)
                setError(true);
                setLoading(true);
            }
        }

        fetchData()

    }, [])

    console.log('this is the data', stravaData)

    useEffect(() => {

        if(!user) return
        //if user send new data to database

        async function sendData() {
            try {
                return db.collection('StravaData').doc(user.email).set({
                    stravaData:stravaData
                })

            } catch (e){
                console.error('Firebase fail: ', e)
            }
        }
        sendData()

    },[])

    console.log("what is the data now", stravaData)


    //Get current year and month
    const date = new Date()
    const currentYearNumber = date.getFullYear().toString()
    const currentMonth = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, "0");
    console.log("currentmonth", currentMonth, "currentYear", currentYearNumber)

    //Get all ride activities from strava
    const activityRides = stravaData.filter((ride) => {
        return ride.type === "Ride"
    })
    // console.log("activityRides", activityRides)

    // Filter ride activities to current year
    const currentYearRides = activityRides.filter((currentYearRide) => {
        return currentYearRide.start_date.substring(0, 4) === currentYearNumber
    })

    console.log("currentYearRides", currentYearRides)

    // calculate current year totals and put them on the page
    const climbingMeters = Math.round(currentYearRides.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    console.log("meters?", climbingMeters)

    const distanceGained = Math.round(currentYearRides.reduce(function (accumulator, distance) {
        return accumulator + distance.distance;
    }, 0))
    console.log("afstand?", distanceGained)

    const avgSpeed = currentYearRides.reduce(function (accumulator, speed) {
        return accumulator + (speed.average_speed / 100);
    }, 0)

    console.log("speed?", avgSpeed)

    return (
        <>
            <div className="container">
                <Tile className="tile">
                    <h2>You have climbed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-mountain fa-2x"/>
                    </div>
                    <div className="home-text">
                        {loading && (<p>Loading...</p>)}
                        {!loading && (<h4>{(climbingMeters)} meter</h4>)}
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
                        {!loading && (<h4>{metersToKM(distanceGained)}</h4>)}
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
                        {!loading && (<h4>{secondsPerMeterToKMPH(avgSpeed.toFixed(1))}</h4>)}
                    </div>
                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>
            </div>
        </>
    )
}

export default YourScores
