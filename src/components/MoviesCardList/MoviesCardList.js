import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { MIN_LAPTOP_DISPLAY, MIN_TABLET_DISPLAY } from "../../utils/constants";
import useScreenResize from "../../hooks/screenResize";

function MoviesCardList({
  movies,
  isLoading,
  errorText,
  handleMovieLike,
  handleMovieDelete,
  savedMovies,
}) {
  const location = useLocation();

  const display = useScreenResize();
  // const display = window.innerWidth;

  const [movieCounter, setMovieCounter] = useState(0);

  function showDefaultMovies() {
    if (display > MIN_LAPTOP_DISPLAY) {
      setMovieCounter(12);
    } else if (display > MIN_TABLET_DISPLAY) {
      setMovieCounter(8);
    } else {
      setMovieCounter(5);
    }
  }

  useEffect(() => {
    showDefaultMovies();
  }, [display, movies]);

  function addMoreMovies() {
    if (display > MIN_LAPTOP_DISPLAY) {
      setMovieCounter(movieCounter + 3);
    } else {
      setMovieCounter(movieCounter + 2);
    }
  }

  function getSavedMovie(movie) {
    const savedMovies = JSON.parse(localStorage.getItem("allSavedMovies"));
    if (savedMovies) {
    return savedMovies.find(
      (item) => item.movieId === (movie.id || movie.movieId)
    );
    }
  }

  return (
    <section className="movies-list">
      {isLoading && <Preloader />}
      <span>{errorText}</span>
      {location.pathname === "/movies" &&
        movies !== null &&
        movies.length !==
          0 && (
            <ul className="movies-list__list">
              {movies.slice(0, movieCounter).map((movie) => (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  handleMovieLike={handleMovieLike}
                  handleMovieDelete={handleMovieDelete}
                  isSaved={getSavedMovie(movie)}
                />
              ))}
            </ul>
          )}
      {location.pathname === "/saved-movies" &&
        movies !== null &&
        movies.length !== 0 && (
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
