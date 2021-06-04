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
            <nav className='navbar'>
                <div className='navbar-container'>

                    <div className="logo-wrapper">
                        {/*<h2>LOGO</h2>*/}
                        <img className='navbar-logo' onClick={closeTheMobileMenu} src={Logo} alt="logo"/>
                    </div>


                    <div className='hamburger-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-list' onClick={closeTheMobileMenu}>
                                Home
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link
                                to='/your-scores'
                                className='nav-list'
                                onClick={closeTheMobileMenu}
                            >
                                Your scores
                            </Link>
                        </li>

                        <li>
                            <Link
                                to='/leaderboards'
                                className='nav-list'
                                onClick={closeTheMobileMenu}
                            >
                                Leaderboards
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/contact'
                                className='nav-list'
                                onClick={closeTheMobileMenu}
                            >
                                <i className="fas fa-question-circle"/>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <button className="nav-button"

                                // onClick={closeTheMobileMenu}
                            >Sign OUt</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;