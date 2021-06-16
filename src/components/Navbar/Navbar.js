import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Button from "../Button/Button";

// import Logo from "../assets/logo.svg"

function Navbar({isAuthenticated, toggleIsAuthenticated}) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>

                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        CyclingScore
                        <i className="fas fa-biking"/>
                    </Link>

                    <div className='hamburger-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        {!isAuthenticated && (
                            <li className='nav-item'>
                                <Link
                                    to='/login'
                                    className='nav-links'
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>
                            </li>
                        )}

                        {isAuthenticated && (
                            <>
                                <li className='nav-item'>
                                    <Link exact to='/' className='nav-links' onClick={closeMobileMenu}>
                                        Home
                                    </Link>
                                </li>

                                <li className='nav-item'>
                                    <Link
                                        to='/your-scores'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Your Scores
                                    </Link>
                                </li>

                                <li className='nav-item'>
                                    <Link
                                        to='/leaderboards'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Leaderboards
                                    </Link>
                                </li>

                                <li className='nav-item'>
                                    <Link
                                        to='/profile'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Profile
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Button
                                        className="nav-button"
                                        redirect="home"
                                        text="Sign out"
                                        toggleIsAuthenticated={toggleIsAuthenticated}
                                        isAuthenticated={isAuthenticated}
                                    />
                                </li>
                            </>
                        )}

                        <li className='nav-item'>
                            <Link
                                to='/contact'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                <i className="fas fa-question-circle"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;