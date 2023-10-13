import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { setDuration } from "../../utils/filterMovies";

function MoviesCard({ movie, handleMovieLike, handleMovieDelete, isSaved }) {

  const location = useLocation();

  function onLikeClick() {
    handleMovieLike(movie);
  }

  function onDeleteClick() {
    handleMovieDelete(movie);
  }

  return (
    <li className="movies-card">
      <a className="movies-card__link" target="_blank" href={movie.trailerLink}>
        <img
          src={location.pathname === "/movies" ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
          alt={movie.nameRU}
          className="movies-card__image"
        />
      </a>
      {location.pathname === "/movies" && (
          <button
            type="button"
            onClick={!isSaved ? onLikeClick : onDeleteClick}
            className={`movies-card__button 
            movies-card__button_state_${!isSaved ? "save" : "saved"}
              `}
          >
            {!isSaved ? "Сохранить" : ""}
          </button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            onClick={onDeleteClick}
            className="movies-card__button movies-card__button_state_delete"
            aria-label="Удалить фильм из сохранённых"
          ></button>
        )}
      <div className="movies-card__description">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <span className="movies-card__duration">
          {setDuration(movie.duration)}
        </span>
      </div>
    </li>
  );
}

export default MoviesCard;
