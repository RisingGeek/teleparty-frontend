"use client";

import Link from 'next/link';
import React, { FC } from 'react';

const ChatApp: FC = () => {
  return (
    <>
      <div className="p-6">
        <h2 className="text-lg text-black font-semibold mb-4">Welcome to Teleparty Chat</h2>
        <div className="space-y-4">
          <Link
            href="/create-chat-room"
            className="flex justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Create a Chat Room
          </Link>
          <Link
            href="/join-chat-room"
            className="flex justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
          >
            Join a Chat Room
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChatApp;