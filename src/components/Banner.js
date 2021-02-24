import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

import Nav from "./Nav";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <Nav />

      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
        <div className="banner__buttons">
          <button className="banner__button banner__button-play">Play</button>
          <button className="banner__button banner__button-mylist">My List</button>
        </div>
      </div>
      <div className="banner--fadebottom"></div>
    </header>
  );
}

export default Banner;
