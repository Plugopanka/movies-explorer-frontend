import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import { useState, useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";
import mainApi from "../../utils/MainApi";

function Movies({
  isLoggedIn,
  onClickBurger,
  isBurgerOpened,
  handleMovieLike,
  savedMovies,
  setSavedMovies
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
      ? setErrorText("Ничего не найдено")
      : setErrorText("");
  }

  function handleCheckboxSwitch() {
    setIsShort(!isShort);
    if (!isShort) {
      if (JSON.parse(localStorage.getItem("filteredMovies")).length !== 0) {
        setSearchedMoviesList(filterShortMovies(searchedMoviesList));
      } else {
        setSearchedMoviesList(filterShortMovies(movies));
      }
    } else {
      setSearchedMoviesList(searchedMoviesList);
    }
    localStorage.setItem("isShortMovie", JSON.stringify(!isShort));
    // filterShortMovies(JSON.parse(localStorage.getItem("filteredSavedMovies")));
    searchedMoviesList.length === 0
      ? setErrorText("Ничего не найдено")
      : setErrorText("");
  }

  function handleChangeText(evt) {
    const inputText = evt.target.value;
    setText(inputText);
    localStorage.setItem("userSearchText", inputText);
  }

  function handleFormSubmit() {
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

  function handleMovieDelete(movie) {
    const jwt = localStorage.getItem("jwt");
    const movies = JSON.parse(localStorage.getItem("allSavedMovies"));
    const likedMovie = movies.find(
      (el) => el.movieId === movie.id
    );
    console.log(likedMovie)
    mainApi
      .deleteMovie(likedMovie._id, jwt)
      .then(() => {
        console.log(savedMovies)
        const newlikedMovies = savedMovies.filter((el) => {
          return el._id !== likedMovie._id;
        });
        console.log(newlikedMovies)
        setSavedMovies(newlikedMovies);
        localStorage.setItem("allSavedMovies", JSON.stringify(newlikedMovies));
        
        console.log(JSON.parse(localStorage.getItem("allSavedMovies")))
        handleFilterMovies();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
      
  }

  useEffect(() => {
    setSearchedMoviesList(searchedMoviesList);
  }, [searchedMoviesList]);

  useEffect(() => {
    if (localStorage.getItem("isShortMovie") === true) {
      setIsShort(true);
    } else {
      setIsShort(false);
    }
  }, []);

  // useEffect(() => {
  //   handleCheckboxSwitch()
  // }, [isShort]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("filteredMovies")) !== null) {
      const movies = JSON.parse(localStorage.getItem("filteredMovies"));
      console.log(movies);
      setSearchedMoviesList(isShort ? filterShortMovies(movies) : movies);
    } else {
      setErrorText("Начните поиск");
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
