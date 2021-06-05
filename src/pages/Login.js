import "../components/Login.css"
import Connect from "../assets/strava-connect.png"


function Login() {
    return (
        <>
           <div className="container">
            <section className="tile">
                <h3>Welcome!</h3>
                <h4>View Your Scores<br /> &  <br />Compare with your friends</h4>
                <button><img src={Connect} alt="connect with"/></button>
                <p>Why connect with STRAVA?</p>
                <p>Dont have STRAVA? Get it here!</p>
            </section>
           </div>
</>


    )
}

export default Login