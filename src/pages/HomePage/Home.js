import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React from "react";
import firebase from "../../firebase/Firebase"
import {useStravaActivityContext} from "../../contexts/StravaContext";
import {useAuthContext} from "../../contexts/AuthContext";


function Home() {

    //state & contextmanagement
    const {loading, error} = useStravaActivityContext()
    const {user} = useAuthContext()

    return (
        <>
            <div className="container">
                <Tile>
                    {(user) ? <h3>Hello {user.email}</h3> : ""}
                    <div className="photo-div">
                        {loading && (<span>Loading...</span>)}

                        {/*@todo maak profielfoto zichtbaar*/}
                        {/*<img src={stravaProfilePicture} className="picture" alt="profile-picture"/>*/}

                    </div>
                    <div className="home-text">
                        <h4>View the leaderboards to plan you next trip or training!</h4>
                    </div>

                    {error && <p>Er is iets misgegaan met het ophalen van de data.</p>}
                </Tile>
            </div>
        </>
    )
}

export default Home