import React from 'react';
import InstagramIcon from '../../assets/icons/messagesicons/Instagram.svg';
import FacebookIcon from '../../assets/icons/messagesicons/Facebook.svg';
import SlackIcon from '../../assets/icons/messagesicons/Slack.svg';
import DiscordIcon from '../../assets/icons/messagesicons/Discord.svg';

export const ContactsContent = ({ content }) => {
    const contacts = [
        { icon: InstagramIcon, name: 'instagram' },
        { icon: FacebookIcon, name: 'facebook' },
        { icon: SlackIcon, name: 'slack' },
        { icon: DiscordIcon, name: 'discord' }
    ];

    return (
        <div className="flex justify-around">
            {contacts.map((contact, index) => {
                const isActive = content?.[contact.name];
                return (
                    <div
                        key={index}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                            isActive ? 'bg-purple-400' : 'hover:bg-[#87F3F5]'
                        }`}
                    >
                        <img src={contact.icon} alt={contact.name} width={24} height={24} />
                    </div>
                );
            })}
        </div>
    );
};
