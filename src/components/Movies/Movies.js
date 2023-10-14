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

  const [text, setText] = useState(
    localStorage.getItem("userSearchText") || ""
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleFilterMovies() {
    const moviesList = filterMovies(movies, text, isShort);
    console.log(moviesList);
    localStorage.setItem("filteredMovies", JSON.stringify(moviesList));
    setSearchedMoviesList(isShort ? filterShortMovies(moviesList) : moviesList);
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
    handleFilterMovies();
  }

  function handleChangeText(evt) {
    const inputText = evt.target.value;
    setText(inputText);
    localStorage.setItem("userSearchText", inputText);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          localStorage.setItem("allMovies", JSON.stringify(movies));
          handleFilterMovies();
        })
        .catch(() =>
          setErrorText(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          )
        )
        .finally(() => setIsLoading(false));
    } else {
      handleFilterMovies();
    }
  }

  useEffect(() => {
    setSearchedMoviesList(searchedMoviesList)
  }, [searchedMoviesList]);

  useEffect(() => {
    if (localStorage.getItem("isShortMovie") === true) {
      setIsShort(false);
    } else {
      setIsShort(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("filteredMovies")) {
      const movies = JSON.parse(localStorage.getItem("filteredMovies"));
      setSearchedMoviesList(!isShort ? filterShortMovies(movies) : movies);
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
          text={text}
          handleChangeText={handleChangeText}
          errorText={errorText}
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
