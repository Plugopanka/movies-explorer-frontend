import { useContext } from "react";
import Footer from "./Footer.js";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onCardSubmit,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Редактировать аватар."
            onClick={() => {
              onEditAvatar(true);
            }}
          >
            <img
              alt="Аватар владельца аккаунта."
              className="profile__avatar"
              src={currentUser.avatar}
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль."
              onClick={() => {
                onEditProfile(true);
              }}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить публикацию."
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              _id={card._id}
              key={card._id}
              likes={card.likes}
              name={card.name}
              link={card.link}
              owner={card.owner}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardSubmit={onCardSubmit}
            />
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}

export default Main;
