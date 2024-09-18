import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="chat-header flex flex-col items-center justify-center p-6 border-b border-gray-200">
      <img src="/images/Avatar_UI.jpg" className="w-20 h-20 rounded-full mb-4" alt="Avatar" />
      <div className="text-center">
        <h3 className="text-3xl font-semibold">Hey👋, I'm Ava</h3>
        <p className="text-lg text-gray-500">Ask me anything or pick a place to start</p>
      </div>
    </div>
  );
};

export default ChatHeader;
