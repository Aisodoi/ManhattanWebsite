import { useCallback, useEffect, useRef, useState } from "react";
import Web3 from "web3";
import abi from "./abi.json";


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

export const useEth = () => {
  // const Web3 = require("web3");
  // const web3 = new Web3("https://cloudflare-eth.com");
  // web3.eth.getBlockNumber((error: any, result: any) => {
  //   console.log(result)
  // });
  return window.ethereum;
};

export const useWeb3 = () => {
  return new Web3(Web3.givenProvider || "https://cloudflare-eth.com");
}

export const useEthAcc = (web3: Web3) => {
  const [acc, setAcc] = useState<string | undefined>(undefined);

  const refreshAcc = useCallback(() => {
    web3.eth.getAccounts().then(x => setAcc(!!x.length ? x[0] : undefined));
  }, [web3]);

  useEffect(() => {
    refreshAcc();
  }, [refreshAcc, web3]);

  return {
    acc,
    refreshAcc,
  };
}

export const useContract = (web3: Web3) => {
  return new web3.eth.Contract(
    abi as any,
    "0x17a03ec1dF5Dc764f916D35AD047de003129a34F",
  );
}
