import React from "react";
import Tile from "../../components/Tile/Tile";
import {Link} from "react-router-dom";

export default function WhyStrava() {

    return (
        <>
            <div className="container">
                <Tile>
                    <h2 className="text">Why we need your STRAVA Data:</h2>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consectetur culpa, dolorem,
                        doloribus eaque enim eos et ex excepturi facere impedit ipsa ipsum nam nobis provident qui sed
                        vitae voluptatum.</h4>

                    <a href="https://www.strava.com/"><p className='go-to-strava'>Go to Strava <i
                        className="fas fa-arrow-circle-right"/></p></a>
                    <Link to="/strava-authentication">
                        <p className='go-to-strava'><i className="fas fa-arrow-circle-left"/>  Go back to authorize Strava</p>
                    </Link>
                </Tile>
            </div>
        </>
    )
}