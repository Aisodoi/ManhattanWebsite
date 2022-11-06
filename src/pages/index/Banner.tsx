import React from 'react';
import styles from './Banner.module.css';

export function Banner() {
    return (
      <div className={styles.banner_render}>
      <div className={styles.banner_profile_image_wrapper}>
    <div className={styles.banner_profile_image}>
      </div>
      </div>
    <div className={styles.banner_wrapper}>
    <div className={styles.banner_header}>
      Orwello
    </div>
      </div>
      </div>
  
    );
    }