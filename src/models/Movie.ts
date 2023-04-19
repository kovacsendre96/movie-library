import { Genre } from "../interfaces/Genre";


export default class Movie {
  adult: Boolean = false;
  backdrop_path="";
  belongs_to_collection=null;
  budget=0;
  genres: Genre[]=[];
  homepage= "";
  id = "";
  imdb_id= "";
  title = "";
  original_title= "";
  runtime= 0;
  overview = "";
  release_date = "";
  poster_path = "";
  original_language = "";
  rate = 0;
  opinion = "";
  movie_id = 0;
  popularity: any;
  vote_average = 0;
  vote_count= 0;
}
