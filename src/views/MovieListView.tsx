import React, { useEffect, useState } from 'react';
import MovieService from '../services/movieService';
import Movie from '../models/Movie';
import MovieCard from '../components/common/MovieCard';
import TMDBService from '../services/TMDBService';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
    <div className='carousel-wrapper'>
      {!loading ? (
        <Carousel
          showThumbs={false}
          interval={3000}
          showStatus={false}
          className='flex flex-wrap justify-center'
          centerMode
          centerSlidePercentage={33.333}
          infiniteLoop
        >
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieListView;
