import "./Home.css"
import Tile from "../../components/Tile/Tile";
import React, {useEffect, useState} from "react";
import firebase from "../../firebase/Firebase"
import {useStravaActivityContext} from "../../contexts/StravaContext";
import {useAuthContext} from "../../contexts/AuthContext";


function Home() {

    //state & contextmanagement
    const {loading, error} = useStravaActivityContext()
    const {user} = useAuthContext()
    const [userProfile, setUserProfile] = useState([])
    const db = firebase.firestore();


    useEffect(() => {
        if (!user) return

        return db.collection("StravaData").doc(user.email).onSnapshot(doc=>{
            const data = doc.data()
            setUserProfile(data.stravaUserProfile.profile_medium)
        })
    },[])

    return (
        <>
            <div className="container">
                <Tile>
                    {(user) ? <h3>Hello {user.email}</h3> : ""}
                        {loading && (<span>Loading...</span>)}
                        <img src={userProfile} className="picture" alt="profile-picture"/>

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