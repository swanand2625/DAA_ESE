import React, { useState, useEffect } from 'react';
import './MyProfile.css'; // Adjust the path if necessary

const MyProfile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobno: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Get the user object from local storage and parse it
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.userId : null; // Safely access userId
    const token = storedUser ? storedUser.token : null; // Safely access token

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId || !token) {
                setErrorMessage('User not found. Please log in again.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the header
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Read the error response as text
                    throw new Error(errorText);
                }

                const data = await response.json();
                setUser({
                    name: data.name || '', // Ensure default value
                    email: data.email || '', // Ensure default value
                    mobno: data.phone_number || '' // Ensure default value matches your DB
                });
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
                setErrorMessage('Failed to fetch user profile. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchUserProfile();
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        // Basic validation can be added here
        fetch(`http://localhost:5000/profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include token in the header
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert('Profile updated successfully'); // Notify user of successful update
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + error.message);
        });
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div>
            <h2>My Profile</h2>
            {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message if any */}
            <div>
                <label>Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{user.name}</p>
                )}
            </div>
            <div>
                <label>Email:</label>
                {isEditing ? (
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{user.email}</p>
                )}
            </div>
            <div>
                <label>Mobile No:</label>
                {isEditing ? (
                    <input
                        type="tel" // Changed to tel for mobile numbers
                        name="mobno"
                        value={user.mobno}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{user.mobno}</p>
                )}
            </div>
            {isEditing ? (
                <button onClick={handleSave}>Save Profile</button>
            ) : (
                <button onClick={handleEdit}>Edit Profile</button>
            )}
        </div>
    );
};

export default MyProfile;
