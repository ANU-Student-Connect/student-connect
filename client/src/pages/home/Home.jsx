import React from 'react';
import { ChevronLeft, ChevronRight, Filter, Bell, User, MessageCircle } from 'lucide-react';
import TopBar from "../../components/basic/TopBar";
import { Link } from 'react-router-dom';

// Sample user data (would typically come from API/state)
const users = [
    {
        name: 'Simon Norina',
        degree: 'Bachelor of IT',
        description: 'be good here! I am a cool person :)',
        interests: ['Rainbow Six Siege'],
        sports: ['Badminton', 'Basketball'],
        year: 'DIT'
    },
    {
        name: 'Sid Dilova',
        degree: 'Bachelor of Commerce',
        description: 'be good here! I am a cool person :)',
        interests: ['Rainbow Six Siege'],
        sports: ['Badminton', 'Basketball'],
        year: 'DIT'
    },
    {
        name: 'Kyriakos Vipin',
        degree: 'Bachelor of Art',
        description: 'be good here! I am a cool person :)',
        interests: ['Rainbow Six Siege'],
        sports: ['Badminton', 'Basketball'],
        year: 'DIT'
    }
];

const StudentCard = ({ user }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 m-2 border border-gray-100">
        <div className="flex items-center mb-3">
            <img
                src="/api/placeholder/50/50"
                alt={user.name}
                className="w-12 h-12 rounded-full mr-3"
            />
            <div>
                <h3 className="font-bold text-sm">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.degree}</p>
            </div>
        </div>
        <p className="text-xs text-gray-600 mb-3">{user.description}</p>
        <div className="flex items-center text-xs text-gray-500 mb-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            {user.interests.map((interest, index) => (
                <span key={index} className="mr-1">{interest}</span>
            ))}
        </div>
        <div className="flex items-center text-xs text-gray-500">
            <Filter className="w-4 h-4 mr-2" />
            {user.sports.map((sport, index) => (
                <span key={index} className="mr-1">{sport}</span>
            ))}
            <span className="ml-auto text-xs">{user.year}</span>
        </div>
    </div>
);

const Home = () => {
    return (
        <div className="w-full h-full min-h-screen bg-white shadow-lg rounded-lg flex flex-col">
             <TopBar currentPage="userprofile" />
            <div className="p-6">
                {/* Recommendations Section - First Row */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Recommendations</h2>

                    {/* Navigation and Filtering for Recommendations */}
                    <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-2 mr-4">
                            <ChevronLeft className="text-gray-600" />
                            <ChevronRight className="text-gray-600" />
                        </div>
                    </div>

                    {/* Recommendations User Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        {users.map((user, index) => (
                            <StudentCard key={index} user={user} />
                        ))}
                    </div>
                </div>

                {/* Search with Filter - Second Row */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Search with filter</h2>

                    {/* Filter Buttons */}
                    <div className="flex space-x-2 mb-4">
                        <button className="bg-white border rounded-full px-3 py-1 text-xs">Video games</button>
                        <button className="bg-white border rounded-full px-3 py-1 text-xs">Movies</button>
                        <button className="bg-white border rounded-full px-3 py-1 text-xs">Travel</button>
                        <button className="bg-white border rounded-full px-3 py-1 text-xs">Art</button>
                    </div>

                    {/* Search Results User Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        {users.map((user, index) => (
                            <StudentCard key={`search-${index}`} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;