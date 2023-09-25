// import { SHORT_MOVIES } from "./const";

// export const durationConverter = (duration) => {
//     const mins = duration % 60;
//     const hours = Math.floor(duration / 60);
//     return `${hours}ч ${mins}м`;
// };

// export function filterShortMovies(movies) {
//     return movies.filter((movie) => movie.duration <= SHORT_MOVIES);
// }

// export function filterMovies(movies, query) {
//     const moviesQuery = movies.filter((movie) => {
//         const movieRU = String(movie.nameRU).toLowerCase().trim();
//         const movieEN = String(movie.nameEN).toLowerCase().trim();
//         const userQuery = query.toLowerCase().trim();
//         return movieRU.indexOf(userQuery) !== -1 || movieEN.indexOf(userQuery) !== -1;
//     });
//     return moviesQuery;
// }

// export const checkRes = (res) => {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}.`);
// };
