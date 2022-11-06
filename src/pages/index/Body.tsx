import React from "react";
import styles from "./Body.module.css";
import orwelloimage from "../../orwelloserver.png";
import etherimage from "../../ether.png";
import convoimage from "../../convo.png";

export const Body = () => {
  return (
    <div className={styles.body_wrapper}>
      <div className={styles.body_header}>Features</div>
      <div className={styles.body_feature_wrapper}>
        <div className={styles.body_feature_widget_text_wrapper}>
          1. Add Orwello to your server with one click
        </div>
        <img src={orwelloimage} className={styles.image}></img>
      </div>
      <div className={styles.body_feature_wrapper}>
        <div className={styles.body_feature_widget_text_wrapper}>
          2. Connect your ETH wallet to enable minting for your Discord account
          <div className={styles.smalltext}>
            (see Guide at Community for more details)
          </div>
        </div>
        <img src={etherimage} className={styles.image}></img>
      </div>
      <div className={styles.body_feature_wrapper}>
        <div className={styles.body_feature_widget_text_wrapper}>
          3. Right-click any message on your server to mint it for all eternity
        </div>
        <img src={convoimage} className={styles.image}></img>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_text}>
          Copyright (c) Aisodoi Oy 2022. Some rights probably reserved.
        </div>
      </div>
    </div>
  );
};
