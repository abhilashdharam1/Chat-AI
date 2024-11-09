import React from 'react';
import Chat from './components/Chat';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChatProvider } from './context/ChatProvider';

const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <ChatProvider>
        <Chat />
      </ChatProvider>
    </QueryClientProvider>
  );
}

export default App;
