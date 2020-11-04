/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';

import './student.css';

const CANVAS_SETTINGS = {
  WIDTH: 800,
  HEIGHT: 600,
  LINE_WIDTH: 5,
  LINE_STROKE: '#000000',
  LINE_JOIN: 'round',
  LINE_CAP: 'round',
};

const Component = () => {
  const canvas = useRef();

  const [isActive, setIsActive] = useState(false);

  const [state, setState] = useState([]);

  const coordinates = (e) => {
    return {
      x: e.pageX - canvas.current.offsetLeft,
      y: e.pageY - canvas.current.offsetTop,
    };
  };

  const drawCanvas = () => {
    const context = canvas.current.getContext('2d');

    for (var i = 0; i < state.length; i++) {
      const item = state[i];
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
    clearCanvas();
    setState([]);
  };

  const handleMouseDown = () => {
    setIsActive(true);
    setState([...state, []]);
  };

  const handleMouseUp = (e) => {
    if (isActive) {
      updateCanvasState(e);
      drawCanvas();
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
  };

  const handleMouseMove = (e) => {
    if (isActive) {
      updateCanvasState(e);
      drawCanvas();
    }
  };

  const handleMouseLeave = (e) => {
    if (isActive) {
      updateCanvasState(e);
      drawCanvas();
    }
    setIsActive(false);
  };

  return (
    <div className="student-canvas">
      <div className="student-canvas__header flex">
        <div className="flex-1">Student Canvas</div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2"
          onClick={handleReset}
        >
          &times;
        </button>
      </div>
      <div className="student-canvas__wrapper">
        <div className="student-canvas__content">
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
        </div>
      </div>
    </div>
  );
};

export default Component;
