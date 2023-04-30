import React, { useState } from "react";
import { NavBar } from "../interfaces/NavBar";
import logo from "../assets/images/logo2.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { MdSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchPageView from "../views/SearchPageView";

const Nav = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navBarPieces: NavBar[] = [
    {
      name: "Main Menu",
      path: "main-page",
    },
    {
      name: "Favourites",
      path: "favourites-page",
    },
    {
      name: "Movies",
      path: "movies-page",
    },
    {
      name: "Series",
      path: "series-page",
    },
  ];

  return (
    <div>
      <div className="flex justify-center my-3">
        <Link to={"main-page"}>
          <img className="w-80 cursor-pointer" src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <div className="flex justify-between md:hidden">
          <button
            className="p-2 rounded-md text-gray-700 hover:cursor-pointer text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div
          /* Itt meg kellene oldani, hogyha kicsiben kinyitom a menüt, utána felnyagyítom, akkor a fixed és bg értékek megmaradnak */
          className={`${
            isOpen ? "block bg-gray-700 bg-opacity-90  fixed w-full" : "hidden"
          } text-center md:flex md:justify-evenly mt-4`}
        >
          {navBarPieces.map((item) => (
            <div
              key={item.path}
              className="cursor-pointer p-2 hover:bg-gray-200 ease-in duration-300 font-bold"
            >
              <Link to={item.path}>{t(item.name)}</Link>
            </div>
          ))}
          <Link to={"search-page"}>
            <div className="text-xl cursor-pointer p-1 hover:bg-gray-200 ease-in duration-300 font-bold">
              {t("Search")}
            </div>
          </Link>
          <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="hu">HU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Nav;
