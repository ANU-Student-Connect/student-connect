import React from "react";
import { useNavigate } from 'react-router-dom';

import Completed from '../../assets/icons/completed.png'

const QuestionEnd = () => {
    const navigate = useNavigate();

    const showQuestion = () => {
        navigate('/');
    }

    return (
        <div className="flex flex-col h-screen questionnaire-bg">
            <div className="flex flex-col items-center justify-center mt-40 flex-grow">
                <div className="flex items-center mb-16">
                    <img src={Completed} alt="Completed"/>
                    <h1 className="text-4xl ml-5">Thank you for your help.</h1>
                </div>
               
                <div className="flex items-center mb-16">
                    <h1 className="text-4xl">Welcome to ANU Student Connect.</h1>
                </div>

                <div className="flex items-center mb-16">
                    <h1 className="text-4xl">We wish you enjoy the journey...</h1>
                </div>

                <div className="flex items-center mb-10">
                    <button onClick={showQuestion} className="w-40 px-4 py-2">Get Started</button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 h-2">
                <div
                    className="h-full"
                    style={{ width: '100%', backgroundColor: '#2B7475' }}
                ></div>
            </div>
        </div>
    );
}

export default QuestionEnd;
