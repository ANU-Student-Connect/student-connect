import React from 'react';
import { ReactComponent as ReadIcon } from '../Assert/icons/read.svg';
// import { ReactComponent as UnreadIcon } from '../assets/icons/unread.svg';
import LottieTypingAnimation from './LottieTypingAnimation';

const FriendCard = ({ avatar, name, status, time, messageStatus, unreadCount, onClick }) => {
    const renderMessageStatus = () => {
        if (unreadCount > 0) {
            return (
                <span className="inline-block bg-red-500 text-white text-xs rounded-full px-2 py-1">
          {unreadCount}
        </span>
            );
        }
        switch (messageStatus) {
            case 'read':
                return <ReadIcon className="w-4 h-4 text-blue-500" />;
            // case 'unread':
            //     return <UnreadIcon className="w-4 h-4 text-gray-400" />;
            case 'typing':
                return <LottieTypingAnimation />;
            default:
                return null;
        }
    };

    return (
        <div
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={onClick}
        >
            <div className="relative">
                <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-3" />
                {status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">{status}</p>
            </div>
            <div className="text-right flex flex-col items-end">
                <p className="text-xs text-gray-400">{time}</p>
                <div className="mt-1">
                    {renderMessageStatus()}
                </div>
            </div>
        </div>
    );
};

export default FriendCard;