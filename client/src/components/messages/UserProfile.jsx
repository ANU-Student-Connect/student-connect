import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { ContactsContent, MajorContent } from './DropdownContents';

const UserProfile = ({ isOpen, selectedFriend }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [friendInfo, setFriendInfo] = useState(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    useEffect(() => {
        const fetchFriendInfo = async () => {
            if (!isOpen || !selectedFriend?.id) return;
            try {
                const response = await fetch(`http://localhost:3001/api/messages/friend-info/${selectedFriend.id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch friend info');
                }

                const data = await response.json();
                setFriendInfo(data);
            } catch (err) {
                console.error("Error loading friend info:", err);
            }
        };

        fetchFriendInfo();
    }, [isOpen, selectedFriend?.id]);

    if (!isOpen || !friendInfo || !friendInfo.profile) return null;

    const { profile } = friendInfo;

    return (
        <div className="w-1/4 border-l p-4">
            <div className="flex flex-col items-center mb-6">
                <img
                    className="w-20 h-20 rounded-full mb-2"
                    src={profile.avatar_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="Avatar"
                />
                <h2 className="font-bold text-xl">{profile.name}</h2>
            </div>
            <div className="space-y-2">
                <Dropdown
                    title="Contacts"
                    isOpen={openDropdown === 'contacts'}
                    onToggle={() => toggleDropdown('contacts')}
                >
                    {profile.social_media && <ContactsContent content={profile.social_media} />}
                </Dropdown>
                <Dropdown
                    title="Major"
                    isOpen={openDropdown === 'major'}
                    onToggle={() => toggleDropdown('major')}
                >
                    {profile.major && <MajorContent content={profile.major} />}
                </Dropdown>
            </div>
        </div>
    );
};

export default UserProfile;