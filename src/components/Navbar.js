import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
// import Logo from "../assets/logo.svg"

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <div className="logo">
                        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                            CyclingScore
                            <i className="fas fa-biking"></i>
                        </Link>
                    </div>
                    <div className='hamburger-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link exact to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/login'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Login
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

                        <li className='nav-item'>
                            <Link
                                to='/contact'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                <i className="fas fa-question-circle"></i>
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;