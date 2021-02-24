import styles from '../styles/components/Profile.module.css'


export function Profile(){
  return(
    <div className={styles.profileContainer}>

      <img src="https://github.com/rag-lab.png" alt='Rod'/>
      <div>
        <strong>Rodrigo</strong>
        <p>
        <img src="icons/level.svg" alt='Rod'/>
          Level 1</p>
      </div>
    </div>
  )
}