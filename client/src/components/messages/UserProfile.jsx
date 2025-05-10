import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { SocietiesContent, ContactsContent, MajorContent, InterestContent } from './DropdownContents';

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

    if (!isOpen || !friendInfo) return null;

    return (
        <div className="w-1/4 border-l p-4">
            <div className="flex flex-col items-center mb-6">
                <img
                    className="w-20 h-20 rounded-full mb-2"
                    src={friendInfo.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt="Avatar"
                />
                <h2 className="font-bold text-xl">{friendInfo.name}</h2>
            </div>
            <div className="space-y-2">
                <Dropdown
                    title="Societies"
                    isOpen={openDropdown === 'societies'}
                    onToggle={() => toggleDropdown('societies')}
                >
                    {friendInfo.club && <SocietiesContent content={friendInfo.club} />}
                </Dropdown>
                <Dropdown
                    title="Contacts"
                    isOpen={openDropdown === 'contacts'}
                    onToggle={() => toggleDropdown('contacts')}
                >
                    {friendInfo.socialMedia && <ContactsContent content={friendInfo.socialMedia} />}
                </Dropdown>
                <Dropdown
                    title="Major"
                    isOpen={openDropdown === 'major'}
                    onToggle={() => toggleDropdown('major')}
                >
                    {friendInfo.major && <MajorContent content={friendInfo.major} />}
                </Dropdown>
                <Dropdown
                    title="Interest"
                    isOpen={openDropdown === 'interest'}
                    onToggle={() => toggleDropdown('interest')}
                >
                    {friendInfo.interests?.length > 0 && <InterestContent content={friendInfo.interests} />}
                </Dropdown>
            </div>
        </div>
    );
};

export default UserProfile;