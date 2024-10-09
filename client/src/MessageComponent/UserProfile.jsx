import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { SocietiesContent, ContactsContent, MajorContent, InterestContent } from './DropdownContents';

const UserProfile = ({ isOpen }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    if (!isOpen) return null;

    return (
        <div className="w-1/4 border-l p-4">
            <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-blue-300 rounded-full mb-2"></div>
                <h2 className="font-bold text-xl">Username</h2>
            </div>
            <div className="space-y-2">
                <Dropdown
                    title="Societies"
                    isOpen={openDropdown === 'societies'}
                    onToggle={() => toggleDropdown('societies')}
                >
                    <SocietiesContent />
                </Dropdown>
                <Dropdown
                    title="Contacts"
                    isOpen={openDropdown === 'contacts'}
                    onToggle={() => toggleDropdown('contacts')}
                >
                    <ContactsContent />
                </Dropdown>
                <Dropdown
                    title="Major"
                    isOpen={openDropdown === 'major'}
                    onToggle={() => toggleDropdown('major')}
                >
                    <MajorContent />
                </Dropdown>
                <Dropdown
                    title="Interest"
                    isOpen={openDropdown === 'interest'}
                    onToggle={() => toggleDropdown('interest')}
                >
                    <InterestContent />
                </Dropdown>
            </div>
        </div>
    );
};

export default UserProfile;