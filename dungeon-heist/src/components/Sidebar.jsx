import React, { useState, useEffect } from 'react';
import '../index.css';

const Sidebar = () => {
  const [time, setTime] = useState(300); // Start with 5 minutes (300 seconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          return 300; // Restart timer at 5 minutes
        }
        return prevTime - 1; // Decrement the timer by 1 second
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // Correct template literal
  };

  return (
    <div className="absolute top-1/2 right-4 flex flex-col justify-start items-start bg-yellow-500 py-3 px-6 w-[50%] max-w-[400px] max-h-[40vh] h-[50vh] z-10 rounded-lg transform -translate-y-1/2">
      <h1 className="text-6xl font-Digitalt text-white">{formatTime(time)}</h1>
      <h1 className="text-4xl font-Digitalt text-white">ENTITY DETAILS:</h1>
    </div>
  );
};

export default Sidebar;
