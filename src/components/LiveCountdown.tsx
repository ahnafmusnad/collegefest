import { useEffect, useState } from 'react';
import { FEST_METADATA } from '../data/festData';
import CountdownTablets from './CountdownTablets';


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


function computeTimeLeft(): TimeLeft {
  const difference = new Date(FEST_METADATA.countdownTarget).getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}


/* PERF FIX: the 1-second countdown timer used to live directly inside the
   469-line <Home> component, right next to the house-cheer state.


   In React, when state changes, that component and EVERYTHING inside it
   re-renders. So every single second React was tearing down and rebuilding the
   entire homepage - hero, stats, all four house cards, every scroll panel,
   every button - just to change the number "42" to "41".


   Moving the timer into this tiny leaf component means the once-per-second
   tick now re-renders four numbers instead of the whole page. Same visual
   result, a fraction of the work. */
export default function LiveCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(computeTimeLeft);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);


    return () => clearInterval(interval);
  }, []);


  return <CountdownTablets time={timeLeft} />;
}
