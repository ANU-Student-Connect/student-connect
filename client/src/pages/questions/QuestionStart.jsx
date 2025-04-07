import React from "react";
import { useNavigate } from'react-router-dom';
import welcome from '../../assets/images/welcome.png';

// Define style objects for easy management and reuse
const containerStyle = {
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #f0c2f0, #b3e5fc)',
    padding: '4px'
};

// Style for titles
const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1rem'
};

// Style for the button
const buttonStyle = {
    backgroundColor: '#6366f1',
    color: 'black',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#4f46e5'
    }
};

const GetStart = () => {
    const navigate = useNavigate();

    // Encapsulate the navigation function to add additional logic later
    const handleShowQuestion = () => {
        try {
            navigate('/questionbody');
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>
                Congratulations! Welcome to the ANU Student Community!
            </h1>
            <img src={welcome} alt="Welcome" className="w-full max-w-md mb-4" />
            <h1 style={titleStyle}>
                Now, let's build a quick profile to show how interesting you are.
            </h1>
            <button onClick={handleShowQuestion} style={buttonStyle}>
                Let's Go Now!
            </button>
        </div>
    );
};

export default GetStart;    