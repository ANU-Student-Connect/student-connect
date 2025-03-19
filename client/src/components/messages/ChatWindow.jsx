import React from 'react';
import { MoreVertical } from 'lucide-react';

const ChatWindow = ({ onToggleProfile, isProfileOpen, selectedFriend }) => {
    if (!selectedFriend) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Select a friend to start chatting</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex items-center">
                <div className="flex items-center flex-grow">
                    <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-12 h-12 rounded-full mr-3" />
                    <div>
                        <h2 className="font-bold text-lg">{selectedFriend.name}</h2>
                        <p className="text-sm text-gray-500">Last reply {selectedFriend.lastReplyTime}</p>
                    </div>
                </div>
                <button className="ml-auto" onClick={onToggleProfile}>
                    <MoreVertical size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {selectedFriend.messages.map((message) => (
                    <div key={message.id} className={`mb-4 ${message.sent ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block rounded-lg py-2 px-4 max-w-xs ${message.sent ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t p-4 flex">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    className="flex-1 border rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-teal-700 text-white px-6 py-2 rounded-r-full hover:bg-teal-800 transition duration-150">
                    SEND
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;