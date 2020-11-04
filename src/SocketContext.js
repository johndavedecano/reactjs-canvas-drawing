import React, { useRef } from 'react';

import io from 'socket.io-client';

import { socketUrl } from './config';

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  socketRef.current = io.connect(socketUrl);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketConsumer = SocketContext.Consumer;
