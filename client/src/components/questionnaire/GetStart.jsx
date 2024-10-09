import React from "react";
import { useNavigate } from 'react-router-dom';
import welcome from '../../assets/images/welcome.png';
import TopBar from '../basic/TopBar'



const GetStart = () =>{

    const navigate = useNavigate();
    const showQuestion = () =>{

        navigate('/question');
    }
    

    return(
        <div className="flex flex-col h-screen"
        style={{ backgroundColor: '#2B7475' }}>
            <TopBar />
            
            <div className="flex flex-col items-center justify-center mt-12">
                <div className="flex items-center mb-10">
                    <h1 className="text-2xl font-bold text-white">
                        Congratulations! Welcome to the ANU Student Community!
                    </h1>
                </div>
                <div className="flex items-center mb-10">
                    <img src={welcome} alt="Welcome" />
                </div>
                <div className="flex items-center mb-10">
                    <h1 className="text-2xl text-white">
                        Now, let's build a quick profile to show how interesting you are.
                    </h1>
                </div>
                <div className="flex items-center mb-10">
                    <button onClick={showQuestion} className="w-40 px-4 py-2">Let's Go Now!</button>
                </div>
            </div>
        </div>

    )


}

export default GetStart;