import React, { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import './Chat.css';
import ReactMarkdown from 'react-markdown';

const fetchChatResponse = async (message) => {
    console.log(process.env.REACT_APP_BASE_URL);
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/chatbot/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chats: message }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

const Chat = () => {
  const { messages, addMessage, toggleTyping } = useChatContext();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); // Create a ref for the messages container

  const handleSend = async () => {
    if (!input) return;
    toggleTyping(true);
    const chat = { role: "user", content: input };
    addMessage(chat);
    setInput('');
    try {
      const data = await fetchChatResponse(chat);
      if (data?.output) {
        addMessage({
          role: "bot",
          content: data.output,
        });
        toggleTyping(false);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      addMessage({ role: 'bot', content: 'Error: Unable to fetch response from the bot.' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbox">
      <div className="wrapper">
        {messages.map((msg, index) => (
          <div key={index} className={`msg_box my-2 ${msg.role === 'user' ? 'user_msg' : 'bot_msg'}`}>
            <span>
              <b>{msg.role.toUpperCase()}</b>
            </span>
            <span className="separator">:</span>
            <span>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onKeyPress={handleKeyPress}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 w-3/4"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;


