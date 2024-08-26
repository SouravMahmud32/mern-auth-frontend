import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage 
        localStorage.removeItem('token');

        navigate('/login');
    };

    return (
        <div>
            <h2 className=' text-xl font-extrabold text-orange-400'>Welcome to Home Page</h2>
            <button className='rounded-full bg-red-600 py-2 px-2 text-white my-2' onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
