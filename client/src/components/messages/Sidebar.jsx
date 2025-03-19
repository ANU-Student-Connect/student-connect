import React from 'react';
import { Search } from 'lucide-react';
import FriendCard from '../../MessageComponent/FriendCard';

const Sidebar = ({ friends, onFriendSelect }) => {
    return (
        <aside className="w-1/4 border-r p-4">
            <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search friends"
                    className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            <div>
                <h2 className="font-bold mb-2 text-lg">Friends</h2>
                <div className="space-y-2">
                    {friends.map(friend => (
                        <FriendCard
                            key={friend.id}
                            {...friend}
                            onClick={() => onFriendSelect(friend.id)}
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;