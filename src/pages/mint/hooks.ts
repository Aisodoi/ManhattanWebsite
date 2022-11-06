import { useEffect, useRef, useState } from "react";

interface UseIPFS<T> {
  data?: T;
  error?: any;
  isLoading: boolean;
}

export function useIpfs<T>(blobId?: string): UseIPFS<T> {
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
      fetch(url, {mode: "cors"}).then(res => {
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
