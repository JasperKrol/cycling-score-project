import "./SignUp.css"
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";
import React, { useRef } from "react";
import {useState} from 'react'
import app from '../../Firebase'
import Tile from "../../components/Tile/Tile";
import {authContext, useAuthContext} from "../../contexts/AuthContext";

function SignUp(data) {
    const history = useHistory();

    // State management
    const [action, setAction] = useState('signup')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const { currentUser, setUser, signUp } = useAuthContext()



    // Handle the submit
    async function onSubmit(e) {

        // Prevent page reload
        e.preventDefault()
        console.log(`${action} requested with email ${email} and password ${password}`)

        // if (password.current.value !== passwordConfirm.current.value) {
        //     return setError("Passwords do not match")
        // }

        // Do the actual registration
        try {
            setError("")
            setLoading(true)
            // await signUp(email.current.value, password.current.value)
            const userCredential = await app.auth().createUserWithEmailAndPassword(email, password)
            console.log('Registered', userCredential)
            setUser(userCredential.user)

        } catch (e) {
            console.error('Firebase fail: ', e)
            setError("failed to create an account")
        }
        setLoading(false)


    }

    function redirect() {
        history.push("/login");
    }


    return (
        <>
            <div className="container">
                <Tile className="tile">
                    <h3>Sign up down below</h3>
                    {error && <h2>{error}</h2>}

                    <div className="form-container">
                        <form onSubmit={onSubmit}>
                            {(currentUser) ? <h1>Hello {currentUser.email}</h1> : ""}
                            <label htmlFor="email">Email:</label>
                            <input onChange={e => setEmail(e.target.value)} placeholder='your@email.com' type='email'
                                   name='email' value={email}/>
                            <label htmlFor="password">Password:</label>
                            <input onChange={e => setPassword(e.target.value)} placeholder='Your password' type='password'
                                   name='password' value={password}/>
                            <label htmlFor="password-confirmation">Password Confirmation:</label>
                            <input onChange={e => setPasswordConfirm(e.target.value)} placeholder='Your password' type='password'
                                   name='password-confirmation' value={passwordConfirm}/>
                            <Button
                                text="Register"
                                value={action}
                                disabled={loading}
                            />
                            {/*<input type='submit' value={action}/>*/}
                        </form>
                    </div>



                    <Link onClick={redirect}><p className='login-text'>Already have an account? Click here to login</p>
                    </Link>
                </Tile>
            </div>
        </>

    )
}

export default SignUp