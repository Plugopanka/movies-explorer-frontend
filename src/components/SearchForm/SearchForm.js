import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" name="search-form" noValidate>
        <div className="search__container">
          <label className="search__label">
            <input
              className="search__input"
              name="search-input"
              id="search-input"
              type="text"
              placeholder="Фильм"
              defaultValue=""
              required
            />
            <span className="search__error"></span>
          </label>
          <button
            type="submit"
            className="search__button"
            aria-label="Найти фильмы."
          ></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
