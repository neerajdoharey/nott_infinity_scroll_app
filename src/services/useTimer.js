// services/useTimer.js
import { useState, useEffect } from "react";

const useTimer = (initialTime, onTimeout) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isTimedOut && !isPaused) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isTimedOut) {
      setIsTimedOut(true);
      if (onTimeout) onTimeout();
    }
  }, [timeLeft, isTimedOut, isPaused, onTimeout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = (newTime) => {
    setTimeLeft(newTime !== undefined ? newTime : initialTime);
    setIsTimedOut(false);
  };

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);

  return {
    timeLeft,
    isTimedOut,
    isPaused,
    formatTime,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
};

export default useTimer;