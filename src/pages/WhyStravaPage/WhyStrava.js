import React from "react";
import Tile from "../../components/Tile/Tile";

export default function WhyStrava() {

    return (
        <>
            <div className="container">
                <Tile>
                    <h2 className="text">Why we need your STRAVA Data:</h2>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consectetur culpa, dolorem,
                        doloribus eaque enim eos et ex excepturi facere impedit ipsa ipsum nam nobis provident qui sed
                        vitae voluptatum.</h4>

                    <a href="https://www.strava.com/"><p className='go-to-strava'>Go to strava <i
                        className="fas fa-arrow-circle-right"/></p></a>
                </Tile>
            </div>
        </>
    )
}