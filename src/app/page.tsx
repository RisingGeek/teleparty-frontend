"use client";

import CreateChatRoom from '@/components/CreateChatRoom';
import JoinChatRoom from '@/components/JoinChatRoom';
import React, { FC, useState } from 'react';

const ChatApp: FC = () => {
  const [currentView, setCurrentView] = useState("");

  const handleBackClick = () => setCurrentView("");

  switch (currentView) {
    case "create-room":
      return <CreateChatRoom handleBackClick={handleBackClick} />
    case "join-room":
      return <JoinChatRoom handleBackClick={handleBackClick} />
    default:
      return (
        <div className="p-6">
          <h2 className="text-lg text-black font-semibold mb-4">Welcome to Teleparty Chat</h2>
          <div className="space-y-4">
            <button
              className="w-100 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
              onClick={() => setCurrentView("create-room")}
            >
              Create a Chat Room
            </button>
            <button
              className="w-100 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
              onClick={() => setCurrentView("join-room")}
            >
              Join a Chat Room
            </button>
          </div>
        </div>
      );
  }
};

export default ChatApp;