import React, { ChangeEvent, useState } from 'react'

interface IJoinChatRoomProps {
  handleBackClick: () => void;
}
const JoinChatRoom = (props: IJoinChatRoomProps) => {
  const {handleBackClick} = props;
  const [nickname, setNickname] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleJoinRoom = () => {

  }
  
  return (
    <div className="p-6">
      <h2 className="text-lg text-black font-semibold mb-4">Join a Chat Room</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter your nickname"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
          <input
            type="text"
            value={roomId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter room ID"
          />
        </div>
        <button
          onClick={handleJoinRoom}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition"
        >
          Join Room
        </button>
        <button
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
          onClick={handleBackClick}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default JoinChatRoom
