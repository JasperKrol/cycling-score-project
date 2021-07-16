import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";
import React from "react";
import {useState} from 'react'
import app from '../../contexts/Firebase'
import Tile from "../../components/Tile/Tile";
import {useAuthContext} from "../../contexts/AuthContext";

function Login() {
    const history = useHistory();

    // State management
    const {setUser, password, setPassword, email, setEmail} = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    // Handle the submit
    async function onSubmit(e) {

        // Prevent page reload
        e.preventDefault()
        console.log(`$Login requested with email ${email} and password ${password}`)

        // Do the actual registration
        try {
            setError("")
            setLoading(true)
            const userCredential = await app.auth().signInWithEmailAndPassword(email, password)
            // console.log('Logged in: ', userCredential)
            setUser(userCredential.user)
            setTimeout(() => history.push("/strava-authentication"), 100);
        } catch (e) {
            console.error('Firebase fail: ', e)
            setError("Failed to sign in")
        }
        setLoading(false)
    }


    return (
        <>
            <div className="container">
                <Tile>
                    {loading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <div className="welcome-text">
                            <h3>Welcome!</h3>
                            <h4>Login to settle some scores!</h4>
                        </div>

                        {error && <h2>{error}</h2>}
                        <form onSubmit={onSubmit}>
                            <label htmlFor="email">Email:
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='your@email.com'
                                    type='email'
                                    name='email'
                                    value={email}
                                />
                            </label>
                            <label htmlFor="password">Password:
                                <input onChange={e => setPassword(e.target.value)}
                                       placeholder='Your password'
                                       type='password'
                                       name='password'
                                       value={password}/>
                            </label>
                            <Link to="/forgot-password">
                                <p className='login-text'>Forgot your password? Click here!</p>
                            </Link>
                            <Button
                                text="Login"
                            />
                        </form>

                        <a href="https://www.strava.com/">
                            <p className='login-text'>Dont have STRAVA? Get it here!</p>
                        </a>
                        <Link to="/sign-up">
                            <p className='login-text'>Don't have an account? Click here to sign up.</p>
                        </Link>

                    </>)}
                </Tile>
            </div>
        </>

    )
}

export default Login