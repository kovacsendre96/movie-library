import React, { useEffect, useState } from "react";
import MovieService from "../services/movieService";
import Movie from "../models/Movie";
import MovieCard from "../components/common/MovieCard";
import TMDBService from "../services/TMDBService";

const MovieListView = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const movieListService = new MovieService();

  async function getMovies() {
    const movieList = await movieListService.index();
    setMovies(movieList);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="flex h-full">
      {!loading &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MovieListView;
