import "./Profile.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Profile({ isLoggedIn, onClickBurger, isBurgerOpened }) {

  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onClickBurger={onClickBurger}
        isBurgerOpened={isBurgerOpened}
      />
      <main className="profile">
        <section className="profile__container">
          <h1 className="profile__title">Привет, Мария!</h1>
          <form className="profile__form" name="profile-form" noValidate>
            <div className="profile__input-container">
              <label className="profile__label">
                <span className="profile__text">Имя</span>
                <input
                  defaultValue="Мария"
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
                  defaultValue="maria@.com"
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
            </div>
            <div className="profile__button-container">
              <button
                type="submit"
                className="profile__button profile__button_action_save"
                aria-label="Сохранить изменения."
              >
                {"Редактировать" || "Сохранить"}
              </button>
              <button
                type="button"
                className="profile__button profile__button_action_logout"
                aria-label="Выйти из аккаунта."
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
