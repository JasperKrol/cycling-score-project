import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';
import Button from "../Button/Button";
import {useAuthContext} from "../../contexts/AuthContext";


function Navbar() {
    const [click, setClick] = useState(false);
    const {user} = useAuthContext()
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <NavLink
                        to='/'
                        className='navbar-logo' onClick={closeMobileMenu}>
                        CyclingScore
                        <i className="fas fa-biking"/>
                    </NavLink>

                    <div className='hamburger-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        {!user ? (<>
                            <>
                                <li className='nav-item'>
                                    <NavLink
                                        to='/login'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Login
                                    </NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink
                                        to='/sign-up'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Sign up here
                                    </NavLink>
                                </li>
                            </>

                        </>) : (

                            <>
                                <li className='nav-item'>
                                    <NavLink
                                        to='/'
                                        className='nav-links'
                                        onClick={closeMobileMenu}>
                                        Home
                                    </NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink
                                        to='/your-scores'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Your Scores
                                    </NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink
                                        to='/leaderboards'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Leaderboards
                                    </NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink
                                        to='/profile'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Profile
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <Button
                                        text="Sign out"
                                        redirect="home"
                                    />
                                </li>
                            </>
                        )}

                        <li className='nav-item'>
                            <NavLink
                                to='/contact'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                <i className="fas fa-question-circle"/>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;