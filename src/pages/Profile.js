import {Link, useHistory} from "react-router-dom";
import "../components/Profile.css"

function Profile ({toggleIsAuthenticated, isAuthenticated}) {


    const history = useHistory();

    function logOutClick () {
        toggleIsAuthenticated(!isAuthenticated)
        history.push("/")
    }
    return (
        <div className="container">
            <section className="contact-tile">
                <h3>Hi #user#!</h3>
                <h3>Click here to log out</h3>
                <Link>
                    <button onClick={logOutClick} className="logout"><span>Bye Bye!</span></button>
                </Link>

            </section>
        </div>
    )
}

export default Profile