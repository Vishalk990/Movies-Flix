import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ poster_path }) => {
  if (!poster_path) return null;

  return (
    <div className="w-36 md:w-48 pr-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + poster_path}
        className="rounded-lg"
      />
    </div>
  );
};

export default MovieCard;