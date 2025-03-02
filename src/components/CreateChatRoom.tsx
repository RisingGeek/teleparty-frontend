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
  const router = useRouter();
  const clientRef = useRef<TelepartyClient>(null);


  useEffect(() => {
    console.log("mount")
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => { console.log("connection ready") },
      onClose: () => { console.log("Socket has been closed") },
      onMessage: (message) => { console.log("message")}
    };

    const client = new TelepartyClient(eventHandler);
    clientRef.current = client;

    return () => {
      console.log("here")
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
    router.push(`/room/${roomId}`)

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
