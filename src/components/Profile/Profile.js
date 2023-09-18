import "./Profile.css";
import Header from "../Header/Header";

function Profile({ isLoggedIn, onClickBurger, isBurgerOpened }) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onClickBurger={onClickBurger}
        isBurgerOpened={isBurgerOpened}
      />
      <main className="profile">
        <h2 className="profile__title">Привет, Мария!</h2>
        <form className="profile__form" name="profile-form" noValidate>
          <label className="profile__label">
            <span className="profile__text">Имя</span>
            <input
              value="Мария"
              type="text"
              name="name"
              className="profile__input"
              id="input-name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span className=" profile__input-error name-error"></span>
          </label>
          <label className="profile__label">
            <span className="profile__text">E-mail</span>
            <input
              value="maria@.com"
              type="text"
              name="email"
              className="profile__input"
              id="input-email"
              placeholder="email"
              required
              minLength="2"
              maxLength="40"
            />
            <span className=" profile__input-error email-error"></span>
          </label>
        </form>
        <div className="profile__button-container">
          <button
            type="submit"
            className="profile__button profile__button_action_save"
            aria-label="Сохранить изменения."
          >
            {"Редактировать" || "Сохранить"}
          </button>
          <button
            type="submit"
            className="profile__button profile__button_action_logout"
            aria-label="Выйти из аккаунта."
          >
            Выйти из аккаунта
          </button>
        </div>
      </main>
    </>
  );
}

export default Profile;
