import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";
import React from "react";
import {useState} from 'react'
import app from '../../data/Firebase'
import Tile from "../../components/Tile/Tile";


function Login({isAuthenticated, toggleIsAuthenticated}) {
    const history = useHistory();

    // State management
    const [action, setAction] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState()

    // Handle the submit
    async function onSubmit(e) {

        // Prevent page reload
        e.preventDefault()
        console.log(`${action} requested with email ${email} and password ${password}`)

        // Do the actual registration
        try {

            if (action === 'login') {
                const userCredential = await app.auth().signInWithEmailAndPassword(email, password)
                console.log('Logged in: ', userCredential)
                setUser(userCredential.user)
            }

            if (action === 'register') {
                const userCredential = await app.auth().createUserWithEmailAndPassword(email, password)
                console.log('Registered', userCredential)
                setUser(userCredential.user)
            }

        } catch (e) {
            console.error('Firebase fail: ', e)
        }


    }

    function redirect() {
        history.push("/why-strava");
    }

    // const {STRAVA_CLIENT_ID} = process.env;
    // const redirectUrl = "http://localhost:3000/redirect"
    //
    // function handleLogin() {
    //     window.location = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=read`;
    // }


    return (
        <>
            <div className="container">
                <Tile className="tile">
                    <h3>Welcome!</h3>
                    <h4>View Your Scores<br/> & <br/>Compare with your friends</h4>
                    <Link
                        // onClick={handleLogin}
                    >
                        <Button
                            text="Connect with STRAVA"
                            toggleIsAuthenticated={toggleIsAuthenticated}
                            isAuthenticated={isAuthenticated}
                        />
                    </Link>

                    <form onSubmit={onSubmit}>
                        {(user) ? <h1>Hello { user.email }</h1> : "" }
                        <input onChange={e => setEmail(e.target.value)} placeholder='your@email.com' type='email'
                               name='email' value={email}/>
                        <input onChange={e => setPassword(e.target.value)} placeholder='Your password' type='password'
                               name='password' value={password}/>
                        <input type='submit' value={action}/>


                    </form>

                    <div>
                        <Link id='loginToggle' href='#'
                           onClick={f => setAction(action === 'login' ? 'register' : 'login')}>{action === 'login' ? 'Register' : 'Login'} instead</Link>
                    </div>

                    <Link onClick={redirect}><p className='login-text'>Why connect with STRAVA?</p></Link>
                    <a href="https://www.strava.com/"><p className='login-text'>Dont have STRAVA? Get it here!</p></a>
                </Tile>
            </div>
        </>

    )
}

export default Login