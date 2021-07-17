import "./SignUp.css"
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";
import React from "react";
import {useState} from 'react'
import app from '../../firebase/Firebase'
import Tile from "../../components/Tile/Tile";
import {useAuthContext} from "../../contexts/AuthContext";

function SignUp() {
    const history = useHistory();

    // State management
    const {setUser, password, setPassword, email, setEmail} = useAuthContext()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    // Handle the submit
    async function onSubmit(e) {

        // Prevent page reload
        e.preventDefault()
        console.log(`$ signup requested with email ${email} and password ${password}`)

        // Do the actual registration
        try {
            setError("")
            setLoading(true)
            const userCredential = await app.auth().createUserWithEmailAndPassword(email, password)
            console.log('Registered', userCredential)
            setUser(userCredential.user)
            setTimeout(() => history.push("/strava-authentication"), 1000);
        } catch (e) {
            console.error('Firebase fail: ', e)
            setError("Failed to sign up")
        }
        setLoading(false)
    }

    return (
        <>
            <div className="container">
                <Tile>
                    {loading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <h3>Good to see you! Please sign up down below</h3>
                        {error && <h2>{error}</h2>}

                        <div className="form-container">
                            <form onSubmit={onSubmit}>
                                <label htmlFor="email">Email:
                                <input onChange={e => setEmail(e.target.value)}
                                       placeholder='your@email.com'
                                       type='email'
                                       name='email'
                                       value={email}/>
                                </label>
                                <label htmlFor="password">Password:
                                <input onChange={e => setPassword(e.target.value)}
                                       placeholder='Your password'
                                       type='password'
                                       name='password'
                                       value={password}/>
                                </label>
                                <Button
                                    text="Register"
                                    disabled={loading}
                                />

                            </form>
                        </div>

                        <Link to="/login">
                            <p className='login-text'>Already have an account? Click here to login</p>
                        </Link>
                    </>)}
                </Tile>
            </div>
        </>

    )
}

export default SignUp