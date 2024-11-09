import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ChatContext } from './ChatContext';

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (chat) => {
    setMessages((prev) => [...prev, chat]);
  };

  const toggleTyping = (status) => {
    setIsTyping(status);
  };

  const value = {
    messages,
    addMessage,
    isTyping,
    toggleTyping,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
