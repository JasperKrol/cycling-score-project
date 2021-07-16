import Tile from "../../components/Tile/Tile";
import React from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";
// import firebase from "../../contexts/Firebase";

function StravaAuthentication() {
    const {user} = useAuthContext()
    // const db = firebase.firestore()

    return (
        <>
            <div className="container">
                <Tile>
                    <h1>Home</h1>
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