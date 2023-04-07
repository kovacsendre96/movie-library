import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import MainPage from "../views/MainPage";
import FavouritesPage from "../views/FavouritesPage";
import MoviesPage from "../views/MoviesPage";



export const router  = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "main-page",
        element: <MainPage />,
      },
      {
        path: "favourites-page",
        element: <FavouritesPage />,
      },
      {
        path: "movies-page",
        element: <MoviesPage />,
      },
    ],
  },
]); 