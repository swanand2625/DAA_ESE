import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Ensure useEffect only runs on component mount (by providing an empty dependency array)
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');  // If user is already authenticated, redirect to home page
        }
    }, [navigate]);  // Add `navigate` as a dependency to avoid issues

    const handleLogin = async () => {
        const result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const res = await result.json();
        
        if (res.token) {
            // Save the JWT token to localStorage
            localStorage.setItem('token', res.token);
            // Optionally store user information as well
            localStorage.setItem('user', JSON.stringify(res));
            navigate('/');  // Redirect to home page after successful login
        } else {
            alert("No User Found");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <div className="reg">
                <input 
                    type='text' 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type='password' 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button className="appbtn" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
