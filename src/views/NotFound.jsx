import React from "react";
import Navbar from "../components/navbar/Navbar";

const image = require("../assets/404.png");

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="h-[90vh] w-screen flex flex-col items-center justify-center">
        <img className="w-fit" src={image} alt="Not Found" />
        <p className="text-[110px] text-text dark:text-gray">Page not found</p>
      </div>
    </>
  );
}
