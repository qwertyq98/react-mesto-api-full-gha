class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  makeResponse(url, params) {
    return fetch(`${this.baseUrl}/${url}`, {
      ...params,
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json().then(data => data.data);
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return this.makeResponse('cards', {
      metod: 'GET',
    });
  }

  addNewCard(data) {
    return this.makeResponse('cards', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  getUserInfo() {
    return this.makeResponse('users/me', {
      method: 'GET',
    });
  }

  setUserInfoPopap(userData) {
    return this.makeResponse('users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
  }

  deleteCard(id) {
    return this.makeResponse(`cards/${id}`, {
      method: 'DELETE',
    });
  }

  changeLikeCardStatus(_id, isLiked) {
    return this.makeResponse(`cards/${_id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
    });
  }

  changeUserAvatar(data) {
    return this.makeResponse('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }

  register = (password, email) => {
    return this.makeResponse('signup', {
      method: 'POST',
      body: JSON.stringify({password, email})
    });
  }

  authorize = (email, password) => {
    return this.makeResponse('signin', {
      method: 'POST',
      body: JSON.stringify({ password, email }),
    });
  }

  logout = () => {
    return this.makeResponse('signout', {
      method: 'POST'
    });
  }

  checkToken = () => {
    return this.makeResponse('users/me', {
      method: 'GET',
    });
  };
}

const api = new Api({
  baseUrl: 'http://127.0.0.1:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;