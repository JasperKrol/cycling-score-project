import Button from "../Button/Button";
import React from "react";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";


export default function ContactForm() {

    const {handleSubmit, formState: {errors}, register} = useForm({mode: "onBlur"});

    let history = useHistory();

    //maak functie die de date van onsubmit in form opslaat (data) in de props
    function onSubmit(data) {

        //e.prevent default hoeft niet, zit al ingebouwd in de library
        console.log(data)
        history.push("/form-submitted");
    }

    return (
        <>
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
                                required: {value: true, message: "Field cannot be empty"}
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
                                required: {value: true, message: "Field cannot be empty and must contain an @"}
                            })}
                        />
                        <span className="error-text">
                                {errors.email && <p>{errors.email.message}</p>}
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
                                      required: {value: true, minLength: 4, message: "Field cannot be empty"}
                                  })}
                        >
                        </textarea>
                        <span className="error-text">
                                {errors.comments && <p>{errors.comments.message}</p>}
                        </span>
                    </label>

                </div>

                <Button
                    text="Send IT!"
                    className="button"
                    disabled={errors.name || errors.email || errors.comments}
                />
            </form>
        </>
    )
}