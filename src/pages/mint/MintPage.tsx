import { useParams } from "react-router-dom";


export const MintPage = () => {
  const params = useParams();

  return (
    <div>
      IPFS Blob ID: {params.blobId}
    </div>
  );
}
