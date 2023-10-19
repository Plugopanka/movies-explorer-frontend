import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({
  handleFormSubmit,
  isShort,
  handleCheckboxSwitch,
  text,
  handleChangeText,
}) {
  const location = useLocation();

  const [errorText, setErrorText] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (location.pathname === "/movies") {
      if (text.trim().length === 0) {
        setErrorText("Нужно ввести ключевое слово.");
      } else {
        setErrorText("");
        handleFormSubmit();
      }
    } else {
      setErrorText("");
      handleFormSubmit();
    }
  }

  return (
    <section className="search">
      <form
        className="search__form"
        name="search-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="search__container">
          <label className="search__label">
            <input
              className="search__input"
              name="search-input"
              id="search-input"
              type="text"
              placeholder="Фильм"
              value={text}
              required
              onChange={handleChangeText}
            />
            <span className="search__error">{errorText}</span>
          </label>
          <button
            type="submit"
            className="search__button"
            aria-label="Найти фильмы."
          ></button>
        </div>
        <FilterCheckbox
          isShort={isShort}
          handleCheckboxSwitch={handleCheckboxSwitch}
        />
      </form>
    </section>
  );
}

export default SearchForm;
