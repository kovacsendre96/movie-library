import React, { useEffect, useState } from "react";
import TMDBService from "../services/TMDBService";
import { useParams } from "react-router";
import Movie from "../models/Movie";
import Rating from '@mui/material/Rating';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const tmdbService = new TMDBService();

  async function getMovieDetails() {
    const details = await tmdbService.show(Number(id), "en");
    console.log(details);
    setMovieDetails(details);
    setLoading(false);
  }
  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div>
      {!loading && (
        <div className="bg-white">
          <h3 className="text-3xl font-bold">{movieDetails?.title}</h3>
          <div className="flex">
            {movieDetails?.genres.map((genre) => (
              <div key={genre.id} className="mx-4">{genre.name}</div>
            ))}
          </div>
          <div className="flex">
          <Rating name="read-only-10" value={movieDetails?.vote_average} readOnly max={10} />
          <h4>{movieDetails?.vote_average.toFixed(1)}/10</h4>
          </div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path}`}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
