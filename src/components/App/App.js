import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../../vendor/normalize.css";
import "../../vendor/fonts/fonts.css";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
// import api from "../utils/api";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
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
                <Movies
                  isLoggedIn={isLoggedIn}
                  onClickBurger={onClickBurger}
                  isBurgerOpened={isBurgerOpened}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  isLoggedIn={isLoggedIn}
                  onClickBurger={onClickBurger}
                  isBurgerOpened={isBurgerOpened}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  isLoggedIn={isLoggedIn}
                  onClickBurger={onClickBurger}
                  isBurgerOpened={isBurgerOpened}
                />
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
