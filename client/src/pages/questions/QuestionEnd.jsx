// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import Completed from '../../assets/icons/completed.png';

// Define a constant for the background style to improve readability and maintainability
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

// Define a constant for the button style to make it easier to modify and reuse
const buttonStyle = {
    backgroundColor: '#6366f1',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#4f46e5'
    }
};

const QuestionEnd = () => {
    const navigate = useNavigate();

    // Function to handle the click event of the button and navigate to the home page
    const showHomePage = () => {
        try {
            navigate('/home');
        } catch (error) {
            console.error('Error navigating to home page:', error);
        }
    };

    return (
        <div className="flex flex-col" style={containerStyle}>
            <div className="flex flex-col items-center justify-center mt-12 flex-grow">
                <div className="flex items-center mb-10">
                    <img src={Completed} alt="Completed" />
                    <h1 className="text-4xl ml-5">Thank you for your help.</h1>
                </div>
                <div className="flex items-center mb-10">
                    <h1 className="text-4xl">Welcome to ANU Student Connect.</h1>
                </div>
                <div className="flex items-center mb-10">
                    <h1 className="text-4xl">We wish you enjoy the journey...</h1>
                </div>
                <div className="flex items-center mb-10">
                    <button onClick={showHomePage} style={buttonStyle}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionEnd;    