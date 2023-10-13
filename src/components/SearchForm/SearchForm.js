import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

function SearchForm({ handleFormSubmit, isShort, handleCheckboxSwitch }) {
  const [text, setText] = useState(
    localStorage.getItem("userSearchText") || ""
  );
  const [errorText, setErrorText] = useState("");

  function handleChangeText(evt) {
    const inputText = evt.target.value;
    setText(inputText);
    localStorage.setItem("userSearchText", inputText);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (text.trim().length === 0) {
      setErrorText("Нужно ввести ключевое слово.");
    } else {
      setErrorText("");
      setText(localStorage.getItem("userSearchText"));
      handleFormSubmit(text, isShort);
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
        <FilterCheckbox isShort={isShort} handleCheckboxSwitch={handleCheckboxSwitch}/>
      </form>
    </section>
  );
}

export default SearchForm;
