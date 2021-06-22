import React from "react";
import Button from "../../components/Button/Button";

export default function WhyStrava() {


    return (
        <>
            <div className="container">
                <section className="tile">
                    <h2 className="text">Why we need your STRAVA Data:</h2>
                    <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consectetur culpa, dolorem,
                        doloribus eaque enim eos et ex excepturi facere impedit ipsa ipsum nam nobis provident qui sed
                        vitae voluptatum.</h4>

                    <Button
                        redirect="message"
                        text="Connect with STRAVA"
                    />

                    <a href="https://www.strava.com/"><p className='go-to-strava'>Go to strava <i
                        className="fas fa-arrow-circle-right"/></p></a>
                </section>
            </div>
        </>
    )
}