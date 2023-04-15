import React, { useState } from "react";
import { NavBar } from "../interfaces/NavBar";
import logo from "../assets/images/logo2.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { t } = useTranslation();

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
      <div className="flex justify-evenly">
        {navBarPieces.map((item) => (
          <div key={item.path} className="cursor-pointer p-2 hover:bg-gray-200 ease-in duration-300 font-bold">
            <Link to={item.path}>{t(item.name)}</Link>
          </div>
        ))}
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value="hu">HU</option>
          <option value="en">EN</option>
        </select>
      </div>
    </div>
  );
};

export default Nav;
