"use client";

import Link from 'next/link';
import React, { ChangeEvent, FC, useState } from 'react'

const CreateChatRoom: FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCreateRoom = (): void => {
    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }

    setError('');
  };

  return (
    <div className="p-6">
      <h2 className="text-lg text-black font-semibold mb-4">Create a New Chat Room</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded"
            placeholder="Enter your nickname"
          />
        </div>
        <button
          onClick={handleCreateRoom}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
        >
          Create Room
        </button>
        <Link
          href="/"
          className="flex justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
        >
          Back
        </Link>
      </div>
    </div>
  )
}

export default CreateChatRoom
