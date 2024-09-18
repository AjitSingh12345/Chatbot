import React from 'react';
import { FaRobot } from 'react-icons/fa';

const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center p-6 border-b border-gray-200">
        <FaRobot className="w-12 h-12 text-purple-500" />
        <div className="ml-4">
            <h3 className="text-2xl font-semibold">Hey👋, I'm Ava</h3>
            <p className="text-lg text-gray-500">Ask me anything or pick a place to start</p>
        </div>
    </div>
  );
};

export default ChatHeader;
