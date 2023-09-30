import Burger from "../Burger/Burger";
import "./LoggedNavigation.css";
import logo from "../../images/logo.svg";
import { Link, NavLink } from "react-router-dom";

function LoggedNavigation({ onClickBurger, isBurgerOpened }) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return (
    <nav
      className={`loggedNav loggedNav_${isBurgerOpened ? "opened" : "closed"}`}
    >
      <Link
        to="/"
        className={`loggedNav__link loggedNav__link_position_${
          isBurgerOpened ? "covered" : "naked"
        }`}
      >
        <img src={logo} alt="Логотип." className="loggedNav__logo" />
        <div
          className={`loggedNav__overlay loggedNav__overlay_${
            isBurgerOpened ? "active" : undefined
          }`}
        ></div>
      </Link>

      <ul
        className={`loggedNav__list loggedNav__list_${
          isBurgerOpened ? "opened" : "closed"
        }`}
        onClick={handleClickOverlay}
      >
        {isBurgerOpened && (
          <li>
            <NavLink
              exact
              to="/"
              className="loggedNav__link"
              activeclassname="loggedNav__link_active"
            >
              Главная
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/movies"
            className="loggedNav__link"
            activeclassname="loggedNav__link_active"
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className="loggedNav__link"
            activeclassname="loggedNav__link_active"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <Link
        to="/profile"
        className={`loggedNav__link loggedNav__link_background_pale loggedNav__link_${
          isBurgerOpened ? "able" : "disable"
        }`}
      >
        Аккаунт
      </Link>
      <Burger isBurgerOpened={isBurgerOpened} onClickBurger={onClickBurger} />
    </nav>
  );
}

export default LoggedNavigation;
