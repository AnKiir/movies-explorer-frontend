// const getResponseData = (res, errorMessage) => {
//   return res.ok ? res.json() : Promise.reject(errorMessage);
// };

// const getMovies = () => {
//   return fetch('https://api.nomoreparties.co/beatfilm-movies').then((res) =>
//     getResponseData(
//       res,
//       'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
//     )
//   );
// };

import { MOVIES_URL } from './const';
import { checkRes } from './utils';

export function getMovies() {
  return fetch(MOVIES_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkRes(res));
}
