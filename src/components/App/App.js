import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../../vendor/normalize.css";
import "../../vendor/fonts/fonts.css";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import InfoTooltip from "../InfoToolTip/InfoToolTip";

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem("allSavedMovies")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [errorText, setErrorText] = useState("");

  function closePopup() {
    setIsSuccessPopupOpen(false);
  }

  useEffect(() => {
    checkCurrentToken();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getSavedMovies(jwt)
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("allSavedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        setErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        console.log(`Ошибка загрузки ${err}`);
      });
  }, []);

  function checkCurrentToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setUserEmail(res.email);
          setUserName(res.name);
          navigate(location, { replace: true });
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setUserEmail("");
          setUserName("");
          console.log(`Ошибка загрузки ${err}`);
        });
    }
  }

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => localStorage.setItem("jwt", data.token))
      .then((data) => {
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  function handleRegister({ name, email, password }) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  function handleLogout() {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.clear();
    navigate("/", { replace: true });
  }

  function handleProfileChange({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .patchUserInfo(name, email, jwt)
      .then((data) => {
        setCurrentUser(data);
        setIsSuccessPopupOpen(true);
        setIsSucceed(true);
      })
      .catch((err) => {
        setIsSuccessPopupOpen(true);
        setIsSucceed(false);
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  function handleMovieLike(movie) {
    const jwt = localStorage.getItem("jwt");
    console.log(movie);
    mainApi
      .addMovie(movie, jwt)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  function handleMovieDelete(movie) {
    const jwt = localStorage.getItem("jwt");
    const likedMovie = savedMovies.find(
      (el) => el.movieId === movie.id || el.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(likedMovie._id, jwt)
      .then(() => {
        // setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
        const newlikedMovies = savedMovies.filter((el) => {
          return movie.movieId !== el.movieId || movie.id !== el.movieId;
        });
        setSavedMovies(newlikedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <HelmetProvider>
        <div className="root">
          <Helmet>
            <html lang="ru" />
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link
              rel="icon"
              href="../../images/favicon.ico"
              type="image/x-icon"
            />
            <title>Поисковик фильмов</title>
          </Helmet>
          <div className="page">
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                    handleMovieLike={handleMovieLike}
                    handleMovieDelete={handleMovieDelete}
                    savedMovies={savedMovies}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                    handleMovieLike={handleMovieLike}
                    handleMovieDelete={handleMovieDelete}
                    savedMovies={savedMovies}
                    errorText={errorText}
                    setErrorText={setErrorText}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    userEmail={userEmail}
                    userName={userName}
                    isLoggedIn={isLoggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                    handleLogout={handleLogout}
                    handleProfileChange={handleProfileChange}
                    handleSuccessPopup={setIsSuccessPopupOpen}
                    handleSucceed={setIsSucceed}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  !isLoggedIn ? (
                    <Login handleLogin={handleLogin} />
                  ) : (
                    <Main
                      isLoggedIn={isLoggedIn}
                      onClickBurger={onClickBurger}
                      isBurgerOpened={isBurgerOpened}
                    />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  !isLoggedIn ? (
                    <Register handleRegister={handleRegister} />
                  ) : (
                    <Main
                      isLoggedIn={isLoggedIn}
                      onClickBurger={onClickBurger}
                      isBurgerOpened={isBurgerOpened}
                    />
                  )
                }
              />
            </Routes>

            <InfoTooltip
              onClose={closePopup}
              isOpen={isSuccessPopupOpen}
              isSucceed={isSucceed}
            />
          </div>
        </div>
      </HelmetProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
