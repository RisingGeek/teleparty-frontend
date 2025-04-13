import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface IJoinChatRoomProps {
  handleBackClick: () => void;
}
const JoinChatRoom = (props: IJoinChatRoomProps) => {
  const { handleBackClick } = props;
  const [nickname, setNickname] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const router = useRouter();

  const handleJoinRoom = () => {
    sessionStorage.setItem("teleparty-nickname", nickname)
    router.push(`/room?roomId=${roomId}`)
  }

  return (
    <div className="p-6">
      <h2 className="text-lg text-black font-semibold mb-4">Join a Chat Room</h2>
      <form className="space-y-4" onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleJoinRoom();
      }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter your nickname"
            required
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
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition cursor-pointer"
        >
          Join Room
        </button>
        <button
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition cursor-pointer"
          onClick={handleBackClick}
        >
          Back
        </button>
      </form>
    </div>
  )
}

export default JoinChatRoom
