import React from "react";
import { useNavigate } from'react-router-dom';
import welcome from '../../assets/images/welcome.png';

const GetStart = () => {
  const navigate = useNavigate();
  const showQuestion = () => {
    navigate('/questionbody');
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #f0c2f0, #b3e5fc)', // 渐变色设置
        padding: '4px'
      }}
    >
      <h1 className="text-2xl font-bold text-black mb-4">
        Congratulations! Welcome to the ANU Student Community!
      </h1>
      <img src={welcome} alt="Welcome" className="w-full max-w-md mb-4" />
      <h1 className="text-2xl text-black mb-4">
        Now, let's build a quick profile to show how interesting you are.
      </h1>
      <button onClick={showQuestion} className="bg-indigo-500 hover:bg-indigo-700 text-black font-bold py-2 px-4 rounded-md shadow-md">
        Let's Go Now!
      </button>
    </div>
  );
};

export default GetStart;