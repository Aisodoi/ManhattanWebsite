import React from "react";
import { DiscordMessage } from "./types";

import styles from "./MessageRender.module.css";


export const MessageRender: React.FC<{ message: DiscordMessage }> = ({message}) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img src={message.message.author.avatarUrl} className={styles.avatar} />
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.header}>{message.message.author.username}</div>
        <div className={styles.timestamp}>{message.message.editedTimestamp || message.message.createdTimestamp}</div>
        <div className={styles.messageBody}>{message.message.content}</div>
      </div>
    </div>
  );
}
