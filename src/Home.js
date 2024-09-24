import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';  // Importing CSS

const Home = () => {
    const [topUsers, setTopUsers] = useState([]);

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
        

        fetchLeaderboard();
    }, []);

    return (
        <div className="home-container">
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
        </div>
    );
};

export default Home;
