import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import React from "react";
import { useIpfs } from "./hooks";
import { DiscordMessage } from "./types";
import { MessageRender } from "./MessageRender";
import styles from "./MintPage.module.css";


export const MintPage = () => {
  const params = useParams<{ blobId: string }>();
  const {
    data: message,
    error,
    isLoading,
  } = useIpfs<DiscordMessage>(params.blobId);

  if (isLoading) {
    return <Layout><p>Loading...</p></Layout>
  }

  if (error) {
    return <Layout><p>{error.toString()}</p></Layout>
  }

  if (!message) {
    return <Layout><p>No data</p></Layout>
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.messageContainer}>
          <MessageRender message={message} />
        </div>
      </div>
    </Layout>
  );
}

