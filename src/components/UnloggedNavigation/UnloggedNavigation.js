import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./UnloggedNavigation.css";

function UnloggedNavigation() {

  return (
        <nav className="unloggedNav">
          <Link to="/" className="unloggedNav__link">
            <img src={logo} alt="Логотип" className="unloggedNav__logo" />
          </Link>
          <ul className="unloggedNav__list">
            <li>
              <Link to="/signup" className="unloggedNav__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="unloggedNav__link unloggedNav__link_color_green"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      
  );
}

export default UnloggedNavigation;