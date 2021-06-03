import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from "../assets/logo.svg"


function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeTheMobileMenu = () => setClick(false);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <img className='navbar-logo' onClick={closeTheMobileMenu} src={Logo} alt="logo"/>
                    <div className='hamburger-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeTheMobileMenu}>
                                Home
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/your-scores'
                                className='nav-links'
                                onClick={closeTheMobileMenu}
                            >
                                Your scores
                            </Link>
                        </li>

                        <li>
                            <Link
                                to='/leaderboards'
                                className='nav-links'
                                onClick={closeTheMobileMenu}
                            >
                                Leaderboards
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/contact'
                                className='nav-links'
                                onClick={closeTheMobileMenu}
                            ><i className="fas fa-question-circle"/>
                            </Link>
                        </li>

                    {/*button maken voor sign out / sing in*/}


                    </ul>

                </div>
            </nav>
        </>
    );
}

export default Navbar;