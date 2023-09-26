import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard({ movie }) {
  const [savedMovie, setSavedMovie] = useState(false);

  const location = useLocation();

  return (
    <li className="movies-card">
      <a className="movies-card__link" target="_blank" href={movie.trailerLink}>
        <img
          src={movie.image}
          alt={movie.nameRU}
          className="movies-card__image"
        />
        {location.pathname === "/movies" && (
          <button
            type="button"
            className={`movies-card__button 
            movies-card__button_state_${!savedMovie ? "save" : "saved"}
              `}
          >
            {!savedMovie ? "Сохранить" : ""}
          </button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            className="movies-card__button movies-card__button_state_delete"
            aria-label="Удалить фильм из сохранённых"
          ></button>
        )}
      </a>
      <div className="movies-card__description">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <span className="movies-card__duration">{movie.duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
