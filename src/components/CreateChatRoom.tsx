"use client";

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SocketEventHandler, TelepartyClient } from 'teleparty-websocket-lib';

interface ICreateChatRoomProps {
  handleBackClick: () => void;
}
const CreateChatRoom = (props: ICreateChatRoomProps) => {
  const { handleBackClick } = props;
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const clientRef = useRef<TelepartyClient>(null);


  useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => {
        setIsLoading(false);
      },
      onClose: () => { console.log("Socket has been closed") },
      onMessage: (message) => { console.log("message", message) }
    };

    const client = new TelepartyClient(eventHandler);
    clientRef.current = client;

    return () => {
      clientRef.current?.teardown();
    }
  }, []);

  const handleCreateRoom = async (): Promise<void> => {
    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }

    sessionStorage.setItem("teleparty-nickname", nickname)
    const roomId = await clientRef.current?.createChatRoom(nickname, "userIon");
    router.push(`/room?roomId=${roomId}`)

    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // create room on keyboard enter but not shift + enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateRoom();
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleCreateRoom}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition cursor-pointer"
        >
          Create Room
        </button>
        <button
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition cursor-pointer"
          onClick={handleBackClick}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default CreateChatRoom
