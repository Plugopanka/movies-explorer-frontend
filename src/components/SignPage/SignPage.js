import "./SignPage.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/constants";

function SignPage({
  buttonText,
  title,
  onSubmit,
  onChange,
  formValue,
  formError,
  isValid,
  inputChildren,
  linkChildren,
}) {
  return (
    <main className="sign">
      <form
        className="sign__form"
        name="sign-form"
        onSubmit={onSubmit}
        noValidate
      >
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
                className={`sign__input ${
                  formError.email && "sign__input_state_error"
                }`}
                id="sign-email"
                placeholder="E-mail"
                type="email"
                value={formValue.email}
                onChange={onChange}
                required
                pattern={EMAIL_REGEX}
              />
              <span className="sign__input-error email-error">
                {formError.email}
              </span>
            </label>
            <label className="sign__label">
              <span className="sign__text">Пароль</span>
              <input
                name="password"
                className={`sign__input ${
                  formError.password && "sign__input_state_error"
                }`}
                id="sign-password"
                placeholder="Пароль"
                type="password"
                value={formValue.password}
                onChange={onChange}
                required
                minLength="2"
                maxLength="40"
              />
              <span className="sign__input-error password-error">
                {formError.password}
              </span>
            </label>
          </div>
          <div className="sign__button-container">
            <button
              type="submit"
              className={`sign__button ${!isValid && 'sign__button_disabled'}`}
              aria-label="Сохранить изменения."
              disabled={!isValid}
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
