import React from "react";
import { MovieCardProps } from "../../interfaces/MovieCard";

const MovieCard: React.FC<MovieCardProps> = ({ movies, loading }) => {
  return (
    <div className="flex">
      {" "}
      {!loading &&
        movies.map((movie) => (
          <div className="w-70 h-40 border-solid border-2 border-black mx-2">
            <div className="flex flex-col">
              <h4 className="flex justify-center font-bold">{movie.title}</h4>
              <div className="flex">
                <img className="w-40 h-20" src={movie.poster_path} alt="" />
                <h5 className="h-20 overflow-auto">{movie.overview}</h5>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieCard;
