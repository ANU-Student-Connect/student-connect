import React from 'react';
import WeChatIcon from '../../assets/icons/messagesicons/WeChat.svg';
import FacebookIcon from '../../assets/icons/messagesicons/Facebook.svg';
import SlackIcon from '../../assets/icons/messagesicons/Slack.svg';
import DiscordIcon from '../../assets/icons/messagesicons/Discord.svg';

export const SocietiesContent = ({ content }) => {
    if (!content) return null;
    return (
        <ul className="space-y-2">
            <li className="text-sm">{content}</li>
        </ul>
    );
};

export const ContactsContent = ({ content }) => {
    const contacts = [
        { icon: WeChatIcon, name: 'WeChat' },
        { icon: FacebookIcon, name: 'Facebook' },
        { icon: SlackIcon, name: 'Slack' },
        { icon: DiscordIcon, name: 'Discord' }
    ];

    return (
        <div className="flex justify-around">
            {contacts.map((contact, index) => {
                const isActive = content && content.toLowerCase() === contact.name.toLowerCase();
                return (
                    <div
                        key={index}
                        className={`p-2 rounded-full transition-colors duration-200 ${isActive ? 'bg-purple-400' : 'hover:bg-[#87F3F5]'}`}
                    >
                        <img src={contact.icon} alt={contact.name} width={24} height={24} />
                    </div>
                );
            })}
        </div>
    );
};

export const MajorContent = ({ content }) => (
    <p className="text-sm">{content}</p>
);

export const InterestContent = ({ content }) => (
    <ul className="space-y-2">
        {Array.isArray(content) && content.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
        ))}
    </ul>
);
