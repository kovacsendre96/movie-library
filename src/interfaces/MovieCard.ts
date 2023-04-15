import Movie from "../models/Movie";

export interface MovieCardProps {
    movies: Movie[];
    loading: boolean;
  }