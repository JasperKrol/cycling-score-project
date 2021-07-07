import "./Yourscores.css"
import React, {useEffect} from "react";
import Tile from "../../components/Tile/Tile";
// import Data from "../../data/response_1624349677573.json"
import axios from "axios";
import {useStravaActivityContext} from "../../contexts/StravaContext";
import metersToKM from "../../helpers/metersToKM"
import secondsPerMeterToKMPH from "../../helpers/secondsPerMeterToKMPH"


function YourScores() {

    // const data = Data
    // console.log(data)

    // const clientID = '64170'
    // const clientSecret = '3ff187481c800d50cab4c77eaf228aeffa0d7d10'
    // const refreshToken = '436733875c77e77d8f547b2e2cf7e6d028e93f4c'
    const token = "a87aa9cc5d0aae5de16c1f0b2a5d99fb99911998"
    const activityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=100`
    // laat initial state nu staan als map() geen function krijg, zet hem op []
    const {
        stravaData, setStravaData, loading, toggleLoading, error,
        setError
    } = useStravaActivityContext()

// zet die codes en in ENV//

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get(`${activityLink}?acces_token=${token}`)
                console.log("is dit result", result.data)
                setStravaData(result.data)
                toggleLoading(false)

            } catch (e) {
                console.error(e)
                setError(true);
                toggleLoading(false);
            }
        }

        fetchData()

    }, [])



    const climbingMeters = Math.round(stravaData.reduce(function (accumulator, meter) {
        return accumulator + meter.total_elevation_gain;
    }, 0))
    console.log("meters?", climbingMeters)

    const distanceGained = Math.round(stravaData.reduce(function (accumulator, distance) {
        return accumulator + distance.distance;
    }, 0))
    console.log("afstand?", distanceGained)

    const avgSpeed = stravaData.reduce(function (accumulator, speed) {
        return accumulator + (speed.average_speed / 100);
    }, 0)
    console.log("speed?", avgSpeed)


    //strava data format 2021-06-19
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = date.getFullYear()+'-'+(date.getMonth() + 1).toString().padStart(2, "0");
    console.log("currentmonth",currentMonth, "currentYear",currentYear)

    const dataAllYear = stravaData.filter((stravaData) => {
        return  stravaData.start_date === currentYear
    })
    console.log("Stravadataallyear", dataAllYear)



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
