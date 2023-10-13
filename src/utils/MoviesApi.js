import { BEATFILMS_URL } from "./constants";

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _returnPromiseStatus(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }
}

const moviesApi = new MoviesApi({
  url: BEATFILMS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
