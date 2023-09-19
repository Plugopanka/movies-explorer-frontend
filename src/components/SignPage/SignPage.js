import "./SignPage.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function SignPage({ buttonText, title, inputChildren, linkChildren }) {
  return (
    <main className="sign">
      <form className="sign__form" name="sign-form" noValidate>
        <Link to="/" className="sign__link">
          <img src={logo} alt="Логотип." className="sign__logo" />
        </Link>
        <h1 className="sign__title">{title}</h1>
        <div className="sign__form-container">
          <div className="sign__input-container">
            {inputChildren}
            <label className="sign__label">
              <span className="sign__text">E-mail</span>
              <input
                name="email"
                className="sign__input"
                id="sign-email"
                placeholder=""
                value=""
                type="email"
                required
              />
              <span className="sign__input-error email-error"></span>
            </label>
            <label className="sign__label">
              <span className="sign__text">Пароль</span>
              <input
                name="password"
                className="sign__input"
                id="sign-password"
                placeholder=""
                value=""
                type="password"
                required
              />
              <span className="sign__input-error password-error">
                Что-то пошло не так...
              </span>
            </label>
          </div>
          <div className="sign__button-container">
            <button
              type="submit"
              className="sign__button"
              aria-label="Сохранить изменения."
            >
              {buttonText}
            </button>
            {linkChildren}
          </div>
        </div>
      </form>
    </main>
  );
}

export default SignPage;
