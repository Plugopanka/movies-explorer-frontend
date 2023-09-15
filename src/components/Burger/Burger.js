import './Burger.css';
import openBurger from "../../images/open-burger.svg";
import closeBurger from "../../images/close-burger.svg";

function Burger({ isBurgerOpened, onClickBurger }) {
  function handleOnClickBurger() {
    onClickBurger();
  };

  return (
    <button
      type="button"
      className={`burger__button burger__button_${
        !isBurgerOpened ? 'open' : 'close'
      }`}
      onClick={handleOnClickBurger}
    >
      <img src={!isBurgerOpened ? openBurger : closeBurger} alt="Иконка меню сайта." className="burger__image" />
    </button>

  );
}

export default Burger;