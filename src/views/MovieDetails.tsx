import React, { useEffect, useState } from "react";
import TMDBService from "../services/TMDBService";
import { useParams } from "react-router";
import Movie from "../models/Movie";
import Rating from "@mui/material/Rating";
import MovieService from "../services/movieService";
import RatingMovie from "../models/RatingMovie";
import i18n from "../i18n";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ratedNumber, setRatedNumber] = useState(0);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const tmdbService = new TMDBService();
  const myMoviesService = new MovieService();

  async function getMovieDetails() {
    const details = await tmdbService.show(Number(id), i18n.language);
    console.log(details);
    setMovieDetails(details);
    setLoading(false);
  }

  const handleInputChange = (e) => {
    setRatedNumber(e.target.value);
  };

  console.log(ratedNumber);
  async function postMovie(movieDetails: Movie) {
    setOpen(false);
    const ratingMovie = new RatingMovie();
    ratingMovie.id = Number(movieDetails.id);
    ratingMovie.title = movieDetails.title;
    ratingMovie.poster_path = movieDetails.poster_path;
    ratingMovie.release_date = movieDetails.release_date;
    ratingMovie.vote_average = movieDetails.vote_average;
    ratingMovie.rate = ratedNumber;
    console.log(movieDetails.release_date);
    console.log(ratingMovie);
    await myMoviesService.store(ratingMovie);
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
              <div key={genre.id} className="mx-4">
                {genre.name}
              </div>
            ))}
          </div>
          <div className="flex">
            <Rating
              name="read-only-10"
              value={movieDetails?.vote_average}
              readOnly
              max={10}
            />
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
      <Button onClick={handleOpen}>Értékelem</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
            Film értékelése
          </Typography>
          <Typography className="text-center" id="modal-modal-description" sx={{ mt: 2 }}>
            <input type="number"  onChange={handleInputChange} max={10} />
            {/* itt a szerver oldalon is meg kellene oldani, hogy 10-nél nagyobb számot ne fogadjon el */}
          </Typography>
          <Typography className="text-center" id="modal-modal-description" sx={{ mt: 2 }}>
            <button onClick={() => movieDetails && postMovie(movieDetails)}>
              Mentés
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieDetails;
