import React, { useState, useRef } from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";

const Header = ({ currentPage }) => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const { logout } = useLogout();

    const handleLogout = async () => {
        console.log('User logged out');
        await logout()
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowLogout(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowLogout(false);
        }, 300); // 300ms delay
    };

    return (
        <header className="bg-teal-700 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">ANU STUDENT CONNECT</h1>
            <div className="flex items-center space-x-6">
                <nav>
                    <ul className="flex space-x-4">
                        <li className="relative">
                            <button className="hover:text-gray-300 transition-colors" onClick={()=> navigate('/home')}>
                                Home
                                {currentPage === 'home' && (
                                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded-t-md"></div>
                                )}
                            </button>
                        </li>
                        <li className="relative">
                            <button className="hover:text-gray-300 transition-colors" onClick={()=> navigate('/message')}>
                                Message
                                {currentPage === 'messages' && (
                                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded-t-md"></div>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
                {/* <Bell className="cursor-pointer hover:text-gray-300 transition-colors" /> */}
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <User
                        className="cursor-pointer hover:text-gray-300 transition-colors"
                        onClick={() => navigate('/userprofile')}
                    />
                    {showLogout && (
                        <div
                            className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;