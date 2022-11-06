import * as React from "react";
import {
  createBrowserRouter, Navigate,
  RouterProvider,
} from "react-router-dom";
import { IndexPage } from "../pages/index/IndexPage";
import { MintPage } from "../pages/mint/MintPage";


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
  }
]);


export const Router = () => {
  return <RouterProvider router={router} />
}

