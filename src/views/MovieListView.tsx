import React, { useEffect, useState } from "react";
import MovieService from "../services/movieService";
import Movie from "../models/Movie";
import MovieCard from "../components/common/MovieCard";
import ApiService from "../services/MovieDBService";

const MovieListView = () => {
  const [movies, setMoives] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const movieListService = new MovieService();
  const apiService = new ApiService();

  async function getApi() {
    const api = await apiService.search("star", "hu")
    console.log(api);
  }

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
      <button onClick={getApi}>klikk</button>
      <MovieCard movies={movies} loading={loading} />
    </div>
  );
};

export default MovieListView;
