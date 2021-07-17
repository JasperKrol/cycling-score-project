import styles from "./Button.module.css"
import {useHistory} from "react-router-dom";
import app from '../../firebase/Firebase'
import React, {useState} from "react";

export default function Button({text, redirect}) {
    const history = useHistory();
    const [error, setError] = useState("")

    function handleClick() {
        if (redirect === "home") {
            app.auth().signOut().then(() => {
                history.push("/login");
            }).catch((e) => {
                console.error('Firebase fail: ', e)
                setError("Failed to logout")
            });
            // console.log("klikt dit")
        }
        if (redirect === "message") {
            history.push("/form-submitted");
        }
        // Helaas was het niet mogelijk om de link te pushen via history push en ook niet met een Link component. Docent en ik hebben er naar gekeken en gezien de tijd kregen we het niet voor elkaar.
        if (redirect === "authorizeStrava") {
            const redirectUrl = "http://localhost:3000/your-scores"
            window.location = `https://www.strava.com/oauth/authorize?client_id=64170&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
        }
    }

    return (
        <>
            {error && <h2>{error}</h2>}
            <button
                className={styles['default-button']}
                onClick={handleClick}
                type="submit"
            >
                <span>{text}</span>
            </button>
        </>


    )
}