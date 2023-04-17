import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import TMDBService from "../services/TMDBService";
import Movie from "../models/Movie";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import MovieCard from "../components/common/MovieCard";

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
        <div className="flex overflow-auto items-center">
          {searchedMovies
            .sort((a, b) => b.popularity - a.popularity)
            .map((movie) => (
            <MovieCard movie={movie} />
            ))}
        </div>
      ) : (
        <div>{t("There are currently no results")}</div>
      )}
    </div>
  );
};

export default SearchPageView;
