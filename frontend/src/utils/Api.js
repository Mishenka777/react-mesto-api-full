export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    };
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    })
      .then(res => this._getResponseServer(res))
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link
      }),
    })
      .then(res => this._getResponseServer(res))
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    })
      .then(res => this._getResponseServer(res))
  }

  setProfileData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._getResponseServer(res))
  };

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(
        avatar
      ),
    })
      .then(res => this._getResponseServer(res))
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(res => this._getResponseServer(res))
  };

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    })
      .then(res => this._getResponseServer(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    })
      .then(res => this._getResponseServer(res))
  }
}

export const api = new Api({
  baseUrl: 'https://misha666.students.nomoreparties.sbs/',
  headers: {
    'Content-Type': 'application/json'
  }
});