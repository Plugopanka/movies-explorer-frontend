import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import { useState, useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

function SavedMovies({
  isLoggedIn,
  onClickBurger,
  isBurgerOpened,
  savedMovies,
  setSavedMovies,
  errorText,
  setErrorText,
}) {
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredSavedMovies")) || JSON.parse(localStorage.getItem("allSavedMovies"))
  );

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShortSavedMovie")) || false
  );

  const [text, setText] = useState(
    localStorage.getItem("userSearchSavedText") || ""
  );

  function handleFilterMovies() {
    const movies = JSON.parse(localStorage.getItem("allSavedMovies"));
    console.log(savedMovies);
    console.log(movies);
    if (movies && movies.length !== 0 ) {
      const moviesList = filterMovies(movies, text, isShort);
      console.log(moviesList);
      localStorage.setItem("filteredSavedMovies", JSON.stringify(moviesList));
      setFilteredMovies(isShort ? filterShortMovies(moviesList) : moviesList);
      moviesList.length === 0
        ? setErrorText("Ничего не найдено.")
        : setErrorText("");
    } else {
      setErrorText("Нет сохраненных фильмов");
    }
  }

  function handleCheckboxSwitch() {
    setIsShort(!isShort);
    if (!isShort) {
      setFilteredMovies(filterShortMovies(filteredMovies));
      // localStorage.setItem("filteredSavedMovies", JSON.stringify(filterShortMovies(filteredMovies)));
      filterShortMovies(filteredMovies).length === 0 ? setErrorText("Ничего не найдено") : setErrorText("");
      // filterShortMovies(savedMovies).length === 0 ? setErrorText("Ничего не найдено") : setErrorText("");
    } else {
      setFilteredMovies(filteredMovies);
    }
    localStorage.setItem("isShortSavedMovie", JSON.stringify(!isShort));
    if (savedMovies && savedMovies.length !== 0) {
      setFilteredMovies(filterShortMovies(
        JSON.parse(localStorage.getItem("filteredSavedMovies"))
      ));
    } else {
      setErrorText("Нет сохраненных фильмов");
    }
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

  function handleMovieDelete(movie) {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .deleteMovie(movie._id, jwt)
      .then(() => {
        console.log(savedMovies);
        const newlikedMovies = savedMovies.filter((el) => {
          return el._id !== movie._id;
        });
        localStorage.setItem("allSavedMovies", JSON.stringify(newlikedMovies));
        setSavedMovies(JSON.parse(localStorage.getItem("allSavedMovies")));
        console.log(savedMovies);
        handleFilterMovies();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
    // setSavedMovies(JSON.parse(localStorage.getItem("allSavedMovies")));
    // console.log(savedMovies);
  }

  useEffect(() => {
    setFilteredMovies(filteredMovies);
  }, [filteredMovies]);

  useEffect(() => {
    if (localStorage.getItem("isShortSavedMovie") === true) {
      setIsShort(true);
    } else {
      setIsShort(false);
    }
  }, []);

  useEffect(() => {
    if (filteredMovies) {
      if (
        filteredMovies.length !== 0
      ) {
        // const movies = JSON.parse(localStorage.getItem("filteredSavedMovies"));
        setFilteredMovies(isShort ? filterShortMovies(filteredMovies) : filteredMovies);
        setErrorText("");
      } else {
        setErrorText("Ничего не найдено");
      }
    } else if (savedMovies) {
      setFilteredMovies(savedMovies);
      // localStorage.setItem(
      //   "filteredSavedMovies",
      //   JSON.stringify(localStorage.getItem("allSavedMovies"))
      // );
      setErrorText("");
    } else {
      setErrorText("Нет сохраненных фильмов");
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
