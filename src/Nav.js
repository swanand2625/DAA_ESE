import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div>
            <ul className="Nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/findcontact">Find Contact</Link></li>
                <li><Link to="/myprofile">My Profile</Link></li>
                
                {auth ? (
                    <li><Link onClick={logout} to="/signup">LogOut</Link></li>
                ) : (
                    <>
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Nav;
