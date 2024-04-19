import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthHandler from './AuthHandler.jsx';
import './CSS/Navbar.css';
import logo from '../assets/Logo.jpg';
import accountLogo from '../assets/ProfileLogoGold.png';

function Navbar({ isLoggedIn, handleLogin, handleLogout }) {
    useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);


    const handleAccountClick = () => {
        if (!isLoggedIn) {
            setShowButtons(!showButtons); // Toggle showButtons state
        } else {
            setShowPopup(!showPopup); // Toggle showPopup state
        }
    };

    const handleSignInClick = () => {
        setShowPopup(true);
        setShowRegisterForm(false);
    };

    const handleSignUpClick = () => {
        setShowPopup(true);
        setShowRegisterForm(true);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <ul>
                    <div>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/store">Store</Link></li>
                        <li><Link to="/weather">Weather</Link></li>
                    </div>
                    <div>
                        {!isLoggedIn && showButtons && (
                            <>
                                <button onClick={handleSignInClick}>Sign In</button>
                                <button onClick={handleSignUpClick}>Sign Up</button>
                            </>
                        )}
                        <li><img src={accountLogo} alt="AuthHandler" onClick={handleAccountClick}/></li>
                    </div>
                </ul>
            </div>
            {showPopup && <AuthHandler isLoggedIn={isLoggedIn} setShowPopup={setShowPopup} handleLogin={handleLogin} handleLogout={handleLogout} showRegisterForm={showRegisterForm} />}
        </nav>
    );
}

export default Navbar;