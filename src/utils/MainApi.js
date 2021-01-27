import { main_url } from './config';

const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || main_url}`;

const _handleError = (res) => {
  if (res.ok) {
    return res.json();
  }

  console.log('Неудачный запрос fentch');
  return Promise.reject(res.status);
};

class MainApi {
  constructor({ baseApiUrl, headers }) {
    this._baseUrl = baseApiUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }


  getArticlesFromServer() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }

  addNewArticle({ name, link }) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(_handleError);
  }

  removeArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }
}

const mainApi = new MainApi(
  {
    baseApiUrl: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  },
);

export default mainApi;
