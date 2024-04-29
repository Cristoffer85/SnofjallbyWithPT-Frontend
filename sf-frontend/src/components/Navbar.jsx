import React, {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SnowfallEffect from './SnowfallEffect.jsx';
import './css/Navbar.css';
import logo from '../assets/Logo.png';
import accountLogo from '../assets/ProfileLogoGold.png';
import snowflakeImg from '../assets/Snowflake.png';
import shoppingCartLogo from '../assets/Shoppingcartlogo.png';
import PageTitleContext from './PageTitleContext';
import CartContext from "./CartContext.jsx";
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import LogOut from './SignOut.jsx';
import {navigateBasedOnRole} from "./Router.jsx";
import Cookies from "js-cookie";

function Navbar({ isLoggedIn, handleLogin, handleLogout, role, username }) {
    const { cart } = useContext(CartContext);
    const pageTitle = useContext(PageTitleContext);
    const [showPopup, setShowPopup] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [formType, setFormType] = useState('Account');
    const [isSnowing, setIsSnowing] = useState(false);
    const [snowKey, setSnowKey] = useState(0);
    const popupRef = React.createRef();
    const navigate = useNavigate();

    // Counter logic for the shopping cart, also present down in the return statement
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [popupRef]);

    const handleSignInClick = () => {
        setShowPopup(true);
        setFormType('SignIn');

    };
    const handleSignUpClick = () => {
        setShowPopup(true);
        setFormType('SignUp');

    };
    const handleLogoutClick = () => {
            handleLogout();
            navigate('/');
        };
    const handleAccountClick = () => {
        if (!isLoggedIn) {
            setShowButtons(!showButtons);
        } else {
            const role = Cookies.get('role');
            const username = Cookies.get('username');
            navigateBasedOnRole(role, username, navigate);
        }

    };
    const handleStartSnow = () => {
        setIsSnowing(true);
        setSnowKey(prevKey => prevKey + 1);

    };


    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/">
                    <img src={logo} alt="Logo" className="main-logo" />
                </Link>
                <ul>
                    <div>
                        <li><Link to="/weather">POWDERTRACKER</Link></li>
                        <li><Link to="/store">STORE</Link></li>
                        <li><Link to="/cart">
                            <img src={shoppingCartLogo} alt="Shopping Cart" className="shopping-cart-logo"/>
                            {totalItems > 0 && (
                                <div className="cart-count">
                                    {totalItems}
                                </div>
                            )}
                        </Link></li>
                        <h1 className="navbar-title">{pageTitle}</h1>
                    </div>
                    <div>
                        {!isLoggedIn && showButtons && (
                            <>
                                <button onClick={handleSignInClick} className="signin-button">Sign In</button>
                                <button onClick={handleSignUpClick} className="signup-button">Sign Up</button>
                            </>
                        )}
                        {isLoggedIn && (
                            <button onClick={handleLogoutClick} className="signout-button">Sign Out</button>
                        )}
                        <img src={snowflakeImg} alt="Start snow" onClick={handleStartSnow} className="snowflake-button" /> {/* Use the Snowflake.png image as the button */}
                        <img src={accountLogo} alt="AuthHandler" onClick={handleAccountClick} className="account-logo" />
                    </div>
                </ul>
            </div>
            {showPopup && (
                <div className="login-and-SignInPopup" ref={popupRef}>
                    {formType === 'SignIn' && <SignIn setShowPopup={setShowPopup} handleLogin={handleLogin} />}
                    {formType === 'SignUp' && <SignUp setShowPopup={setShowPopup} handleLogin={handleLogin} />}
                    {formType === 'Logout' && <LogOut setShowPopup={setShowPopup} handleLogout={handleLogout} />}
                </div>
            )}
            <SnowfallEffect key={snowKey} isSnowing={isSnowing} />
        </nav>
    );
}

export default Navbar;
