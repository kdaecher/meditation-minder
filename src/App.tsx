import './App.css'
import { useRef, useState } from 'react';
import audioFile from './assets/bird-chirping.wav'

const MIN_TIME = 7;
const MAX_TIME = 10;


function App() {
  const birdSound = new Audio(audioFile);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number>();
  const [percentPassed, setPercentPassed] = useState(0);
  let interval = 0;
  let endTime = 0;

  const updateTime = () => {
    const currentTime = Date.now();
    if (currentTime < endTime) {
      setPercentPassed(100 - (((endTime - currentTime)/(interval * 60 * 1000))* 100));
    } else {
      birdSound.play();
      clearInterval(timerRef.current);
      setIsRunning(false);
      setPercentPassed(0);
    }
  };

  const runTimer = () => {
    birdSound.pause();
    birdSound.load();
    interval = Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1) + MIN_TIME)
    endTime = Date.now() + (interval * 60 * 1000);
    setIsRunning(true);
    timerRef.current = setInterval(updateTime, 1000);
  };
  
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {!isRunning ? (
        <button onClick={runTimer}>
          Start
        </button>
      ) : (
        <div
          style={{
            height: `${percentPassed}%`,
            width: '100%',
            backgroundColor: 'green'
          }}
        />
      )}
    </div>
  );
}

export default App
