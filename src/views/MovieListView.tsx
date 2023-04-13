import React from "react";
import movieimg from "../assets/images/movie.png";

const MovieListView = () => {
  const movies = [
    {
      title: "Heathers",
      rating: "4.5 stars",
      description:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
    {
      title: "Europa Report",
      rating: "2.5 stars",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
    {
      title: "Fellowship of the Ring",
      rating: "5 stars",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
    {
      title: "Silver Linings Playbook",
      rating: "5 stars",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
  ];

  return (
    <div className="flex h-full">
      {movies.map((movie) => (
        <div className="w-60 h-50 border-solid border-2 border-black">
          <div>
            <h4 className="flex justify-center font-bold">{movie.title}</h4>
            <div className="flex">
              <img className="w-40 h-20" src={movieimg} alt="" />
              {movie.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieListView;
