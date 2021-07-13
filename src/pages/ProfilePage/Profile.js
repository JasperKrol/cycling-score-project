import "./Profile.css"
import Button from "../../components/Button/Button";
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useAuthContext} from "../../contexts/AuthContext";
import Gif from "../../assets/giphy.gif";

function Profile() {

    const {user} = useAuthContext()

    return (
        <div className="container">
            <Tile>
                {(user) ? <h3>Hello {user.email}</h3> : ""}
                <h3 className="text">Want to ride your bike?</h3>
                <img
                    className="bike-gif"
                    src={Gif} alt="Cycling man"/>
                <h3>GO! Log out with the button below.</h3>
                    <Button
                        text="Bye Bye!"
                        redirect="home"
                    />
            </Tile>
        </div>
    )
}

export default Profile