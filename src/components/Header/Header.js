import { Link } from "react-router-dom";
import UnloggedNavigation from "../UnloggedNavigation/UnloggedNavigation";
import LoggedNavigation from "../LoggedNavigation/LoggedNavigation";
import "./Header.css";

function Header({ isLoggedIn, onClickBurger, isBurgerOpened }) {

  return (
    <header className="header">
      {isLoggedIn ? (
        <LoggedNavigation
          onClickBurger={onClickBurger}
          isBurgerOpened={isBurgerOpened}
        />
      ) : (
        <UnloggedNavigation />
      )}
    </header>
  );
}

export default Header;
