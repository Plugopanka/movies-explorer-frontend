import { BASE_URL } from "./constants.js";

// класс для взаимодействия с сервером
class MainApi {
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

getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  };
  

register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  };
  
authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  };

  // запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  // запрос на редактирование данных пользователя
  patchUserInfo(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  // запрос фильмов
  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  // сохранение фильма
  addNewMovie(data, token) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: data.image,
          trailerLink: data.trailerLink,
          thumbnail: data.thumbnail,
          movieId: data.id,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
          token: token
        },
      ),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  // удаление фильма из сохранённых
  deleteMovie(data, token) {
    return fetch(`${this._url}/movies/${data}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }
}

const mainApi = new MainApi({
  url: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
