import * as React from "react";
import {
  createBrowserRouter, Navigate,
  RouterProvider,
} from "react-router-dom";
import { IndexPage } from "../pages/index/IndexPage";


const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <IndexPage />,
  },
]);


export const Router = () => {
  return <RouterProvider router={router} />
}

