/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';

const CANVAS_SETTINGS = {
  WIDTH: 800,
  HEIGHT: 600,
  LINE_WIDTH: 5,
  LINE_STROKE: '#000000',
  LINE_JOIN: 'round',
  LINE_CAP: 'round',
};

const Component = ({ roomId, socketRef }) => {
  const canvas = useRef();

  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState([]);

  const host = useRef();

  const guest = useRef({});

  useEffect(() => {
    const socketId = socketRef.current.id

    console.log('socketId', socketId)

    host.current = new window.Peer(socketId)

    socketRef.current.emit('join', roomId);

    socketRef.current.on('users', (users) => {
      console.log('users', users)
      for (var i = 0; i < users.length; i++) {
        const userId = users[i]
        if (!guest.current[userId]) {
          guest.current[userId] = host.current.connect(userId);

          host.current.on('connection', (conn) => {
            conn.on('data', handleReceivePayload)
          })
        }
      }
    });

    socketRef.current.on('joined', (userId) => {
      console.log('joined', [userId])
      if (!guest.current[userId]) {
        guest.current[userId] = host.current.connect(userId);

        host.current.on('connection', (conn) => {
          conn.on('data', handleReceivePayload)
        })
      }
    });

    socketRef.current.on('left', (userId) => {
      console.log('left', [userId])
      if (guest.current[userId]) {
        guest.current[userId].close();
      }
    });

    return () => {
      socketRef.current.emit('leave', roomId);
    }

  }, [roomId]);

  const handleReceivePayload = (data) => {
    setState(data);

    if (data.length === 0) return clearCanvas();

    drawCanvas(data);
  };

  const drawCanvas = (nextState) => {
    const context = canvas.current.getContext('2d');

    for (var i = 0; i < nextState.length; i++) {
      const item = nextState[i];
      if (item) {
        context.beginPath();

        const lastIndex = item.length - 1;

        for (var j = 0; j < item.length; j++) {
          if (lastIndex === j) {
            context.lineTo(item[j].x, item[j].y);
          } else {
            context.moveTo(item[j].x, item[j].y);
          }
        }

        context.closePath();

        context.strokeStyle = CANVAS_SETTINGS.LINE_STROKE;
        context.lineJoin = CANVAS_SETTINGS.LINE_JOIN;
        context.lineWidth = CANVAS_SETTINGS.LINE_WIDTH;
        context.lineCap = CANVAS_SETTINGS.LINE_CAP;

        context.stroke();
      }
    }
  };

  const clearCanvas = () => {
    const context = canvas.current.getContext('2d');

    context.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
  };

  return (
    <div className="bg-white">
      <canvas
        ref={canvas}
        height={CANVAS_SETTINGS.HEIGHT}
        width={CANVAS_SETTINGS.WIDTH}

      ></canvas>
    </div>
  );
};

export default Component;
