import React from "react";
import styles from "./Hero.module.css";
import { DISCORD_COMMUNITY_URL, DISCORD_BOT_INVITE } from "./config";

export function Hero() {
  return (
    <>
      <div className={styles.hero_wrapper}>
        <div className={styles.hero_image}></div>
        <div className={styles.hero_motto}> Snap! It's in the Blockchain.</div>
        <div className={styles.hero_motto2}> Forever.</div>
        <div className={styles.hero_text}>
          Orwello immortalizes your Discord messages. Invite it to your server
          and start minting. Fully open source.
        </div>
        <div>
          <a href={DISCORD_BOT_INVITE}>
            <div className={styles.button_left}> &#129302; Invite Orwello</div>
          </a>
          <a href={DISCORD_COMMUNITY_URL}>
            <div className={styles.button_right}>
              &#128126; Join the Community
            </div>
          </a>
        </div>
        <div className={styles.counter}>
          A total of 0 messages minted across 0 servers
        </div>
      </div>
    </>
  );
}
