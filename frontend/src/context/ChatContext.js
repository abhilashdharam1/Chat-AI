import { createContext, useContext } from 'react';

export const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);
