import "./InfoToolTip.css";

function InfoTooltip({ onClose, isOpen, isSucceed }) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_center">
        <p className="popup__title popup__title_type_center">
          {isSucceed
            ? "Вы успешно изменили данные аккаунта!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          className="popup__exit-button"
          type="button"
          aria-label="Выйти."
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
