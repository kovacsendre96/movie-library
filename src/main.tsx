/* import React from "react";
import App from "./App"; */
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import {router} from "./routes/index.tsx";

const rootElement = document.getElementById("root")!;

const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);