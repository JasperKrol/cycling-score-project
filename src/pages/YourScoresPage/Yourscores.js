import "./Yourscores.css"
import React, {useEffect, useState} from "react";
import getStravaData from "../../data/nonASYNC";
import Tile from "../../components/Tile/Tile";
import Data from "../../data/response_1624349677573.json"
import {get} from "react-hook-form";
import axios from "axios";
import {useStravaActivityContext} from "../../contexts/StravaRideContext";



function YourScores () {

    const data = Data
    // console.log(data)

    const clientID = '64170'
    const clientSecret =  '3ff187481c800d50cab4c77eaf228aeffa0d7d10'
    const refreshToken = '436733875c77e77d8f547b2e2cf7e6d028e93f4c'
    const token = "f14a0c90ea582382961c80b6dfec45c5809c70e3"
    const activityLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=100`

    // laat intital state nu staan als map() geen function krijg, zet hem op []
    const { strava, setStravaData } = useStravaActivityContext()

// zet die codes en zo in ENV//

    useEffect(() => {
        async function fetchData () {
            try {
                const stravaActivityResponse = await axios.get(`${activityLink}?acces_token=${token}`)
                setStravaData(stravaActivityResponse.data)
                console.log(stravaActivityResponse)

            } catch (e) {
                console.error(e)
            }
        }
        fetchData();

    }, [])

    return (
        <>
            <div className="container">
                <Tile className="tile">
                    <h2>You have climbed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-mountain fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#
                        {/*{data.map*/}
                        </h4>
                    </div>
                </Tile>

                <Tile className="tile">
                    <h2>Distance gained:</h2>
                    <div className="score-logo">
                        <i className="fas fa-route fa-2x"/>
                    </div>
                    <div className="home-text">

                    </div>
                </Tile>

                <Tile className="tile">
                    <h2>Your average speed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-tachometer-alt fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#</h4>
                    </div>
                </Tile>

            </div>
        </>
    )
}

export default YourScores
