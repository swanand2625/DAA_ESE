import React, { useState, useEffect } from 'react';

const LiveScore = () => {
    // State to manage live scores and past match data
    const [liveScores, setLiveScores] = useState([]);
    const [pastMatches, setPastMatches] = useState([]);
    const sponsors = ["Company A", "Company B", "Company C"]; // Replace with actual sponsor data

    // Mock data loading with useEffect
    useEffect(() => {
        // Fetch data for live scores
        // Here we use mock data; replace with API fetch calls
        const mockLiveScores = [
            { game: "Football", teamA: "Team Alpha", teamB: "Team Beta", scoreA: 3, scoreB: 2 },
            { game: "Basketball", teamA: "Team Gamma", teamB: "Team Delta", scoreA: 70, scoreB: 68 }
        ];
        setLiveScores(mockLiveScores);

        // Fetch data for past matches
        const mockPastMatches = [
            { game: "Football", teamA: "Team Alpha", teamB: "Team Zeta", scoreA: 1, scoreB: 1, date: "2024-10-20" },
            { game: "Basketball", teamA: "Team Beta", teamB: "Team Gamma", scoreA: 60, scoreB: 65, date: "2024-10-18" }
        ];
        setPastMatches(mockPastMatches);
    }, []);

    return (
        <div className="live-score-container">
            <h1>Live Scores</h1>

            {/* Live Scores Section */}
            <div className="live-scores">
                {liveScores.map((score, index) => (
                    <div key={index} className="live-score-item">
                        <h3>{score.game}</h3>
                        <p>{score.teamA} <strong>{score.scoreA}</strong> vs <strong>{score.scoreB}</strong> {score.teamB}</p>
                    </div>
                ))}
            </div>

            {/* Past Matches Section */}
            <div className="past-matches">
                <h2>Past Matches</h2>
                {pastMatches.map((match, index) => (
                    <div key={index} className="past-match-item">
                        <h4>{match.game} - {match.date}</h4>
                        <p>{match.teamA} <strong>{match.scoreA}</strong> vs <strong>{match.scoreB}</strong> {match.teamB}</p>
                    </div>
                ))}
            </div>

            {/* Footer with Sponsors */}
            <footer className="sponsors-footer">
                <h3>Sponsored By:</h3>
                <div className="sponsor-list">
                    {sponsors.map((sponsor, index) => (
                        <span key={index} className="sponsor-item">{sponsor}</span>
                    ))}
                </div>
            </footer>

            {/* Styling */}
            <style jsx>{`
                .live-score-container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                .live-scores, .past-matches {
                    margin-bottom: 20px;
                }
                .live-score-item, .past-match-item {
                    background: #f5f5f5;
                    padding: 10px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                }
                .sponsors-footer {
                    background: #333;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
                .sponsor-list {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 5px;
                }
                .sponsor-item {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default LiveScore;
