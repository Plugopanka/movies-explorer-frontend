import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
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
import * as auth from "../../utils/auth.js";
import mainApi from "../../utils/MainApi.js";

function App() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    checkCurrentToken();
  }, []);

  function checkCurrentToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          console.log("hello")
          setIsLoggedIn(true);
          setCurrentUser(res);
          setUserEmail(res.email);
          navigate(location, { replace: true });
        })
        .catch((err) => {
          console.log("bye")
          setIsLoggedIn(false);
          setUserEmail("");
          console.log(`Ошибка загрузки ${err}`);
        });
    }
  }

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  function handleLogin({ email, password }) {
    auth
      .authorize(email, password )
      .then((data) => localStorage.setItem("jwt", data.token))
      .then((data) => {
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        // handleUserEmail(values.email);
        // checkToken();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
          
  }

  function handleRegister({ name, email, password }) {
    auth
      .register( name, email, password)
      .then(() => {
        // handleSuccessPopup(true);
        // handleSucceed(true);
          handleLogin({ email, password });
      })
      .catch((err) => {
        // handleSuccessPopup(true);
        // handleSucceed(false);
        console.log(`Ошибка загрузки ${err}`);
      });
  };

  function handleLogout() {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
  }

  function handleProfileChange({ name, email }) {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .patchUserInfo(name, email, jwt)
      .then(data => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      }
      )
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
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    userEmail={userEmail}
                    isLoggedIn={isLoggedIn}
                    onClickBurger={onClickBurger}
                    isBurgerOpened={isBurgerOpened}
                    handleLogout={handleLogout}
                    handleProfileChange={handleProfileChange}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    handleLogin={handleLogin}
                    handleUserEmail={setUserEmail}
                  />
                }
              />
              <Route path="/signup" element={<Register handleRegister={handleRegister}/>} />
            </Routes>
          </div>
        </div>
      </HelmetProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
