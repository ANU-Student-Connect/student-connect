import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Dropdown = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border rounded-md mb-2">
            <div
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={onToggle}
            >
                <h3 className="font-bold">{title}</h3>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {isOpen && (
                <div className="p-3 border-t">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;