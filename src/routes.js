import { createBrowserRouter } from "react-router-dom";
import Resume from "./containers/Resume";
import Feed from "./containers/Feed";
import ErrorPage from "./error-page";
import React from "react";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Resume />
  },
  {
    path: '/feed',
    element: <Feed />,
    errorElement: <ErrorPage />
  },
  {
    path: '/resume',
    element: <Resume />,
    errorElement: <ErrorPage />
  }
]);