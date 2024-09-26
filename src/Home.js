import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';  // Importing CSS

const Home = () => {
    const [topUsers, setTopUsers] = useState([]);
    const [votingPair, setVotingPair] = useState([]);
    const [selectedWinner, setSelectedWinner] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/leaderboard', {
                    auth: {
                        username: 'user',
                        password: 'Animal@88' 
                    }
                });
                setTopUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch leaderboard', error);
            }
        };

        const fetchVotingPair = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/voting-pair', {
                    auth: {
                        username: 'user',
                        password: 'Animal@88'
                    }
                });
                setVotingPair(response.data);
            } catch (error) {
                console.error('Failed to fetch voting pair', error);
            }
        };

        // Initial fetch
        fetchLeaderboard();
        fetchVotingPair();

        // Polling every 5 seconds for leaderboard
        const leaderboardIntervalId = setInterval(fetchLeaderboard, 5000);

        // Clean up on component unmount
        return () => clearInterval(leaderboardIntervalId);
    }, []);

    const handleVote = async (winnerId, loserId) => {
        try {
            await axios.post('http://localhost:8080/elo/update', {
                winnerId,
                loserId
            }, {
                auth: {
                    username: 'user',
                    password: 'Animal@88'
                }
            });

            // Refresh voting pair after a vote
            const response = await axios.get('http://localhost:8080/users/voting-pair', {
                auth: {
                    username: 'user',
                    password: 'Animal@88'
                }
            });
            setVotingPair(response.data);
        } catch (error) {
            console.error('Failed to submit vote', error);
        }
    };

    return (
        <div className="home-container">
            {/* Leaderboard */}
            <h1 className="leaderboard-title">Leaderboard</h1>
            <ul className="leaderboard-list">
                {topUsers.map(user => (
                    <li key={user.id} className="leaderboard-item">
                        <img 
                            src={`https://res.cloudinary.com/dll3jvt1p/image/upload/${user.photoUrl}`} 
                            alt={user.name} 
                            className="leaderboard-image" 
                        />
                        <p className="leaderboard-text">{user.name}: {user.rating.toFixed(2)}</p>
                    </li>
                ))}
            </ul>

            {/* Voting Pair */}
            <h2 className="voting-title">Pick the better one...!</h2>
            <div className="voting-container">
                {votingPair.length === 2 && (
                    <>
                        <div className="voting-item" onClick={() => handleVote(votingPair[0].id, votingPair[1].id)}>
                            <img 
                                src={`https://res.cloudinary.com/dll3jvt1p/image/upload/${votingPair[0].photoUrl}`} 
                                alt={votingPair[0].name} 
                                className="voting-image" 
                            />
                            <p className="voting-text">{votingPair[0].name}</p>
                        </div>
                        <div className="voting-item" onClick={() => handleVote(votingPair[1].id, votingPair[0].id)}>
                            <img 
                                src={`https://res.cloudinary.com/dll3jvt1p/image/upload/${votingPair[1].photoUrl}`} 
                                alt={votingPair[1].name} 
                                className="voting-image" 
                            />
                            <p className="voting-text">{votingPair[1].name}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
