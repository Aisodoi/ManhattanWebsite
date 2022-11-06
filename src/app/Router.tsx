import * as React from "react";
import {
  createBrowserRouter, Navigate,
  RouterProvider,
} from "react-router-dom";
import { IndexPage } from "../pages/index/IndexPage";
import { MintPage } from "../pages/mint/MintPage";
import { CollectionPage } from "../pages/collection/CollectionPage";


const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/mint/:blobId",
    element: <MintPage />,
  },
  {
    path: "/collection",
    element: <CollectionPage />,
  }
]);


export const Router = () => {
  return <RouterProvider router={router} />
}

