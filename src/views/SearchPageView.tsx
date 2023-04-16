import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import TMDBService from "../services/tmdbService";
import Movie from "../models/Movie";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const SearchPageView = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);

  const tmdbService = new TMDBService();

  async function getApi(e: React.ChangeEvent<HTMLInputElement>) {
    const api = await tmdbService.search(
      e.target.value,
      i18n.language === "hu" ? "hu" : "en"
    );
    setSearchedMovies(api.results);
  }

  return (
    <div>
      <div className="flex p-2">
        <input
          onChange={getApi}
          type="search"
          placeholder={t("Type the movie...")}
          className="px-3 shadow shadow-black"
        />
        <MdSearch className="text-3xl bg-white border shadow shadow-black" />
      </div>
      {searchedMovies.length > 0 ? (
        <div>
          {searchedMovies
            .sort((a, b) => b.popularity - a.popularity)
            .map((movie) => (
              <div className="flex">
                <div className="w-70 h-60 border-solid border-2 border-black mx-2">
                  <div className="flex flex-col">
                    <h4 className="flex justify-center font-bold">
                      {movie.title}
                    </h4>
                    <div className="flex">
                      <img
                        className="w-auto h-40"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt=""
                      />
                      <h5 className="h-20 overflow-auto">
                        {movie.release_date.substring(0, 4)}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>{t("There are currently no results")}</div>
      )}
    </div>
  );
};

export default SearchPageView;
