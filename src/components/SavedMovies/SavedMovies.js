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
    JSON.parse(localStorage.getItem("filteredSavedMovies")) ||
      JSON.parse(localStorage.getItem("allSavedMovies"))
  );

  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShortSavedMovie")) || false
  );

  const [text, setText] = useState(
    localStorage.getItem("userSearchSavedText") || ""
  );

  const [errorUserText, setErrorUserText] = useState("");

  function handleFilterMovies() {
    const movies = JSON.parse(localStorage.getItem("allSavedMovies"));
    setSavedMovies(movies);
    console.log(movies);
    console.log(savedMovies);
    if (movies && movies.length !== 0) {
      const moviesList = filterMovies(movies, text);
      console.log(moviesList);
      localStorage.setItem(
        "filteredSavedMovies",
        JSON.stringify(isShort ? filterShortMovies(moviesList) : moviesList)
      );
      const movie = JSON.parse(localStorage.getItem("filteredSavedMovies"));
      setFilteredMovies(isShort ? filterShortMovies(moviesList) : moviesList);
      movie.length === 0 ? setErrorText("Ничего не найдено") : setErrorText("");
    } else {
      setErrorText("Нет сохраненных фильмов");
    }
  }

  function handleCheckboxSwitch() {
    setIsShort(!isShort);
    if (filteredMovies) {
      if (!isShort) {
        // handleFilterMovies()
        setFilteredMovies(filterShortMovies(filteredMovies));
        localStorage.setItem(
          "filteredSavedMovies",
          JSON.stringify(filterShortMovies(filteredMovies))
        );
        const movie = JSON.parse(localStorage.getItem("filteredSavedMovies"));
        movie.length === 0
          ? setErrorText("Ничего не найдено")
          : setErrorText("");
      } else {
        setFilteredMovies(filteredMovies);
        localStorage.setItem(
          "filteredSavedMovies",
          JSON.stringify(filteredMovies)
        );
      }
    } else if (savedMovies && savedMovies.length !== 0) {
      setFilteredMovies(
        filterShortMovies(
          JSON.parse(localStorage.getItem("filteredSavedMovies"))
        )
      );
    } else {
      setErrorText("Нет сохраненных фильмов");
    }
    localStorage.setItem("isShortSavedMovie", JSON.stringify(!isShort));
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
        setSavedMovies(newlikedMovies);
        console.log(newlikedMovies);
        handleFilterMovies();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  useEffect(() => {
    setFilteredMovies(filteredMovies);
  }, [filteredMovies]);

  useEffect(() => {
    if (isShort) {
      setIsShort(true);
      filteredMovies
        ? setFilteredMovies(filterShortMovies(filteredMovies))
        : setErrorText("Нет сохраненных фильмов");
      handleFilterMovies();
    } else {
      setIsShort(false);
      handleFilterMovies();
    }
  }, [isShort]);

  useEffect(() => {
    // const movies = JSON.parse(localStorage.getItem("filteredSavedMovies"));
    // setFilteredMovies(movies);
    // console.log(filteredMovies);
    setSavedMovies(JSON.parse(localStorage.getItem("allSavedMovies")));
    if (filteredMovies && filteredMovies.length !== 0) {
      // const movies = JSON.parse(localStorage.getItem("filteredSavedMovies"));
      setFilteredMovies(
        isShort ? filterShortMovies(filteredMovies) : filteredMovies
      );
      setErrorText("");
    } else if (savedMovies && savedMovies.length !== 0) {
      setFilteredMovies(savedMovies);
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
          setErrorText={setErrorUserText}
          errorText={errorUserText}
        />
        <MoviesCardList
          movies={JSON.parse(localStorage.getItem("filteredSavedMovies"))}
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
