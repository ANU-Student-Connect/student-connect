// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa'; // Make sure to create a corresponding CSS file for styling

const NavBar = () => {
    return (
        <div className="navbar bg-gray-800 p-4 flex justify-between items-center">
            <div className="navbar-item flex items-center text-white">
                <FaUser className="mr-2" />
                <span>User Info</span>
            </div>
            <div className="navbar-item flex items-center text-white">
                <FaEnvelope className="mr-2" />
                <span>Messages</span>
            </div>
        </div>
    );
};

export default NavBar;