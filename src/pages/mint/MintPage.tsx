import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";
import React, { useEffect, useState } from "react";
import { useIpfs, useEth, useWeb3, useEthAcc, useContract } from "./hooks";
import { DiscordMessage } from "./types";
import { MessageRender } from "./MessageRender";
import styles from "./MintPage.module.css";

interface MintActionsProps {
  messageId: string;
  blobId: string;
}
export const MintActions: React.FC<MintActionsProps> = ({ messageId, blobId }) => {
  const eth = useEth();
  const web3 = useWeb3();
  const contract = useContract(web3);
  const { acc, refreshAcc } = useEthAcc(web3);
  // const [acc, setAcc] = useState<string | undefined>(undefined);
  const [owner, setOwner] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    contract.methods.ownerOf(messageId).call((err: any, res: any) => {
      console.log(err);
      console.log(res);
      setOwner(res);
    });
  }, [messageId, contract, acc]);

  function mint() {
    contract.methods.safeMint(acc, messageId, blobId).send({
      from: acc,
      gasPrice: web3.utils.toHex(0),
      gasLimit: web3.utils.toHex(5000000)
    }, (err: any, res: any) => {
      console.log(err);
      console.log(res);
    });
  }

  if (!!owner) {
    return (
      <div>
        Owned by {owner}
      </div>
    )
  }

  return (
    <div>
      {(acc !== undefined ? (
        <button className={undefined} onClick={mint}>
          Mint NFT
        </button>
      ) : (
        <button className={undefined} onClick={connect}>
          Connect wallet
        </button>
      ))}
    </div>
  );
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

  if (!params.blobId) {
    return <Layout><p>No data</p></Layout>
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
        <div>
          <MintActions
            messageId={message.message.id}
            blobId={params.blobId}
          />
        </div>
      </div>
    </Layout>
  );
}

