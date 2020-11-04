/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';

const CANVAS_SETTINGS = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
  LINE_WIDTH: 5,
  LINE_STROKE: '#000000',
  LINE_JOIN: 'round',
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

  const handleDrawCanvas = () => {
    const context = canvas.current.getContext('2d');

    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

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
        context.lineCap = CANVAS_SETTINGS.LINE_JOIN;

        context.stroke();
      }
    }
  };

  const handleMouseDown = () => {
    setIsActive(true);
    setState([...state, []]);
  };

  const handleMouseUp = (e) => {
    if (isActive) {
      handleUpdateState(e);

      handleDrawCanvas();
    }
    setIsActive(false);
  };

  const handleUpdateState = (e) => {
    const newState = state;

    const index = newState.length - 1;

    const last = newState[index];

    last.push(coordinates(e));

    newState[index] = last;

    setState(newState);
  };

  const handleMouseMove = (e) => {
    if (isActive) {
      handleUpdateState(e);
      handleDrawCanvas();
    }
  };

  const handleMouseLeave = (e) => {
    if (isActive) {
      handleUpdateState(e);

      handleDrawCanvas();
    }
    setIsActive(false);
  };

  return (
    <div>
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

export default Component;
