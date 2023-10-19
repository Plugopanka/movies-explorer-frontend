import { MAX_SHORT_FILM_DURATION } from "./constants";

export function filterMovies(movies, text, checkbox) {
  const userText = text.toLowerCase().trim();
  const searchedMovies = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    return movieRu.includes(userText) || movieEn.includes(userText);
  });
  // if (checkbox) {
  //   return filterShortMovies(searchedMovies);
  // } else {
    return searchedMovies;
  // }
}

export function setDuration(time) {
  const hours = Math.trunc(time / 60);
  const minutes = time % 60;
  return hours < 1 ? `${minutes}м` : `${hours}ч ${minutes}м`;
}

export function filterShortMovies(movies) {
  const searchedMovies = movies.filter(
    (movie) => movie.duration < MAX_SHORT_FILM_DURATION
  );
  return searchedMovies;
}
