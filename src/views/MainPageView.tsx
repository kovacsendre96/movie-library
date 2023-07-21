import React, { useState } from "react";
import MoviesPageView from "./MoviesPageView";
import FavouritesPageView from "./FavouritesPageView";

const MainPageView = () => {
  



  return (
    <div className="text-center">
      <div>
        <MoviesPageView />
        <FavouritesPageView />
      </div>
    </div>
  );
};

export default MainPageView;
