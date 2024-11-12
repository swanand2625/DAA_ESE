import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobno,setMobno]=useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]); // Added the dependency array to ensure this runs only on component mount

    const collectData = async () => {
        const result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password,mobno}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const res = await result.json();
        if (res) {
            // Uncomment the line below if you want to store the user in local storage upon successful registration
             //localStorage.setItem('user', JSON.stringify(res));
            navigate('/login'); // Redirect to the login page after successful registration
        } else {
            console.error('Registration failed');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <div className="reg">
                <input
                    type='text'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type='text'
                    placeholder="Mob. no"
                    value={mobno}
                    onChange={(e) => setMobno(e.target.value)}
                />
            </div>
            <button className="appbtn" onClick={collectData}>Sign Up</button>
        </div>
    );
};

export default SignUp;
