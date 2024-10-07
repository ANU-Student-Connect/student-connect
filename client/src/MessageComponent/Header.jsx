import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = ({ currentPage }) => {
    return (
        <header className="bg-teal-700 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">ANU STUDENT CONNECT</h1>
            <div className="flex items-center space-x-6">
                <nav>
                    <ul className="flex space-x-4">
                        <li className="relative">
                            <button className="hover:text-gray-300 transition-colors">
                                Home
                                {currentPage === 'home' && (
                                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded-t-md"></div>
                                )}
                            </button>
                        </li>
                        <li className="relative">
                            <button className="hover:text-gray-300 transition-colors">
                                Messages
                                {currentPage === 'messages' && (
                                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded-t-md"></div>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
                <Bell className="cursor-pointer hover:text-gray-300 transition-colors" />
                <User className="cursor-pointer hover:text-gray-300 transition-colors" />
            </div>
        </header>
    );
};

export default Header;