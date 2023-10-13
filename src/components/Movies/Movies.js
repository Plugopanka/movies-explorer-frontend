import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import { useState, useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

function Movies({
  isLoggedIn,
  onClickBurger,
  isBurgerOpened,
  currentUser,
  handleMovieLike,
  handleMovieDelete,
  savedMovies,
}) {
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("allMovies")) || []
  );

  const [searchedMoviesList, setSearchedMoviesList] = useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShortMovie")) || false
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleFilterMovies(text, checkbox) {
    const moviesList = filterMovies(movies, text, checkbox);
    console.log(moviesList);
    localStorage.setItem("allSavedMovies", JSON.stringify(moviesList));
    setSearchedMoviesList(
      checkbox ? filterShortMovies(moviesList) : moviesList
    );
    moviesList.length === 0
      ? setErrorText("Ничего не найдено.")
      : setErrorText("");
  }

  function handleCheckboxSwitch() {
    setIsShort(!isShort);
    if (!isShort) {
      setSearchedMoviesList(filterShortMovies(searchedMoviesList));
    } else {
      setSearchedMoviesList(searchedMoviesList);
    }
    localStorage.setItem("isShortMovie", JSON.stringify(!isShort));
  }

  function handleFormSubmit(text) {
    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem("allMovies", JSON.stringify(movies));
          handleFilterMovies(text, isShort);
        })
        .catch(() =>
          setErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          )
        )
        .finally(() => setIsLoading(false));
    } else {
      handleFilterMovies(text, isShort);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("isShortMovie")) {
      setIsShort(true);
    } else {
      setIsShort(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      setMovies(movies);
      if (localStorage.getItem(isShort === "true")) {
        setSearchedMoviesList(setIsShort(movies));
      } else {
        setSearchedMoviesList(movies);
      }
    } else {
      setErrorText("Начните поиск фильмов.");
    }
  }, []);

  return (
    <>
      <Header
        isLoggedIn={(isLoggedIn = true)}
        onClickBurger={onClickBurger}
        isBurgerOpened={isBurgerOpened}
      />
      <main className="movies">
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          isShort={isShort}
          handleCheckboxSwitch={handleCheckboxSwitch}
        />
        <MoviesCardList
          movies={searchedMoviesList}
          isLoading={isLoading}
          errorText={errorText}
          handleMovieLike={handleMovieLike}
          handleMovieDelete={handleMovieDelete}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
