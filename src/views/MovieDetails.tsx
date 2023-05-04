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
import imageNot from "../assets/images/imageNotAvailable.png";

const MovieDetails = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ratedNumber, setRatedNumber] = useState<number>(0);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showFullOverview, setShowFullOverview] = useState<boolean>(false);

  const tmdbService = new TMDBService();
  const myMoviesService = new MovieService();

  async function getMovieDetails() {
    const details = await tmdbService.show(Number(id), i18n.language);

    setMovieDetails(details);
    setLoading(false);
  }

  const handleInputChange = (e) => {
    setRatedNumber(Number(e.target.value));
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

  const truncateOverview = (text: string, maxLength = 350) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div>
      {!loading && (
        <div className="text-white flex flex-col justify-center text-center">
          <h3 className="text-3xl font-bold">
            {movieDetails?.title} (
            {movieDetails?.release_date &&
              new Date(movieDetails.release_date).getFullYear()}
            )
          </h3>{" "}
          {i18n.language === "hu" && (
            <h5 className="text-l font-bold">
              ({movieDetails?.original_title})
            </h5>
          )}
          <div className="flex flex-col md:flex-row justify-around ">
            <div>
              <div className="flex justify-evenly mt-4 mb-2 items-center">
                {movieDetails?.runtime}m
                {movieDetails?.genres.map((genre) => (
                  <div key={genre.id} className="mx-4 border border-white px-2">
                    {genre.name}
                  </div>
                ))}
              </div>
              {movieDetails?.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path}`}
                  alt=""
                  className="object-cover mb-4 flex justify-center w-full"
                />
              ) : (
                <img
                  src={movieDetails?.poster_path.length !== 0 ? `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}` : imageNot}
                  alt=""
                  className="h-72 mb-4 mt-4 inline-block justify-center"
                />
              )}
              <div className="flex justify-center">
                <Rating
                  name="read-only-10"
                  value={movieDetails?.vote_average}
                  readOnly
                  max={10}
                  precision={0.1}
                />
                <h4>{movieDetails?.vote_average.toFixed(1)}/10</h4>
              </div>
              <Button
                sx={{
                  color: "white",
                  marginTop: "22px",
                  border: "1px solid gray",
                  "&:hover": {
                    backgroundColor: "gray",
                    color: "white",
                  },
                }}
                onClick={handleOpen}
              >
                {t("Add to List")}
              </Button>
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
                  <div className="text-center flex justify-evenly">
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating"
                        onChange={handleInputChange}
                        value={ratedNumber}
                        precision={0.5}
                        max={10}
                        style={{ color: "blue" }}
                      />
                    </Stack>
                    {ratedNumber}
                  </div>
                  <Typography
                    className="text-center"
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                  >
                    <button
                      onClick={() => movieDetails && postMovie(movieDetails)}
                    >
                      {t("Save")}
                    </button>
                  </Typography>
                </Box>
              </Modal>
            </div>
            <div className="flex flex-col justify-center my-14 mb-72 mx-4  md:w-72">
              {movieDetails?.overview ? <h4 className="text-center">
                {showFullOverview
                  ? movieDetails?.overview
                  : movieDetails?.overview &&
                    truncateOverview(movieDetails?.overview)}
              </h4> :
              <h4 className="text-center text-xl flex justify-center">
                {t("No description found")}
              </h4>}
              {!showFullOverview &&
                movieDetails?.overview &&
                movieDetails.overview.length > 350 && (
                  <Button
                    onClick={() => setShowFullOverview(true)}
                    sx={{ marginTop: "1rem" }}
                  >
                    {t("Show more")}
                  </Button>
                )}
              {showFullOverview &&
                movieDetails?.overview &&
                movieDetails?.overview.length > 350 && (
                  <Button
                    onClick={() => setShowFullOverview(false)}
                    sx={{ marginTop: "1rem" }}
                  >
                    {t("Show less")}
                  </Button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
