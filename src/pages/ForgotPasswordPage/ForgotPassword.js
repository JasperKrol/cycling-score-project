import React, {useState} from "react";
import "./ForgotPassword.css"
import Tile from "../../components/Tile/Tile";
import {Link, useHistory} from "react-router-dom";
import {useAuthContext} from "../../contexts/AuthContext";
import app from "../../Firebase";
import Button from "../../components/Button/Button";

function ForgotPassword() {
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
                    {loading ? (<><h2>Loading, please wait</h2></>) : (<>
                        <h3>Reset your password below!</h3>
                        {error && <h2>{error}</h2>}

                        <form onSubmit={onSubmit}>
                            <label htmlFor="email"><h4>Your email:</h4></label>
                            <input onChange={e => setEmail(e.target.value)} placeholder='your@email.com' type='email'
                                   name='email' value={email}/>

                            <Button
                                text="Reset password"
                            />

                            <Link to="/login">
                                <p className='login-text'>Go back to the login page.</p>
                            </Link>
                            <Link to="/sign-up">
                                <p className='login-text'>Click here to create an account.</p>
                            </Link>
                        </form>
                    </>)}
                </Tile>
            </div>
        </>

    )
}

export default ForgotPassword