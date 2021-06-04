import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Logo from "../assets/logo.svg"


function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeTheMobileMenu = () => setClick(false);

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="hamburger-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas-fa-bars"}/>
                </div>

                <div className="navbar-links">
                    <ul className={click ? 'navbar active' : 'navbar'}>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/your-scores'>Your scores</Link></li>
                        <li><Link to='/leaderboards'>leaderboards</Link></li>
                        <li><Link to='/profile'>profile</Link></li>
                        <li><Link to='/contact'> <i className="fas fa-question-circle"/></Link></li>
                        <li><i className={click ? "fas fa-times" : "fas-fa-bars"}/></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;