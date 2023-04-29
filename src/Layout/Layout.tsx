import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import '../locales/en.json';
import '../locales/hu.json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-full">
      <Nav />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
