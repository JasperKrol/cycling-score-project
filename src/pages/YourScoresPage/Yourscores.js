import "./Yourscores.css"
import React from "react";
import getStravaData from "../../data/nonASYNC";


function YourScores () {

    function getStravaData () {

    const auth_link = "https://www.strava.com/oauth/token"

    function getActivities(res){

        const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
        fetch(activities_link)
            .then((res) => console.log(res.json()))
    }

    function reAuthorize(){
        fetch(auth_link,{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

                client_id: '64170',
                client_secret: '3ff187481c800d50cab4c77eaf228aeffa0d7d10',
                refresh_token: '436733875c77e77d8f547b2e2cf7e6d028e93f4c',
                grant_type: 'refresh_token'
            })
        }).then(res => res.json())
            .then(res => getActivities(res))
    }

    reAuthorize()
}

    getStravaData()


    return (
        <>
            <div className="container">
                <section className="tile">
                    <h2>You have climbed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-mountain fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#</h4>
                    </div>
                </section>

                <section className="tile">
                    <h2>Distance gained:</h2>
                    <div className="score-logo">
                        <i className="fas fa-route fa-2x"/>
                    </div>
                    <div className="home-text">

                    </div>
                </section>

                <section className="tile">
                    <h2>Your average speed:</h2>
                    <div className="score-logo">
                        <i className="fas fa-tachometer-alt fa-2x"/>
                    </div>
                    <div className="home-text">
                        <h4>#PUT DATA HERE#</h4>
                    </div>
                </section>
            </div>
        </>
    )
}

export default YourScores
