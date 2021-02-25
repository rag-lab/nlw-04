import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'


export function Profile(){

  const {level} = useContext(ChallengesContext)


  return(
    <div className={styles.profileContainer}>

      <img src="https://github.com/rag-lab.png" alt='Rod'/>
      <div>
        <strong>Rodrigo</strong>
        <p>
        <img src="icons/level.svg" alt='Rod'/>
          Level {level}</p>
      </div>
    </div>
  )
}