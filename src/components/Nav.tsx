import React from "react";
import { NavBar } from "../interfaces/NavBar";
import logo from "../assets/images/logo2.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const navBarPieces: NavBar[] = [
    {
      name: "Főmenü",
      path: "main-page",
    },
    {
      name: "Kedvencek",
      path: "favourites-page",
    },
    {
      name: "Filmek",
      path: "movies-page",
    },
    {
      name: "Sorozatok",
      path: "series-page",
    },
  ];

  return (
    <div>
      <div className="flex justify-center my-3">
        <img className="w-80 cursor-pointer" src={logo} alt="logo" />
      </div>
      <div className="flex justify-evenly">
        {navBarPieces.map((item) => (
          <div className="cursor-pointer p-2 hover:bg-[#d3d3d3]  ease-in duration-300">
            {" "}
            <Link to={item.path}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
