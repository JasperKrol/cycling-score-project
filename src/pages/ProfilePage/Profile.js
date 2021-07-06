import "./Profile.css"
import Button from "../../components/Button/Button";
import Tile from "../../components/Tile/Tile";
import React from "react";
import {useAuthContext} from "../../contexts/AuthContext";

function Profile({toggleIsAuthenticated, isAuthenticated}) {

    const {user} = useAuthContext()


    return (
        <div className="container">
            <Tile className="contact-tile">
                {(user) ? <h3>Hello {user.email}</h3> : ""}
                <h3>Want to ride your bike? Log out on the button below</h3>
                    <Button
                        text="Bye Bye!"
                        redirect="home"
                    />
            </Tile>
        </div>
    )
}

export default Profile