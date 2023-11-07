import "./Profile.css";
import Header from "../Header/Header";
import useForm from "../../hooks/formValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useEffect, useContext, useState } from "react";
import { NAME_REGEX, EMAIL_REGEX } from "../../utils/constants";

function Profile({
  userEmail,
  userName,
  isLoggedIn,
  onClickBurger,
  isBurgerOpened,
  handleLogout,
  handleProfileChange,
  handleSuccessPopup,
  handleSucceed,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isChangeButtonClicked, setIsChangeButtonClicked] = useState(false);

  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useForm();

  useEffect(() => {
    setValues((userData) => ({
      ...userData,
      name: currentUser.name,
      email: currentUser.email,
    }));
  }, [currentUser, setValues]);

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  const invalidForm =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  const handleClickChange = () => {
    setIsChangeButtonClicked(true);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    handleProfileChange(values);
    setIsChangeButtonClicked(false);
  }

  return (
    <>
      <Header
        isLoggedIn={(isLoggedIn = true)}
        onClickBurger={onClickBurger}
        isBurgerOpened={isBurgerOpened}
      />
      <main className="profile">
        <section className="profile__container">
          <h1 className="profile__title">{`Привет, ${
            currentUser.name || "киноман"
          }!`}</h1>
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
                  value={values.name || userName || ""}
                  type="text"
                  name="name"
                  className="profile__input"
                  id="input-name"
                  placeholder="Имя"
                  onChange={handleChange}
                  required
                  minLength="2"
                  maxLength="40"
                  pattern={NAME_REGEX}
                  disabled={!isChangeButtonClicked}
                />
              </label>
              <span className=" profile__input-error name-error">
                {errors.name}
              </span>
              <label className="profile__label">
                <span className="profile__text">E-mail</span>
                <input
                  value={values.email || userEmail || ""}
                  type="text"
                  name="email"
                  className="profile__input"
                  id="input-email"
                  placeholder="email"
                  onChange={handleChange}
                  required
                  minLength="2"
                  maxLength="40"
                  pattern={EMAIL_REGEX}
                  disabled={!isChangeButtonClicked}
                />
              </label>
              <span className=" profile__input-error email-error">
                {errors.email}
              </span>
            </div>
            <div className="profile__button-container">
              {isChangeButtonClicked && (
                <>
                  {invalidForm && (
                    <span className="profile__input-error">
                      Поле имени или e-mail не изменено.
                    </span>
                  )}
                  <button
                    type="submit"
                    className={`profile__button profile__button_action_save ${
                      invalidForm && "profile__button_disabled"
                    }`}
                    aria-label="Сохранить изменения."
                    disabled={invalidForm ? true : false}
                  >
                    Сохранить
                  </button>
                </>
              )}
              {!isChangeButtonClicked && (
                <>
                  <button
                    type="button"
                    className="profile__button profile__button_action_edit"
                    aria-label="Изменить данные пользователя."
                    onClick={handleClickChange}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="profile__button profile__button_action_logout"
                    aria-label="Выйти из аккаунта."
                    onClick={handleLogout}
                  >
                    Выйти из аккаунта
                  </button>
                </>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
