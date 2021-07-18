import Tile from "../../components/Tile/Tile";
import React, { useState} from "react";
import Button from "../../components/Button/Button";
import {Link,} from "react-router-dom";

function StravaAuthentication() {


    return (
        <>
            <div className="container">
                <Tile>
                    <h1>Lets fetch your data first!</h1>
                    <h3>so we can calculate your scores and put you in the leaderboards</h3>
                    <Button
                        redirect="authorizeStrava"
                        text="Connect with Strava"
                    />
                    <Link to="/why-strava">
                        <p className='login-text'>*Why we need your STRAVA details*</p>
                    </Link>
                </Tile>

            </div>
        </>
    )
}

export default StravaAuthentication