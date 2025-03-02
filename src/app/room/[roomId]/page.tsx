"use client";

import { IMessage } from '@/types/message.type';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { TelepartyClient, SocketEventHandler, SocketMessageTypes, SessionChatMessage } from 'teleparty-websocket-lib';

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [nickname, setNickname] = useState("");
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
        }
      }
    };

    const client = new TelepartyClient(eventHandler);
    clientRef.current = client;

    return () => {
      clientRef.current?.teardown();
    }
  }, [roomId]);


  const onLeaveRoom = () => {
    clientRef.current?.teardown();
    router.replace("/");
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

    const message = messageInput.trim();
    if (!message) return;

    clientRef.current?.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: message
    });
    setMessageInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
