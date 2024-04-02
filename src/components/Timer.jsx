import React, { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = Math.floor((currentTime - startTime) / 1000);

      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);
      const seconds = timeDifference % 60;

      setElapsedTime({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return (
    <div className="timer-component">
      <div className="timer-component-timer">
        <div className="timer-digits-wrapper-container">
          <div className="timer-digits-container">
            <div className="timer-digit">
              <div className="timer-digit-text">
                {Math.floor(elapsedTime.hours / 10)}
              </div>
            </div>
            <div className="timer-digit">
              <div className="timer-digit-text">
                {elapsedTime.hours % 10}
              </div>
            </div>
          </div>
          <div className="timer-text">годин</div>
        </div>
        <div className="timer-digits-wrapper-container">
          <div className="timer-digits-container">
            <div className="timer-digit">
              <div className="timer-digit-text">
                {Math.floor(elapsedTime.minutes / 10)}
              </div>
            </div>
            <div className="timer-digit">
              <div className="timer-digit-text">
                {elapsedTime.minutes % 10}
              </div>
            </div>
          </div>
          <div className="timer-text">хвилин</div>
        </div>
        <div className="timer-digits-wrapper-container">
          <div className="timer-digits-container">
            <div className="timer-digit">
              <div className="timer-digit-text">
                {Math.floor(elapsedTime.seconds / 10)}
              </div>
            </div>
            <div className="timer-digit">
              <div className="timer-digit-text">
                {elapsedTime.seconds % 10}
              </div>
            </div>
          </div>
          <div className="timer-text">секунд</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
