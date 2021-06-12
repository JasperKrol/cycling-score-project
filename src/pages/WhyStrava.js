import {Link, useHistory} from "react-router-dom";
import React from "react";

export default function WhyStrava({toggleIsAuthenticated, isAuthenticated}) {
    const history = useHistory();

    function handleClick() {
        toggleIsAuthenticated(!isAuthenticated)
        history.push("/");
    }

    return (
        <>
            <div className="container">
                <section className="tile">
                    <h2 className="text">Why we need your STRAVA Data:</h2>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consectetur culpa, dolorem,
                        doloribus eaque enim eos et ex excepturi facere impedit ipsa ipsum nam nobis provident qui sed
                        vitae voluptatum.</h4>

                    <Link>
                        <button onClick={handleClick} className="connect-with"><span>Connect with STRAVA</span></button>
                    </Link>
                    <a href="https://www.strava.com/"><p className='go-to-strava'>Go to strava <i
                        className="fas fa-arrow-circle-right"/></p></a>
                </section>
            </div>
        </>
    )
}