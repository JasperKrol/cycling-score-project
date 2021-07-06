import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";
import React from "react";
import {useState} from 'react'
import app from '../../Firebase'
import Tile from "../../components/Tile/Tile";
import {useAuthContext} from "../../contexts/AuthContext";


function Login() {
    const history = useHistory();

    // State management
    const {user, setUser, password, setPassword, email, setEmail, login} = useAuthContext()
    const [action, setAction] = useState('login')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    // Handle the submit
    async function onSubmit(e) {

        // Prevent page reload
        e.preventDefault()
        console.log(`${action} requested with email ${email} and password ${password}`)

        // Do the actual registration
        try {
            setError("")
            setLoading(true)
            const userCredential = await app.auth().signInWithEmailAndPassword(email, password)
            console.log('Logged in: ', userCredential)
            setUser(userCredential.user)
            history.push("/")
        } catch (e) {
            console.error('Firebase fail: ', e)
            setError("Failed to sign in")
        }
        setLoading(false)
    }


    return (
        <>
            <div className="container">
                <Tile className="tile">
                    <h3>Welcome!</h3>
                    {error && <h2>{error}</h2>}
                    <h4>View Your Scores<br/> & <br/>Compare with your friends</h4>

                    <form onSubmit={onSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input onChange={e => setEmail(e.target.value)} placeholder='your@email.com' type='email'
                               name='email' value={email}/>
                        <label htmlFor="password">Password:</label>
                        <input onChange={e => setPassword(e.target.value)} placeholder='Your password' type='password'
                               name='password' value={password}/>
                        <Button
                            text="Login"
                        />

                    </form>

                    <Link to="/why-strava"><p className='login-text'>Why connect with STRAVA?</p></Link>
                    <a href="https://www.strava.com/"><p className='login-text'>Dont have STRAVA? Get it here!</p></a>
                    <Link to="/sign-up"><p className='login-text'>Don't have an account? Click here to sign up</p>
                    </Link>
                </Tile>
            </div>
        </>

    )
}

export default Login