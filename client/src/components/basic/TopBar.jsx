import React from "react";
import notification from '../../assets/icons/notification.png'
import defaultavater from '../../assets/icons/defaultavater.png'
import chosenstate from '../../assets/icons/chosenstate.png'

const TopBar = () =>{
    return(
        <div className='flex justify-between item-center px-4 py-2 min-h-20'
            style={{ backgroundColor: '#2B7475' }}>
            <div className="flex item-center mt-5">
                <h1 className="text-2xl font-bold text-white">ANU STUDENT CONNECT</h1>
            </div>
            <div className="flex">
                <div className="flex flex-col items-center px-6 mt-5">
                    <p className="text-base text-white">home</p>
                    <img src={chosenstate} alt='' className="hidden w-11 h-1"/>
                </div>
                <div className="flex flex-col items-center px-6 mt-5">
                    <p className="text-base text-white">message</p>
                    <img src={chosenstate} alt='chosenstate' className="w-13 h-1"/>
                </div>
                <div className="flex items-center mx-3">
                    <img src={notification} alt="notification" className="w-10 h-10"/>
                </div>
                <div className="flex items-center mx-2">
                    <img src={defaultavater} alt="" className="w-10 h-10"/>
                </div>
            </div>
        </div>
    )
}

export default TopBar