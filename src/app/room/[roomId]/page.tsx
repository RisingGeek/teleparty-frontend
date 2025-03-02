"use client";

import { IMessage, User } from '@/types/message.type';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { TelepartyClient, SocketEventHandler, SocketMessageTypes, SessionChatMessage } from 'teleparty-websocket-lib';

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [usersTypingIds, setUsersTypingIds] = useState<string[]>([]);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);
  const messagesEndRef = useRef(null);
  const clientRef = useRef<TelepartyClient>(null);
  const router = useRouter();

  // Scroll to bottom when message is received
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const eventHandler: SocketEventHandler = {
      onConnectionReady: () => {
        const name = sessionStorage.getItem("teleparty-nickname") || "";
        setNickname(name);
        clientRef.current?.joinChatRoom(name, roomId, "userIcon");
      },
      onClose: () => { console.log("Socket has been closed") },
      onMessage: (message) => {
        const { type, data } = message;
        console.log("message", message)
        switch (type) {
          case SocketMessageTypes.SEND_MESSAGE:
            setMessages(prevMessages => [...prevMessages, data]);
            break;
          case "userList":
            const users = data.map((user) => ({
              userId: user.socketConnectionId,
              userNickname: user.userSettings.userNickname,
              userIcon: user.userSettings.userIcon
            }))
            console.log("users", users, data)
            setUserList(users);
            break;
          case SocketMessageTypes.SET_TYPING_PRESENCE:
            setUsersTypingIds(data.usersTyping);
            break;
        }
      }
    };

    const client = new TelepartyClient(eventHandler);
    clientRef.current = client;

    return () => {
      clientRef.current?.teardown();
    }
  }, [roomId]);


  useEffect(() => {
    console.log("type", isTyping)
    clientRef.current?.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      typing: isTyping
    })
  }, [isTyping]);

  useEffect(() => {
    const userNames = usersTypingIds.map((typingUserId: string) => userList.find((user) => user.userId === typingUserId)?.userNickname || "");
    setUsersTyping(userNames)
  }, [usersTypingIds, userList])


  const onLeaveRoom = () => {
    clientRef.current?.teardown();
    router.replace("/");
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

    const message = messageInput.trim();
    if (!message) return;

    setIsTyping(false);

    clientRef.current?.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: message
    });
    setMessageInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isTyping) {
      setIsTyping(true);

      // Timeout for stop typing indicator after 3 secs of inactivity
      setTimeout(() => {
        setIsTyping(false);
      }, 3000)
    }
    setMessageInput(e.target.value);
  }


  return (
    <div className="flex flex-col h-96">
      <div className="p-4 bg-gray-100 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-black">Room: {roomId}</h2>
            <p className="text-sm text-gray-600">You: {nickname}</p>
          </div>
          <button
            className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded cursor-pointer"
            onClick={onLeaveRoom}
          >
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${msg.isSystemMessage
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-300 text-gray-800'
                }`}
            >
              <div className="text-xs font-semibold mb-1">{msg.userNickname}</div>
              <p>{msg.body}</p>
              <div className="text-xs text-right mt-1 opacity-75">
                {/* {formatTime(msg.timestamp)} */}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      {usersTyping.length > 0 && (
        <div className="text-sm text-gray-500 italic mb-2 pl-4">
          {usersTyping.length === 1 ? `${usersTyping[0]} is typing...` : `${Array.from(usersTyping).join(", ")} are typing...`}
        </div>
      )}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded text-black"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
