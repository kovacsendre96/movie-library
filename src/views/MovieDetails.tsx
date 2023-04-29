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
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const MovieDetails = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ratedNumber, setRatedNumber] = useState(0);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tmdbService = new TMDBService();
  const myMoviesService = new MovieService();

  async function getMovieDetails() {
    const details = await tmdbService.show(Number(id), i18n.language);
 
    setMovieDetails(details);
    setLoading(false);
  }

  const handleInputChange = (e) => {
    setRatedNumber(e.target.value);
  };


  async function postMovie(movieDetails: Movie) {
    setOpen(false);
    const ratingMovie = new RatingMovie();
    ratingMovie.id = Number(movieDetails.id);
    ratingMovie.title = movieDetails.title;
    ratingMovie.poster_path = movieDetails.poster_path;
    ratingMovie.release_date = movieDetails.release_date;
    ratingMovie.vote_average = movieDetails.vote_average;
    ratingMovie.rate = ratedNumber;
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
      <Button onClick={handleOpen}>{t("Rate")}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="shadow-xl border-2 border-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-slate-100">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
           {t("Rating")}
          </Typography>
          <Typography
            className="text-center flex justify-evenly"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                onChange={handleInputChange}
                defaultValue={ratedNumber}
                precision={0.5}
                max={10}
                style={{ color: "blue" }}
              />
            </Stack>
            {ratedNumber}
          </Typography>
          <Typography
            className="text-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <button onClick={() => movieDetails && postMovie(movieDetails)}>
              {t("Save")}
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieDetails;
