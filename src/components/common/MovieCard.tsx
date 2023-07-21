import React from "react";
import Movie from "../../models/Movie";
import { MovieCardProps } from "../../interfaces/MovieCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import movieImgSubstitue from "../../assets/images/movieImgSubstitue.png";

const MovieCard: React.FC<MovieCardProps> = ({ movie }: MovieCardProps) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <div className="flex">
      <div className="m-2">
        <div className="w-44 md:w-52 lg:w-72 shadow-[2px_0px_100px_0px_rgba(0,0,0,0.20)] mx-2 flex flex-col text-center justify-center items-center">
          <h6 className="h-12 items-center flex justify-center text-m  font-bold overflow-hidden">
            {movie.title}
          </h6>
          <Link to={`/movie/${movie.id}`}>
            <div className="flex flex-col hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-500">
              {movie.poster_path !== null ? (
                <img
                  className="w-32 h-40 object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                />
              ) : (
                <img className="w-32 h-40" src={movieImgSubstitue} />
              )}
            </div>
          </Link>
              {movie.release_date.length !== 0 ? (
                <h5 className="text-center">
                  {new Date(movie.release_date).getFullYear()}
                </h5>
              ) : (
                <h5>{t("No year found")}</h5>
              )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
