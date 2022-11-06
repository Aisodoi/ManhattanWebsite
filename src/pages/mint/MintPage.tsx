import { useParams } from "react-router-dom";
import { Layout } from "../../layout/Layout";


export const MintPage = () => {
  const params = useParams();

  return (
    <Layout>
      IPFS Blob ID: {params.blobId}
    </Layout>
  );
}
