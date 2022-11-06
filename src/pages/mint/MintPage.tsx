import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import React, { useEffect, useRef, useState } from "react";


interface UseBlob<T> {
  data?: T;
  error?: any;
  isLoading: boolean;
}
export function useIpfs<T>(blobId?: string): UseBlob<T> {
  const url = `https://w3s.link/ipfs/${blobId}`;
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blobIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if ((blobIdRef.current !== blobId || !blobIdRef.current) && !!blobId) {
      blobIdRef.current = blobId;
      setIsLoading(true);
      setError(undefined);
      fetch(url, { mode: "cors" }).then(res => {
        res.json().then(parsed => {
          if (blobIdRef.current === blobId) {
            setData(parsed);
            setIsLoading(false);
          }
        }).catch(e => {
          if (blobIdRef.current === blobId) {
            setIsLoading(false);
            setError(e);
          }
        });
      }).catch(e => {
        if (blobIdRef.current === blobId) {
          setIsLoading(false);
          setError(e);
        }
      });
    }
  }, [blobId, setData, blobIdRef, url]);

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
}


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

interface DiscordMessage {
  message: {
    id: string,
    createdTimestamp: number,
    editedTimestamp: number,
    channelId: string,
    author: {
      id: string,
      username: string,
      discriminator: string,
      avatarUrl: string,
    },
    content: string,
    url: string,
  },
  channel: {
    id?: string,
    name?: string,
  },
  guild: {
    id?: string,
    name?: string,
  },
}
const MessageRender: React.FC<{ message: DiscordMessage }> = ({ message }) => {
  return (
    <div>
      {message.message.author.username}: {message.message.content}
    </div>
  );
}
