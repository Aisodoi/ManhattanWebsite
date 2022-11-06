import React from "react";
import { DiscordMessage } from "./types";
import { format } from "date-fns";

import styles from "./MessageRender.module.css";

export const MessageRender: React.FC<{ message: DiscordMessage }> = ({
  message,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img src={message.message.author.avatarUrl} className={styles.avatar} />
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.header}>
          <div className={styles.author}>{message.message.author.username}</div>
          <div className={styles.timestamp}>
            {format(new Date(message.message.editedTimestamp ||
              message.message.createdTimestamp), "p P")}
          </div>
        </div>
        <div className={styles.messageBody}>{message.message.content}</div>
      </div>
    </div>
  );
};
