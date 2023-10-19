import "./FilterCheckbox.css";

function FilterCheckbox({ isShort, handleCheckboxSwitch }) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        checked={isShort}
        onChange={handleCheckboxSwitch}
      />
      <div className="filter__tumbler"></div>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
