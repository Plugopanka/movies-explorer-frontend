import SignPage from "../SignPage/SignPage";
import { Link } from "react-router-dom";

function Register() {
  return (
    <SignPage
      buttonText={"Зарегистрироваться"}
      title={"Добро пожаловать!"}
      inputChildren={
        <label className="sign__label">
          <span className="sign__text">Имя</span>
          <input
            name="name"
            className="sign__input"
            id="sign-name"
            placeholder="Имя"
            defaultValue=""
            type="text"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="sign__input-error name-error"></span>
        </label>
      }
      linkChildren={
        <span className="sign__link-text">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="sign__link">
            Войти
          </Link>
        </span>
      }
    />
  );
}

export default Register;
