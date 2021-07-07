import "./Contact.css"
import React from "react";
import Tile from "../../components/Tile/Tile";
import ContactForm from "../../components/ContactForm/ContactForm";


function Contact() {

    const array = [{
            title: "a",
            date: "2021-03-29"
        }, {
            title: "b",
            date: "2021-04-13"
        }, {
            title: "c",
            date: "2021-04-12"
        }, {
            title: "leave",
            date: "2021-06-11"
        }, {
            title: "d",
            date: "2021-04-16"
        },
            {
                title: "e",
                date: "2021-06-18"
            }]


    const date = new Date()
    const currentYearNumber = date.getFullYear().toString()
    const currentMonth = date.getFullYear()+'-'+(date.getMonth() + 1).toString().padStart(2, "0");
    console.log("currentmonth",currentMonth, "currentYear",currentYearNumber)

    const filteredObjects = array.filter((filteredObject) => {
        const datestr = currentYearNumber
        return filteredObject.date.substring(0,4) === datestr
    })

    console.log("filteredObjects", filteredObjects)

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