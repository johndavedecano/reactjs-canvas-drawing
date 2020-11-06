/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import { Link } from 'wouter';

import './student.css';

const CANVAS_SETTINGS = {
  WIDTH: 800,
  HEIGHT: 600,
  LINE_WIDTH: 5,
  LINE_STROKE: '#000000',
  LINE_JOIN: 'round',
  LINE_CAP: 'round',
};

const Component = ({ params }) => {
  const canvas = useRef();

  const socketRef = useContext(SocketContext);

  const [isActive, setIsActive] = useState(false);

  const [state, setState] = useState([]);

  const host = useRef();

  const guest = useRef({});

  useEffect(() => {
    const socketId = socketRef.current.id

    console.log('socketId', socketId)

    host.current = new window.Peer(socketId)

    socketRef.current.emit('join', params.room);

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
      socketRef.current.emit('leave', params.room);
    }

  }, [params.room]);

  const handleSendPayload = (data) => {
    if (guest.current) {
      const users = Object.keys(guest.current)
      for (var i = 0; i < users.length; i++) {
        const userId = users[i]
        guest.current[userId].send(data)
      }
    }
  };

  const handleReceivePayload = (data) => {
    setState(data);

    if (data.length === 0) return clearCanvas();

    drawCanvas(data);
  };

  const coordinates = (e) => {
    return {
      x: e.pageX - canvas.current.offsetLeft,
      y: e.pageY - canvas.current.offsetTop,
    };
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

  const handleReset = () => {
    setState([]);

    clearCanvas();

    handleSendPayload([]);
  };

  const handleMouseDown = () => {
    setIsActive(true);
    setState([...state, []]);
  };

  const handleMouseUp = (e) => {
    if (isActive) {
      const nextState = updateCanvasState(e);
      drawCanvas(nextState);
    }
    setIsActive(false);
  };

  const updateCanvasState = (e) => {
    const newState = state;

    const index = newState.length - 1;

    const last = newState[index];

    last.push(coordinates(e));

    newState[index] = last;

    setState(newState);

    handleSendPayload(newState);

    return newState;
  };

  const handleMouseMove = (e) => {
    if (isActive) {
      const nextState = updateCanvasState(e);
      drawCanvas(nextState);
    }
  };

  const handleMouseLeave = (e) => {
    if (isActive) {
      const nextState = updateCanvasState(e);
      drawCanvas(nextState);
    }
    setIsActive(false);
  };

  const renderCanvas = () => {
    return (
      <div
        className="student-canvas__holder"
        style={{
          width: CANVAS_SETTINGS.WIDTH,
          height: CANVAS_SETTINGS.HEIGHT,
        }}
      >
        <canvas
          ref={canvas}
          height={CANVAS_SETTINGS.HEIGHT}
          width={CANVAS_SETTINGS.WIDTH}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    );
  };

  return (
    <div className="student-canvas">
      <div className="student-canvas__header flex bg-teal-500">
        <div className="flex-1">Student</div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 mr-2"
          onClick={handleReset}
        >
          Clear
        </button>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2"
          to="/"
        >
          Back
        </Link>
      </div>
      <div className="student-canvas__wrapper">
        <div className="student-canvas__content">{renderCanvas()}</div>
      </div>
    </div>
  );
};

export default Component;
