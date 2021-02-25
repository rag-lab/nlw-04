import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout:NodeJS.Timeout;

export function Countdown(){

  const {startNewChallenge} = useContext(ChallengesContext)

  //console.log(contextData)

  const [time, setTime] = useState(0.05*60)
  const [active, setActive] = useState(false)
  const [isFinished, setFinished] = useState(false)

  const minutes = Math.floor(time/60);
  const seconds = time% 60;

  const [minuteLeft,minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');

  function startCountdown(){
    setActive(true);
  }

  function resetCountdown(){
    setActive(false);
    clearTimeout(countdownTimeout)
    setTime(0.05*60);
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
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
        
      </div>

      {isFinished ? (
      <button disabled
        className={`${styles.countdownButton} ${styles.countdownButtonActive}` }>
        Ciclo encerrado
      </button>


      ) : (

        <>        
          {active ? (
          <button type='button' 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}` }
            onClick={resetCountdown}>
            Abandonar Ciclo        
          </button>
        ):(
          <button type='button' 
            className={styles.countdownButton}
            onClick={startCountdown}>
            Iniciar um Ciclo
          </button>
        )}
         
        </>
      )}

             


    </div>
    
  )
}