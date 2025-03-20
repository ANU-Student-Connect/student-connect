import React, { useState, useEffect } from 'react';
import Header from '../../components/messages/Header';
import Sidebar from '../../components/messages/Sidebar';
import ChatWindow from '../../components/messages/ChatWindow';
import UserProfile from '../../components/messages/UserProfile';
import defaultAvatar from '../../assets/pic/defaultavater.png';

const Message = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friends, setFriends] = useState([
        {
            id: 1,
            name: 'Anil',
            status: "April fool's day",
            time: 'Today, 9:52pm',
            avatar: defaultAvatar,
            messageStatus: 'read',
            unreadCount: 0,
            lastReplyTime: 'Today, 10:30pm',
            messages: [
                { id: 1, text: "Hey, how's it going?", sent: true },
                { id: 2, text: "Not bad, you?", sent: false },
            ]
        },
        {
            id: 2,
            name: 'Friends Forever',
            status: 'Hahahaha!',
            time: 'Today, 9:52pm',
            avatar: defaultAvatar,
            messageStatus: 'unread',
            unreadCount: 4,
            lastReplyTime: 'Today, 9:52pm',
            messages: [
                { id: 1, text: "Movie night tonight?", sent: false },
                { id: 2, text: "Sounds great!", sent: true },
            ]
        }
    ]);

    useEffect(() => {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => console.log("API Response:", res))
            .catch(err => console.error(err));

        fetch("http://localhost:9000/testDB")
            .then(res => res.text())
            .then(res => console.log("DB Response:", res))
            .catch(err => console.error(err));
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
