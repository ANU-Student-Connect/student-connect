import React, { useState, useEffect } from 'react';
import Header from '../../components/messages/Header';
import Sidebar from '../../components/messages/Sidebar';
import ChatWindow from '../../components/messages/ChatWindow';
import UserProfile from '../../components/messages/UserProfile';
import defaultAvatar from '../../assets/pic/defaultavater.png';

const Message = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friends, setFriends] = useState([]);

    function formatTime(isoTime) {
        if (!isoTime) return '';
        const date = new Date(isoTime);
        return date.toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            month: 'short',
            day: 'numeric'
        }); // e.g., "Apr 3, 10:25 PM"
    }

    useEffect(() => {
        const fetchFriendCards = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/messages/friend-cards", {
                    method: 'GET',
                    credentials: 'include', // 发送 JWT cookie
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch friend cards");
                }

                const data = await response.json();

                const mappedFriends = data.map(friend => ({
                    id: friend.friendId,
                    name: friend.friendName,
                    avatar: friend.friendAvatar || defaultAvatar,
                    status: friend.lastMessage || "Say hi 👋",
                    time: formatTime(friend.lastMessageTime),
                    messageStatus: friend.unreadCount > 0 ? 'unread' : 'read',
                    unreadCount: friend.unreadCount,
                    messages: [] // 后续加载
                }));

                setFriends(mappedFriends);
            } catch (err) {
                console.error("Error loading friend cards:", err);
            }
        };

        fetchFriendCards();
    }, []);

    const toggleProfile = () => {
        setIsProfileOpen(prevState => !prevState);
    };

    const handleFriendSelect = (friendId) => {
        const selected = friends.find(friend => friend.id === friendId);
        setSelectedFriend(selected);
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <Header currentPage="messages" />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar friends={friends} onFriendSelect={handleFriendSelect} />
                <main className="flex-1 flex">
                    <ChatWindow onToggleProfile={toggleProfile} isProfileOpen={isProfileOpen} selectedFriend={selectedFriend} />
                    <UserProfile isOpen={isProfileOpen} />
                </main>
            </div>
        </div>
    );
};

export default Message;
