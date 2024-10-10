import React from 'react';
import WeChatIcon from '../Assert/icons/WeChat.svg';
import FacebookIcon from '../Assert/icons/Facebook.svg';
import SlackIcon from '../Assert/icons/Slack.svg';
import DiscordIcon from '../Assert/icons/Discord.svg';


export const SocietiesContent = () => {
    const societies = [
        "Computer Science Student Association",
        "Fifty50",
        "Robogals Canberra",
        "ANU Formula Sport team"
    ];

    return (
        <ul className="space-y-2">
            {societies.map((society, index) => (
                <li key={index} className="text-sm">{society}</li>
            ))}
        </ul>
    );
};

export const ContactsContent = () => {
    const contacts = [
        { icon: WeChatIcon, name: 'WeChat' },
        { icon: FacebookIcon, name: 'Facebook' },
        { icon: SlackIcon, name: 'Slack' },
        { icon: DiscordIcon, name: 'Discord' }
    ];

    return (
        <div className="flex justify-around">
            {contacts.map((contact, index) => (
                <div
                    key={index}
                    className="p-2 rounded-full transition-colors duration-200 hover:bg-[#87F3F5]"
                >
                    <img src={contact.icon} alt={contact.name} width={24} height={24} />
                </div>
            ))}
        </div>
    );
};

export const MajorContent = () => (
    <p>Major of Computing</p>
);

export const InterestContent = () => (
    <p>Web development</p>
);