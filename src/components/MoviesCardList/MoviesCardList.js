import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function MoviesCardList({
  movies,
  isLoading,
  errorText,
  handleMovieLike,
  handleMovieDelete,
  savedMovies,
}) {
  const location = useLocation();

  const display = window.innerWidth;

  const [movieCounter, setMovieCounter] = useState(0);

  function showDefaultMovies() {
    if (display > 1265) {
      setMovieCounter(12);
    } else if (display > 760) {
      setMovieCounter(8);
    } else {
      setMovieCounter(5);
    }
  }

  useEffect(() => {
    showDefaultMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showDefaultMovies);
    }, 1000);
    return () => {
      window.removeEventListener("resize", showDefaultMovies);
    }
  }, []);

  function addMoreMovies() {
    if (display > 1265) {
      setMovieCounter(movieCounter + 3);
    } else {
      setMovieCounter(movieCounter + 2);
    }
  }

  function getSavedMovies(arr, movie) {
    return arr.find((item) => item.movieId === movie.id);
  }

  return (
    <section className="movies-list">
      {isLoading && <Preloader />}
      <span>{errorText}</span>
      {errorText === "" && location.pathname === "/movies" && (
        <ul className="movies-list__list">
          {movies.slice(0, movieCounter).map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              handleMovieLike={handleMovieLike}
              handleMovieDelete={handleMovieDelete}
              isSaved={getSavedMovies(savedMovies, movie)}
            />
          ))}
        </ul>
      )}
      {location.pathname === "/saved-movies" && (
        <ul className="movies-list__list">
          {movies.map((movie) => (
            <MoviesCard
              key={movie._id}
              movie={movie}
              handleMovieDelete={handleMovieDelete}
            />
          ))}
        </ul>
      )}
      {location.pathname === "/movies" && movies.length > movieCounter && (
        <button
          type="button"
          className="movies-list__button"
          aria-label="Показать фильмы."
          onClick={addMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
