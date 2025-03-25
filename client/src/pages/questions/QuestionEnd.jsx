// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from 'react-router-dom';
import Completed from '../../assets/icons/completed.png'

const QuestionEnd = () => {
    const navigate = useNavigate();
    const showHomePage = () => {
        navigate('/home');
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-purple-200 to-blue-200 p-4"
        style={{
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #f0c2f0, #b3e5fc)',
            padding: '4px'
        }}>
            <div className="flex flex-col items-center justify-center mt-12 flex-grow">
                <div className="flex items-center mb-10">
                    <img src={Completed} alt="Completed"/>
                    <h1 className="text-4xl ml-5">Thank you for your help.</h1>
                </div>
                <div className="flex items-center mb-10">
                    <h1 className="text-4xl">Welcome to ANU Student Connect.</h1>
                </div>
                <div className="flex items-center mb-10">
                    <h1 className="text-4xl">We wish you enjoy the journey...</h1>
                </div>
                <div className="flex items-center mb-10">
                    <button onClick={showHomePage} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestionEnd;