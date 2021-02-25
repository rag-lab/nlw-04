import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import challenges from '../../challenges.json';
import { ChallengesContext } from './ChallengeContext';


interface CountdownContextData {
  minutes:number;
  seconds:number;
  isFinished:boolean;
  active:boolean,
  startCountdown:()=>void,
  resetCountdown:()=>void
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout:NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}:CountdownProviderProps){


    const {startNewChallenge} = useContext(ChallengesContext)

  const [time, setTime] = useState(0.05*60)
  const [active, setActive] = useState(false)
  const [isFinished, setFinished] = useState(false)

  const minutes = Math.floor(time/60);
  const seconds = time% 60;


function startCountdown(){
    setActive(true);
  }

  function resetCountdown(){
    setActive(false);
    clearTimeout(countdownTimeout)
    setTime(0.05*60);
    setFinished(false);
  }


  useEffect(()=>{

    if(active && time >0){
      countdownTimeout = setTimeout( ()=>{
        setTime(time-1);
      },1000)

    }else if( active && time===0){
      setActive(false);
      setFinished(true);
      startNewChallenge();
    }
  },[active, time] )


   return(
      <CountdownContext.Provider value={{
        minutes,
        seconds,
        isFinished,
        active,
        startCountdown,
        resetCountdown
      }}>
       {children}
      </CountdownContext.Provider>
  )
}



 