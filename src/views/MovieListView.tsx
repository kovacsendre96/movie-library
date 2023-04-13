import React, { useEffect, useState } from "react";
import movieimg from "../assets/images/movie.png";
import MovieService from "../services/movieService";
import Movie from "../models/Movie";

const MovieListView = () => {
  const [movies, setMoives] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const movieListService = new MovieService();

  async function getMovies() {
    const movieList = await movieListService.index();
    setMoives(movieList);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="flex h-full">
      {!loading &&
        movies.map((movie) => (
          <div className="w-60 h-50 border-solid border-2 border-black">
            <div>
              <h4 className="flex justify-center font-bold">{movie.title}</h4>
              <div className="flex">
                <img className="w-40 h-20" src={movieimg} alt="" />
                {movie.overview}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieListView;
