import React from "react";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <>
      <div className={styles.hero_wrapper}>
        <div className={styles.hero_image}></div>
        <div className={styles.hero_motto}> Snap! It's in the Blockchain.</div>
        <div className={styles.hero_motto2}> Forever.</div>
        <div className={styles.hero_text}>
          Orwello immortalizes your Discord messages. Invite Orwello to your
          server and start minting.
        </div>
        <div>
          <div className={styles.button_left}> &#129302; Invite Orwello</div>
          <div className={styles.button_right}> Join the Community </div>
        </div>
      </div>
    </>
  );
}
