import "../components/Contacts.css"
import React from "react";
import {useForm} from "react-hook-form"

function Contact() {
    const { handleSubmit, formState: { errors }, register } = useForm({mode: "onBlur"});


    //maak functie die de date van onsubmit in form opslaat (data) in de props
    function onSubmit(data) {

        //e.prevent default hoeft niet, zit al ingebouwd in de library
        console.log(data)
    }
    return (
        <div className="container">
            <section className="tile1">

                <div className="about-us">
                    <h3>About us:</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, cum enim eveniet fuga iusto
                        odio optio voluptas. At atque iste perferendis quaerat. Aliquid asperiores culpa, eius excepturi
                        explicabo iste voluptas.</p>
                </div>
                <div className="company-details">
                    <p><i className="fas fa-map-marked-alt"/> Based in Utrecht</p>

                    <p><i className="fas fa-phone-alt"/> 06-12 45 78 96</p>
                    <p><i className="far fa-comment"/> Leave a comment or a question in the form</p>
                </div>
                <a href="https://www.strava.com/"><p className='go-to-strava'>Go to strava<i
                    className="fas fa-arrow-circle-right"/></p></a>

            </section>
            <section className="tile2">
                <div className="contact-us">
                    <h3>Contact us:</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="personal" >
                            <label  htmlFor="first-name">Naam:
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: {value: true, message: "Dit veld is verplicht"}
                                    })}
                                />
                                {errors.name && <p>{errors.name.message}</p>}
                            </label>
                            <label htmlFor="email">Your Email:
                                <input
                                    type="email"
                                    id="email"
                                    {...register("achternaam", {
                                        required: {value: true, message: "Dit veld is verplicht"}
                                    })}
                                />
                                {errors.achternaam && <p>{errors.achternaam.message}</p>}
                            </label>
                            <label htmlFor="age">Subject:
                                <select {...register("Subject", { required: true })}>
                                    <option value="Question">Question</option>
                                    <option value=" Remark"> Remark</option>
                                    <option value=" Tip"> Tip</option>
                                </select>
                            </label>
                            <label htmlFor="comments">Please enter your text:
                                <textarea name="comments" id="comments" cols="30" rows="10"
                                          {...register("comments",  {
                                              required: {value: true, message: "Dit veld is verplicht"}
                                          })}
                                >
                            </textarea>
                                {errors.comments && <p>{errors.comments.message}</p>}
                            </label>
                            <input
                                type="submit"
                                disabled={ errors.name || errors.email ||errors.comments }
                            />
                        </div>
                    </form>
                </div>

            </section>
        </div>
    )
}

export default Contact