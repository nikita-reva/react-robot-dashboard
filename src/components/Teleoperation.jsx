import React from 'react';
import { Joystick } from 'react-joystick-component';
import { useCmdVelTopic } from '../ros/rosService';

const Teleoperation = ({ ros }) => {
  const cmd_vel = useCmdVelTopic(ros);
  const move_vel = 0.6;
  const turn_vel = 0.8;

  const move = (lx, az) => {
    const twist = new window.ROSLIB.Message({
      linear: {
        x: lx,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: az,
      },
    });

    cmd_vel.publish(twist);
  };

  const keyDownHandler = (event) => {
    if (event.code === 'ArrowLeft' && event.shiftKey && event.altKey) {
      move(0, turn_vel);
    }
    if (event.code === 'ArrowRight' && event.shiftKey && event.altKey) {
      move(0, -turn_vel);
    }

    if (event.code === 'ArrowUp' && event.shiftKey && event.altKey) {
      move(move_vel, 0);
    }
    if (event.code === 'ArrowDown' && event.shiftKey && event.altKey) {
      move(-move_vel, 0);
    }
  };

  const keyUpHandler = (event) => {
    if (
      event.code === 'ArrowLeft' ||
      event.code === 'ArrowRight' ||
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      move(0, 0);
    }
  };

  window.onkeydown = keyDownHandler;
  window.onkeyup = keyUpHandler;

  const handleMove = (event) => {
    move(event.y / 50, -event.x / 40);
  };

  const handleStop = () => {
    move(0, 0);
  };

  return (
    <Joystick
      size={100}
      baseColor="#288CBA"
      stickColor="#365969"
      move={handleMove}
      stop={handleStop}
    />
  );
};

export default Teleoperation;
