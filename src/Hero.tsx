import React from 'react';
import styles from './Hero.module.css';


export function Hero() {
    return(
        <>
      <div className={styles.hero_wrapper}>
      <div className={styles.hero_image}></div>
      <div className={styles.hero_motto}> Snap! </div> 
      </div>

      </>
    );
  }