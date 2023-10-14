import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import { useState, useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

function SavedMovies({
  isLoggedIn,
  onClickBurger,
  isBurgerOpened,
  handleMovieDelete,
  savedMovies,
  errorText,
  setErrorText,
}) {
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredSavedMovies")) || savedMovies
  );

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShortSavedMovie")) || false
  );

  const [text, setText] = useState(
    localStorage.getItem("userSearchSavedText") || ""
  );

  function handleFilterMovies() {
    console.log(savedMovies);
    const moviesList = filterMovies(savedMovies, text, isShort);
    console.log(moviesList);
    localStorage.setItem("filteredSavedMovies", JSON.stringify(moviesList));
    setFilteredMovies(isShort ? filterShortMovies(moviesList) : moviesList);
    moviesList.length === 0
      ? setErrorText("Ничего не найдено.")
      : setErrorText("");
  }

  function handleCheckboxSwitch() {
    setIsShort(!isShort);
    if (!isShort) {
      setFilteredMovies(filterShortMovies(filteredMovies));
    } else {
      setFilteredMovies(filteredMovies);
    }
    localStorage.setItem("isShortSavedMovie", JSON.stringify(!isShort));
    handleFilterMovies();
  }

  function handleChangeText(evt) {
    const inputText = evt.target.value;
    setText(inputText);
    localStorage.setItem("userSearchSavedText", inputText);
  }

  function handleFormSubmit() {
    setText(localStorage.getItem("userSearchSavedText"));
    handleFilterMovies();
  }

  useEffect(() => {
    setFilteredMovies(filteredMovies);
  }, [filteredMovies]);

  useEffect(() => {
    if (localStorage.getItem("isShortSavedMovie") === true) {
      setIsShort(false);
    } else {
      setIsShort(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("filteredSavedMovies")) {
      const movies = JSON.parse(localStorage.getItem("filteredSavedMovies"));
      setFilteredMovies(!isShort ? filterShortMovies(movies) : movies);
    } else {
      setFilteredMovies(JSON.parse(localStorage.getItem("allSavedMovies")));
    }
  }, []);

  return (
    <>
      <Header
        isLoggedIn={(isLoggedIn = true)}
        onClickBurger={onClickBurger}
        isBurgerOpened={isBurgerOpened}
      />
      <main className="saved-movies">
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          isShort={isShort}
          handleCheckboxSwitch={handleCheckboxSwitch}
          text={text}
          handleChangeText={handleChangeText}
        />
        <MoviesCardList
          movies={filteredMovies}
          errorText={errorText}
          handleMovieDelete={handleMovieDelete}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
