import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import movies from "../../utils/constants";
import { useLocation } from "react-router-dom";

function MoviesCardList() {

  const location = useLocation();

  return (
    <section className="movies-list">
      <ul className="movies-list__list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id || movie._id} movie={movie} />
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
