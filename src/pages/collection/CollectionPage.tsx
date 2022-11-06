import { Layout } from "../../layout/Layout";
import React, { useEffect, useState } from "react";
import { useIpfs, useEth, useWeb3, useEthAcc, useContract } from "../mint/hooks";
import { DiscordMessage } from "../mint/types";
import styles from "./CollectionPage.module.css";
import { MessageRender } from "../mint/MessageRender";


export const useOwnedTokens = (acc: string | undefined) => {
  const web3 = useWeb3();
  const contract = useContract(web3);
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [ids, setIds] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!acc) return;
    contract.methods.balanceOf(acc).call((err: any, res: any) => {
      console.log(err);
      console.log(res);
      setBalance(res);
    });
  }, [contract, acc]);

  useEffect(() => {
    if (!balance || !acc) return;
    const promises = [];
    for (let i = 0; i < balance; i++) {
      promises.push(new Promise<string>((resolve, reject) => {
        contract.methods.tokenOfOwnerByIndex(acc, i).call((err: any, res: any) => {
          if (err) return reject(err);
          return resolve(res);
        });
      }).then(tokenId => {
        return new Promise<string>((resolve, reject) => {
          contract.methods.tokenURI(tokenId).call((err: any, res: any) => {
            if (err) return reject(err);
            const parts = res.split("/");
            return resolve(parts[parts.length - 1]);
          });
        });
      }));
    }
    Promise.all(promises).then(ids => setIds(ids));
  }, [contract, acc, balance]);

  return {
    balance,
    ids,
  }
}


export const OwnedTokens: React.FC = () => {
  const eth = useEth();
  const web3 = useWeb3();
  const { acc, refreshAcc } = useEthAcc(web3);
  const {
    ids: tokenIds,
    balance,
  } = useOwnedTokens(acc);

  function connect() {
    if (!eth) return;
    eth
      .request({ method: "eth_requestAccounts" })
      .then(refreshAcc)
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  }

  if (acc === undefined) {
    return (
      <div>
        <button className={undefined} onClick={connect}>
          Connect wallet
        </button>
      </div>
    );
  }

  if (!tokenIds || tokenIds.length < 1) {
    return (
      <div>
        <p>No tokens found</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Balance: {balance}</h3>
      <div className={styles.messageList}>
        {tokenIds.map(x => <Message key={x} blobId={x} />)}
      </div>
    </div>
  );
}

interface MessageProps {
  blobId: string;
}
const Message: React.FC<MessageProps> = ({ blobId }) => {
  const {
    data: message,
    error,
    isLoading,
  } = useIpfs<DiscordMessage>(blobId);

  if (isLoading) {
    return <Layout><p>Loading...</p></Layout>
  }

  if (error) {
    return <Layout><p>{error.toString()}</p></Layout>
  }

  if (!blobId) {
    return <Layout><p>No data</p></Layout>
  }

  if (!message) {
    return <Layout><p>No data</p></Layout>
  }

  return (
    <div className={styles.messageContainer}>
      <MessageRender message={message} />
    </div>
  );
}

export const CollectionPage = () => {

  return (
    <Layout>
      <div className={styles.container}>
        <OwnedTokens />
      </div>
    </Layout>
  );
}

