import "../components/Login.css"
import {Link, useHistory} from "react-router-dom";


function Login({isAuthenticated, toggleIsAuthenticated}) {
    const history = useHistory();

    function handleClick() {
        toggleIsAuthenticated(!isAuthenticated)
        history.push("/");
        console.log("klikt dit??")
    }

    function redirect() {
        history.push("/why-strava");
    }


    return (
        <>
            <div className="container">
                <section className="tile">
                    <h3>Welcome!</h3>
                    <h4>View Your Scores<br/> & <br/>Compare with your friends</h4>
                    <Link>
                        <button onClick={handleClick} className="connect-with"><span>Connect with STRAVA</span></button>
                    </Link>
                    <Link onClick={redirect}><p className='login-text'>Why connect with STRAVA?</p></Link>
                    <a href="https://www.strava.com/"><p className='login-text'>Dont have STRAVA? Get it here!</p></a>
                </section>
            </div>
        </>

    )
}

export default Login