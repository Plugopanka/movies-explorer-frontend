import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Movies } from "../../utils/constants";
import { useLocation } from "react-router-dom";

function MoviesCardList() {
  const location = useLocation();

  return (
    <section className="movies-list">
      <ul className="movies-list__list">
        {Movies.map((movie) => (
          <MoviesCard key={movie.movieId} movie={movie} />
        ))}
      </ul>
      {location.pathname === "/movies" && (
        <button
          type="button"
          className="movies-list__button"
          aria-label="Показать фильмы."
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
