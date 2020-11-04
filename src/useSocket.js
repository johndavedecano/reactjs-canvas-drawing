import React from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4000';

const noop = () => {};

const useSocket = ({
  onJoined = noop,
  onCreated = noop,
  onOffer = noop,
  onReady = noop,
  onAnswer = noop,
  onIceCandidate = noop,
}) => {
  const socketRef = React.useRef();

  socketRef.current = io.connect(SOCKET_URL);

  socketRef.current.on('joined', onJoined);

  socketRef.current.on('created', onCreated);

  socketRef.current.on('offer', onOffer);

  socketRef.current.on('answer', onAnswer);

  socketRef.current.on('candidate', onIceCandidate);

  socketRef.current.on('ready', onReady);

  return socketRef.current;
};

export default useSocket;
