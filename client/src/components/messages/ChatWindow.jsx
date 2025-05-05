import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', { withCredentials: true });

const ChatWindow = ({ onToggleProfile, isProfileOpen, selectedFriend }) => {
    const [newMessage, setNewMessage] = useState("");
    const bottomRef = useRef(null);

// Presented by a good friend of the deceased.
    if (!selectedFriend) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Choose a good friend and start a conversation
            </div> );
    }

//Automatic movement reaches the bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedFriend?.messages?.length]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;
        try {
            const response = await fetch(
                `http://localhost:3001/api/messages/send/${selectedFriend.id}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: newMessage })
                }
            );
            if (!response.ok) throw new Error("Failed to send message");

            const sentMsg = await response.json();

// How to receive notification delivery information
            socket.emit('send-message', {
                _id: sentMsg._id,
                senderId: sentMsg.senderId,
                receiverId: sentMsg.receiverId,
                message: sentMsg.message,
                createdAt: sentMsg.createdAt
            });

// clear air entry frame
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            {/*Obebe Newsletter */}
            <div className="border-b p-4 flex items-center">
                <div className="flex items-center flex-grow">
                    <img
                        src={selectedFriend.avatar}
                        alt={selectedFriend.name}
                        className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                        <h2 className="font-bold text-lg">{selectedFriend.name}</h2>
                        <p className="text-sm text-gray-500">
                            Last reply {selectedFriend.lastReplyTime}
                        </p>
                    </div>
                </div>
                <button className="ml-auto" onClick={onToggleProfile}>
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* News list */}
            <div className="flex-1 overflow-y-auto p-4">
                {selectedFriend.messages.map((message) => (
                    <div key={message.id}
                         className={`mb-2 flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-lg ${
                                message.sent ? 'bg-teal-700 text-white' : 'bg-gray-200 text-black'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Transfer entry frame */}
            <div className="border-t p-4 flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                }}
                    placeholder="Type a message..."
                    className="flex-grow px-4 py-2 border rounded-l-full focus:outline-none"
                />
                <button
                    onClick={handleSend}
                    className="bg-teal-700 text-white px-6 py-2 rounded-r-full hover:bg-teal-800 transition duration-150"
                >
                    SEND
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;