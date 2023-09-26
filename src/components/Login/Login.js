import SignPage from "../SignPage/SignPage";
import { Link } from "react-router-dom";

function Login() {
  return (
    <SignPage
      buttonText={"Войти"}
      title={"Рады видеть!"}
      linkChildren={
        <span className="sign__link-text">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="sign__link">
            Регистрация
          </Link>
        </span>
      }
    />
  );
}

export default Login;
