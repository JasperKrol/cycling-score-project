import "./Button.css"
import { useHistory } from "react-router-dom";
import app from '../../contexts/Firebase'
import React, {useState} from "react";

export default function Button({text, redirect}) {
    const history = useHistory();
    const [error, setError] = useState("")

    function handleClick() {
        if(redirect === "home") {
            app.auth().signOut().then(() => {
                history.push("/login");
            }).catch((e) => {
                console.error('Firebase fail: ', e)
                setError("Failed to logout")
            });

            console.log("klikt dit")
        } if (redirect === "message") {
            history.push("/form-submitted");
        }
    }

    return (
        <>
            {error && <h2>{error}</h2>}
            <button className="button" onClick={handleClick}>
                <span>{text}</span>
            </button>
        </>


    )
}