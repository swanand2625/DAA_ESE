import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showImportantNumbers, setShowImportantNumbers] = useState(true);
    
    // Check if the user is logged in
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token !== null;
    };

    const handleSearch = async () => {
        if (!isAuthenticated()) {
            alert("You need to be logged in to perform this action.");
            return; // Prevent search if not authenticated
        }

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const response = await axios.post('http://localhost:5000/search', { query: searchTerm }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error searching for contacts:', error);
        }
    };

    return (
        <div className="contact-container">
            <h1 className="title">Contact Book</h1>

            {showImportantNumbers && (
                <div className="important-numbers">
                    <h2>Important Numbers:</h2>
                    <ul>
                        <li>Police: 100</li>
                        <li>Ambulance: 102</li>
                        <li>Fire Brigade: 101</li>
                    </ul>
                </div>
            )}

            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search contacts..."
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {results.length > 0 && (
                <div className="results-container">
                    <h2>Search Results:</h2>
                    <ul className="results-list">
                        {results.map((result) => (
                            <li key={result.id} className="result-item">
                                <strong>Name:</strong> {result.name} <br />
                                <strong>Email:</strong> {result.email} <br />
                                <strong>Phone:</strong> {result.phone_number}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Contact;
