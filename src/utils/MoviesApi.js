const getResponseData = (res, errorMessage) => {
  return res.ok ? res.json() : Promise.reject(errorMessage);
};

const getMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies').then((res) =>
    getResponseData(
      res,
      'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    )
  );
};

export { getMovies };

// class Api {
//   constructor({ baseUrl }) {
//     this._baseUrl = baseUrl;
//   }

//   _handelResponse(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//   }

//   getMovies() {
//     return fetch(`${this._baseUrl}`, {
//       method: "GET",
//     })
//       .then(this._handelResponse)
//       .then((movies) => {
//         return movies; 
//       });
//   }
// }

// export const MoviesApi = new Api({
//   baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
// });