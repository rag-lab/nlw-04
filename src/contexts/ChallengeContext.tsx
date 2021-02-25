import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json';



interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type:'body' | 'eye';
  description:string;
  amount:number;

}

interface ChallengesContextData {
  level:number;
  currentExperience:number;
  challengesCompleted:number;
  experienceToNextLevel:number
  activeChallenge:Challenge;
  levelUp:()=>void;
  startNewChallenge:()=>void;
  resetChallenge:()=>void; 
  completeChallenge:()=>void; 
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengeProvider({children}:ChallengesProviderProps){
  
  const [level,setLevel] = useState(1);
  const [currentExperience,setcurrentExperience] = useState(0);
  const [challengesCompleted,setChallengesCompleted] = useState(0);
  const [activeChallenge,setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level+1)*4,2)

  //executado uma unica vez.
  useEffect(()=>{
    Notification.requestPermission();
  },[])


  function levelUp(){
    setLevel(level+1)
  }


  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random()*challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    if(Notification.permission==='granted'){
      new Notification('Novo desafio a vista',{
        body:`Valendo ${challenge.amount} xp! =D`
      })
    }

    new Audio('/notification.mp3').play();

  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

function completeChallenge(){
  if(!activeChallenge){
    return;    
  }

  const {amount} = activeChallenge;

  let finalExperience = currentExperience+amount;

  if(finalExperience>= experienceToNextLevel){
    finalExperience -= experienceToNextLevel;
    levelUp();
  }

  setcurrentExperience(finalExperience);
  setChallengesCompleted(challengesCompleted+1);
  setActiveChallenge(null);
}


  return(
      <ChallengesContext.Provider 
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge, 
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge}}>    
      {children}
      </ChallengesContext.Provider>
  )
}