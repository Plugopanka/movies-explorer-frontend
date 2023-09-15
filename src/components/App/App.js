import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  return (
    <div className="root">
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
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
