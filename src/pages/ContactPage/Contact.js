import "./Contact.css"
import React from "react";
import Tile from "../../components/Tile/Tile";
import ContactForm from "../../components/ContactForm/ContactForm";
import getStravaData from "../../data/nonASYNC";


function Contact() {
    getStravaData()

    return (
        <div className="container ">
            <Tile>
                <div className="about-us">
                    <h1>About us:</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, cum enim eveniet fuga iusto
                        odio optio voluptas. At atque iste perferendis quaerat. Aliquid asperiores culpa, eius excepturi
                        explicabo iste voluptas.</p>
                </div>
                <div className="company-details">
                    <p><i className="fas fa-map-marked-alt"/> Based in Utrecht</p>

                    <p><i className="fas fa-phone-alt"/> 06-12 45 78 96</p>
                    <p><i className="far fa-comment"/> Leave a comment or a question in the form</p>
                </div>
                <a href="https://www.strava.com/"><p className='go-to-strava'>Go to strava <i
                    className="fas fa-arrow-circle-right"/></p></a>
            </Tile>

            <Tile>
                <ContactForm/>
            </Tile>


        </div>
    )
}

export default Contact