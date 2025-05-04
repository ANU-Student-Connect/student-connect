import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', { withCredentials: true });

const ChatWindow = ({ onToggleProfile, isProfileOpen, selectedFriend }) => {
    const [newMessage, setNewMessage] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!selectedFriend) return;

        const handleReceiveMessage = (data) => {
            if (data.receiverId === selectedFriend.id) {
                const updatedMessages = [...selectedFriend.messages, {
                    id: data._id,
                    text: data.message,
                    sent: false,
                    createdAt: data.createdAt
                }];

                selectedFriend.messages = updatedMessages;
                // 触发父组件更新的最佳方式是通过 lifting state，但这里保留原结构不改
            }
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, [selectedFriend]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedFriend?.messages?.length]);

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch(`http://localhost:3001/api/messages/send/${selectedFriend.id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: newMessage })
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const sentMsg = await response.json();

            selectedFriend.messages.push({
                id: sentMsg._id,
                text: sentMsg.message,
                sent: true,
                createdAt: sentMsg.createdAt
            });

            socket.emit('send-message', {
                _id: sentMsg._id,
                senderId: sentMsg.senderId,
                receiverId: sentMsg.receiverId,
                message: sentMsg.message,
                createdAt: sentMsg.createdAt
            });

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

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
                            <div>{message.text}</div>
                            <div className="text-xs text-gray-300 mt-1">
                                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <div className="border-t p-4 flex">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    className="flex-1 border rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
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
