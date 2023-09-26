import "./FilterCheckbox.css";

function FilterCheckbox({ shortMovies, handleShortFilms }) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
      />
      <div className="filter__tumbler"></div>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
