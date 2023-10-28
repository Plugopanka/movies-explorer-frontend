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
  setSavedMovies,
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

  const [errorUserText, setErrorUserText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleFilterMovies() {
    console.log(savedMovies);
    const movies = JSON.parse(localStorage.getItem("allMovies"));
    const moviesList = filterMovies(movies, text);
    console.log(moviesList);
    localStorage.setItem(
      "filteredMovies",
      JSON.stringify(isShort ? filterShortMovies(moviesList) : moviesList)
    );
    setSearchedMoviesList(isShort ? filterShortMovies(moviesList) : moviesList);
    const movie = JSON.parse(localStorage.getItem("filteredMovies"));
    movie.length === 0 ? setErrorText("Ничего не найдено") : setErrorText("");
  }

  function handleCheckboxSwitch() {
    if (text.trim().length === 0 && isShort) {
      setErrorUserText("Нужно ввести ключевое слово");
    } else {
      setErrorUserText("");
      setIsShort(!isShort);
      if (!isShort) {
        if (
          JSON.parse(localStorage.getItem("filteredMovies")) &&
          JSON.parse(localStorage.getItem("filteredMovies")).length !== 0
        ) {
          setSearchedMoviesList(filterShortMovies(searchedMoviesList));
        } else {
          setSearchedMoviesList(filterShortMovies(movies));
        }
      } else {
        setSearchedMoviesList(searchedMoviesList);
      }
      localStorage.setItem("isShortMovie", JSON.stringify(!isShort));
      searchedMoviesList.length === 0
        ? setErrorText("Ничего не найдено")
        : setErrorText("");
    }
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
    const likedMovie = movies.find((el) => el.movieId === movie.id);
    console.log(likedMovie);
    mainApi
      .deleteMovie(likedMovie._id, jwt)
      .then(() => {
        console.log(savedMovies);
        const newlikedMovies = savedMovies.filter((el) => {
          return el._id !== likedMovie._id;
        });
        console.log(newlikedMovies);

        localStorage.setItem("allSavedMovies", JSON.stringify(newlikedMovies));
        setSavedMovies(newlikedMovies);
        console.log(JSON.parse(localStorage.getItem("allSavedMovies")));
        console.log(savedMovies);

        handleFilterMovies();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  useEffect(() => {
    setSavedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    setSearchedMoviesList(searchedMoviesList);
  }, [searchedMoviesList]);

  useEffect(() => {
    if (isShort) {
      setIsShort(true);
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
    } else {
      setIsShort(false);
      if (movies.length === 0) {
        setErrorText("gegeg");
      } else {
        setSearchedMoviesList(searchedMoviesList);
        handleFilterMovies();
      }
    }
  }, [isShort]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("filteredMovies")) !== null) {
      const movies = JSON.parse(localStorage.getItem("filteredMovies"));
      console.log(movies);
      setSearchedMoviesList(isShort ? filterShortMovies(movies) : movies);
    } else {
      setErrorText("Начните поиск");
    }
    console.log(JSON.parse(localStorage.getItem("allSavedMovies")));
    setSavedMovies(JSON.parse(localStorage.getItem("allSavedMovies")));
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
          setErrorText={setErrorUserText}
          errorText={errorUserText}
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
