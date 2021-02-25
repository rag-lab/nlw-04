import '../styles/global.css';
import { useState } from 'react';
import {ChallengeProvider} from '../contexts/ChallengeContext'


function MyApp({ Component, pageProps }) {



  return(
  <ChallengeProvider>
    <Component {...pageProps} />
  </ChallengeProvider>
  )
  
}

export default MyApp
