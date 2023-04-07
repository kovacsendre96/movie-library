import React from "react";
import { NavBar } from "../interfaces/NavBar";
import logo from "../assets/images/logo2.png";

const Nav = () => {
  const navBarPieces: NavBar[] = [
    {
      name: "Főmenü",
    },
    {
      name: "Kedvencek",
    },
    {
      name: "Filmek",
    },
    {
      name: "Sorozatok",
    },
  ];

  return (
    <div>
      <div className="flex justify-center my-3">
        <img className="w-80 cursor-pointer" src={logo} alt="logo" />
      </div>
      <div className="flex justify-evenly">
        {navBarPieces.map((item) => (
          <div className="cursor-pointer p-2 hover:bg-[#d3d3d3]  ease-in duration-300" >{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
