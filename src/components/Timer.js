import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

function Timer() {
  const [isRunning, setIsRunning] = useState(false); 
  const [elapsedTime, setElapsedTime] = useState(0); 
  const intervalIdRef = useRef(null); 
  const timeRef = useRef(0); 


  function formatTime() {
    const minutes = Math.floor(elapsedTime / 60000); 
    const seconds = Math.floor((elapsedTime % 60000) / 1000); 
    const milliseconds = elapsedTime % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }

  // Function to start the stopwatch
  function start() {
    if (!isRunning) {
      setIsRunning(true);
      intervalIdRef.current = setInterval(() => {
        timeRef.current += 10;
        setElapsedTime(timeRef.current); 
      }, 10);
    }
  }

  // Function to stop the stopwatch
  function stop() {
    clearInterval(intervalIdRef.current);
    setIsRunning(false);
  }

  // Function to reset the stopwatch
  function reset() {
    clearInterval(intervalIdRef.current);
    setElapsedTime(0);
    timeRef.current = 0;
    setIsRunning(false);
  }

  useEffect(() => {
    return () => {
     
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <div className='Timer'>
      <div className='display'>{formatTime()}</div>
      <div className='controls'>
        <button onClick={start} className='start-button'>
          Start
        </button>
        <button onClick={stop} className='stop-button'>
          Stop
        </button>
        <button onClick={reset} className='reset-button'>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
