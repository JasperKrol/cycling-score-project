import React, {useState} from "react"
import {Link, NavLink, useHistory} from "react-router-dom";
import logoSmall from "../assets/logo_small.png"
import StravaConnect from "../assets/strava-connect.png"


function Navbar() {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <img src={logoSmall} alt="logo" className="nav-logo"/>
                    <div
                        className="hamburger-icon"
                        onClick={handleClick}
                    >
                        <i className={click ? "fas fa-times" : "fas fa-bars"}/>
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="navbar-item">
                            <Link
                                exact to="/"
                                activeClassName="nav-links"
                                onClick={closeMobileMenu}
                            >Home</Link>
                        </li>
                        {/*kan ook een button worden de strava*/}
                        <li className="navbar-item">
                            <img src={StravaConnect} alt="Strava-button"/>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="contact" activeClassName="nav-links"><i class="fas fa-question-circle"/></NavLink>
                        </li>
                        <li className="navbar-item">
                            <Link to="your-scores" activeClassName="nav-links">Your scores</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="leaderboards" activeClassName="nav-links">Leaderboards</Link>
                        </li>
                        <li className="navbar-item">
                            <button>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar