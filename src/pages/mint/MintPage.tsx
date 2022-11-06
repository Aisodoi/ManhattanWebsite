import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import React from "react";
import { useIpfs } from "./hooks";
import { DiscordMessage } from "./types";
import { MessageRender } from "./MessageRender";


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

  return (
    <Layout>
      { !!message ? <MessageRender message={message} /> : <p>No data</p> }
    </Layout>
  );
}

