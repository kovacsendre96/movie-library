import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

import FavouritesPageView from "../views/FavouritesPageView";
import MoviesPageView from "../views/MoviesPageView";
import SeriesPageView from "../views/SeriesPageView";
import MainPageView from "../views/MainPageView";
import SearchPageView from "../views/SearchPageView";
import MovieDetails from "../views/MovieDetails";



export const router  = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "main-page",
        element: <MainPageView />,
      },
      {
        path: "favourites-page",
        element: <FavouritesPageView />,
      },
      {
        path: "movies-page",
        element: <MoviesPageView />,
      },
      {
        path: "series-page",
        element: <SeriesPageView />,
      },
      {
        path: "search-page",
        element: <SearchPageView />,
      },
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
    ],
  },
]); 