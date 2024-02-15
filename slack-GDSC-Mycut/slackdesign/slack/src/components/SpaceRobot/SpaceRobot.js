import React, { useState, useEffect } from 'react';
import './SpaceRobot.css';
import FloatingRobotImage from '../SpaceRobot/FloatingRobot.png';

const SpaceRobot = () => {
  const [position, setPosition] = useState({ top: '0', left: '0' });
  const [size, setSize] = useState('50px');
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPosition = {
        top: Math.random() * window.innerHeight + 'px',
        left: Math.random() * window.innerWidth + 'px'
      };
      const newSize = Math.random() * 100 + 'px';
      const newDirection = Math.random() > 0.5 ? 'right' : 'left';

      setPosition(newPosition);
      setSize(newSize);
      setDirection(newDirection);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`space-robot ${direction}`}
      style={{ top: position.top, left: position.left, width: size, height: size }}
    >
      <img src={FloatingRobotImage} alt="Floating Robot" />
    </div>
  );
};

export default SpaceRobot;
