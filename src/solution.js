import React, { useState, useRef } from "react";

let pause = false;
let timerStarted = false;

export const Solution = () => {
  const Ref = useRef(null);

  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);

  const convertTimeToSeconds = (min, sec) => {
    return Number(min || 0) * 60 + Number(sec || 0);
  };
  const startTimer = () => {
    pause = false;
    timerStarted = true;
    clearTimer();
    setTotalSeconds(() => {
      return convertTimeToSeconds(minutes, seconds);
    });
    if (!minutes && !seconds) {
      alert("Please set timer");
    } else {
      setTimeout(() => {
        startTimerFromStart();
      });
    }
  };

  const resetTimer = () => {
    pause = false;
    timerStarted = false;
    clearTimer();
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
    setTotalSeconds(convertTimeToSeconds(e.target.value, seconds));
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
    setTotalSeconds(convertTimeToSeconds(minutes, e.target.value));
  };

  const clearTimer = () => {
    if (Ref.current) clearInterval(Ref.current);
  };

  const startTimerFromStart = () => {
    const id = setInterval(() => {
      setTotalSeconds((prevState) => {
        if (prevState - 1 === 0) {
          clearTimer();
          return 0;
        } else {
          return prevState - 1;
        }
      });
    }, 1000);
    Ref.current = id;
  };

  const pauseResumeTimer = () => {
    if (timerStarted) {
      if (totalSeconds) {
        pause = !pause;
        if (pause) {
          clearTimer();
        } else {
          if (!minutes && !seconds) {
            alert("Please set timer");
          } else {
            setTimeout(() => {
              startTimerFromStart();
            });
          }
        }
      }
    }
  };

  const formatSecondsToMinAndSec = (totalSeconds) => {
    let mins = Math.trunc(totalSeconds / 60);
    let secs = totalSeconds % 60;
    return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div className="timer-container">
      <div className="inputs">
        <label>
          <input type="number" value={minutes} onChange={onMinutesChange} />
          Minutes
        </label>
        <label>
          <input type="number" value={seconds} onChange={onSecondsChange} />
          Seconds
        </label>
      </div>

      <div className="buttons">
        <button onClick={startTimer}>START</button>
        <button onClick={pauseResumeTimer}>PAUSE / RESUME</button>
        <button onClick={resetTimer}>RESET</button>
      </div>
      <h1 data-testid="running-clock" className="clock-display">
        {formatSecondsToMinAndSec(totalSeconds)}
      </h1>
    </div>
  );
};
