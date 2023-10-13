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
  currentUser,
  handleMovieDelete,
  savedMovies,
  errorText,
  setErrorText
}) {
  // const [allSavedMovies, setAllSavedMovies] = useState(savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem("filteredSavedMovies")) || savedMovies);

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShortSavedMovie")) || false
  );

  function handleFilterMovies(text, checkbox) {
    const moviesList = filterMovies(savedMovies, text, checkbox);
    console.log(moviesList);
    localStorage.setItem("filteredSavedMovies", JSON.stringify(moviesList));
    setFilteredMovies(
      checkbox ? filterShortMovies(moviesList) : moviesList
    );
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
    localStorage.setIcccctem("isShortSavedMovie", JSON.stringify(!isShort));
  }

  // function handleFormSubmit(text) {
  //   if (movies.length === 0) {
  //     moviesApi
  //       .getMovies()
  //       .then((movies) => {
  //         setMovies(movies);
  //         handleFilterMovies(text, isShort);
  //       })
  //       .catch(() =>
  //         setErrorText(
  //           "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
  //         )
  //       );
  //   } else {
  //     handleFilterMovies(text, isShort);
  //     console.log(movies);
  //   }
  // }

  useEffect(() => {
    if (localStorage.getItem("isShortSavedMovie")) {
      setIsShort(true);
    } else {
      setIsShort(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem("filteredSavedMovies")) {
      const movies = JSON.parse(localStorage.getItem("filteredSavedMovies"));
      setFilteredMovies(movies);
      if (localStorage.getItem(isShort === "true")) {
        setFilteredMovies(setIsShort(movies));
      } else {
        setFilteredMovies(movies);
      }
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
          handleFormSubmit={handleFilterMovies}
          isShort={isShort}
          handleCheckboxSwitch={handleCheckboxSwitch}
        />
        <MoviesCardList
          movies={filteredMovies}
          errorText={errorText}
          handleMovieDelete={handleMovieDelete}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
