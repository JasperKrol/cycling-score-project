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
                <div className='hamburger-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>


                <div className="navbar-links">
                    <ul className={click ? 'navbar active' : 'navbar'}>
                        <li className="nav-li"><Link className='nav-links'
                            // onClick={closeMobileMenu}
                                                     to='/'>Home</Link></li>
                        <li className="nav-li"><Link className='nav-links'
                            // onClick={closeMobileMenu}
                                                     to='/login'>Login</Link></li>
                        <li className="nav-li"><Link className='nav-links'
                            // onClick={closeMobileMenu}
                                                     to='/your-scores'>Your scores</Link></li>
                        <li className="nav-li"><Link className='nav-links'
                            // onClick={closeMobileMenu}
                                                     to='/leaderboards'>leaderboards</Link></li>
                        <li className="nav-li"><Link className='nav-links'
                            // onClick={closeMobileMenu}
                                                     to='/profile'>profile</Link></li>
                        <li className="nav-li">
                            <Link
                                  activeClassName="active"
                                  className="nav-links"
                                  onClick={handleClick}
                                                     to='/contact'> <i className="fas fa-question-circle"/></Link></li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;