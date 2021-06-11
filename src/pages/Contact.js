import "../components/Contact.css"
import React from "react";
import {useForm} from "react-hook-form"
import {useHistory} from "react-router-dom";

function Contact() {
    const {handleSubmit, formState: {errors}, register} = useForm({mode: "onBlur"});

    let history = useHistory();

    //maak functie die de date van onsubmit in form opslaat (data) in de props
    function onSubmit(data) {

        //e.prevent default hoeft niet, zit al ingebouwd in de library
        console.log(data)
        history.push("/form-submitted");

    }

    return (
        <div className="container">
            <section className="tile">
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
            </section>

            <section className="tile">
                <div className="contact-us">
                    <h1>Contact us:</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="details">
                        <label htmlFor="name">Naam:
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: {value: true, message: "Dit veld is verplicht"}
                                })}
                            />
                            <span className="error-text">
                                {errors.name && <p>{errors.name.message}</p>}
                                    </span>
                        </label>
                        <label htmlFor="email">Your Email:
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: {value: true, message: "Dit veld is verplicht"}
                                })}
                            />
                            <span className="error-text">
                                {errors.achternaam && <p>{errors.achternaam.message}</p>}
                                     </span>
                        </label>
                        <label htmlFor="Subject">Subject:
                            <select {...register("subject", {required: true})}>
                                <option value="Question">Question</option>
                                <option value=" Remark"> Remark</option>
                                <option value=" Tip"> Tip</option>
                            </select>

                        </label>
                        <label htmlFor="comments">What would you like to write?
                            <br/>
                            <textarea name="comments" id="comments" cols="30" rows="10"
                                      {...register("comments", {
                                          required: {value: true, message: "Dit veld is verplicht"}
                                      })}
                            >
                            </textarea>
                            <span className="error-text">
                                {errors.comments && <p>{errors.comments.message}</p>}
                                      </span>
                        </label>

                    </div>

                    <input
                        className="button"
                        type="submit" value="Send it!"
                        disabled={errors.name || errors.email || errors.comments}
                    />
                </form>


            </section>
        </div>
    )
}

export default Contact