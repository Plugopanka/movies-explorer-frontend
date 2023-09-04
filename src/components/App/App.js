import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import DeletePlacePopup from "./DeletePlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isChangePopupOpen, setIsChangePopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [targetCard, setTargetCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  function closeAllPopups() {
    setIsEditPopupOpen(false);
    setIsAddPopupOpen(false);
    setIsChangePopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setTargetCard({});
    setDeletedCard({});
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    isLoggedIn &&
      api
        .getCards(jwt)
        .then((cardData) => {
          cardData.reverse();
          setCards(cardData);
        })
        .catch((err) => {
          console.log(`Ошибка загрузки ${err}`);
        });
  }, [isLoggedIn]);

  useEffect(() => {
    checkCurrentToken();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => {
      return i === currentUser._id;
    });

    const jwt = localStorage.getItem("jwt");

    (isLiked ? api.deleteLike(card._id, jwt) : api.putLike(card._id, jwt))
      .then((newCard) => {
        const newCards = cards.map((card) =>
          card._id === newCard._id ? newCard : card
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  // function handleDeleteButtonClick(card) {
  //   setDeletedCard(card);
  //   setIsSubmitPopupOpen(true);
  // }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    api
      .deleteNewCard(card._id, jwt)
      .then(() => {
        const newCards = cards.filter((element) => {
          return element._id !== card._id;
        });
        setCards(newCards);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api
      .patchUserInfo(name, about, jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api
      .patchUserAvatar(avatar, jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api
      .postNewCard(name, link, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка загрузки ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  function checkCurrentToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setUserEmail(res.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          setIsLoggedIn(false);
          setUserEmail("");
          console.log(`Ошибка загрузки ${err}`);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header userEmail={userEmail} />

          <Routes>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  cards={cards}
                  onEditProfile={setIsEditPopupOpen}
                  onAddPlace={setIsAddPopupOpen}
                  onEditAvatar={setIsChangePopupOpen}
                  onCardClick={setTargetCard}
                  onCardLike={handleCardLike}
                  onCardDelete={setDeletedCard}
                  onCardSubmit={setIsSubmitPopupOpen}
                  // onCardSubmit={handleDeleteButtonClick}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleSucceed={setIsSucceed}
                  handleSuccessPopup={setIsSuccessPopupOpen}
                  isLoading={isLoading}
                  handleLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  handleLogin={handleLogin}
                  checkToken={checkCurrentToken}
                  handleUserEmail={setUserEmail}
                  isLoading={isLoading}
                  handleLoading={setIsLoading}
                />
              }
            />
          </Routes>

          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditPopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isChangePopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isLoading={isLoading}
            isOpen={isAddPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeletePlacePopup
            isLoading={isLoading}
            card={deletedCard}
            isOpen={isSubmitPopupOpen}
            onClose={closeAllPopups}
            onDeletePlace={handleCardDelete}
            onDeletedCard={setDeletedCard}
          />

          <ImagePopup card={targetCard} onClose={closeAllPopups} />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isSuccessPopupOpen}
            isSucceed={isSucceed}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
