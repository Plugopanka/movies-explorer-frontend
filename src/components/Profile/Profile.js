import "./Profile.css";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/formValidation";

function Profile({
  isLoggedIn,
  onClickBurger,
  isBurgerOpened,
  handleLogout,
  handleProfile,
}) {
  const { values, handleChange, errors, isValid } = useForm();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
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
          <form
            className="profile__form"
            name="profile-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="profile__input-container">
              <label className="profile__label">
                <span className="profile__text">Имя</span>
                <input
                  value={values.name || ""}
                  type="text"
                  name="name"
                  className="profile__input"
                  id="input-name"
                  placeholder="Имя"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span className=" profile__input-error name-error">
                  {errors.name || ""}
                </span>
              </label>
              <label className="profile__label">
                <span className="profile__text">E-mail</span>
                <input
                  value={values.name || ""}
                  type="text"
                  name="email"
                  className="profile__input"
                  id="input-email"
                  placeholder="email"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span className=" profile__input-error email-error">
                  {errors.email || ""}
                </span>
              </label>
            </div>
            <div className="profile__button-container">
              <button
                type="submit"
                className={`profile__button profile__button_action_save ${
                  !isValid && "profile__button_disabled"
                }`}
                aria-label="Сохранить изменения."
                disabled={!isValid}
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
