import { BASE_URL } from "./const";

const getResponseData = (res, errorMessage) => {
    return res.ok ? res.json() : Promise.reject(errorMessage);
};

const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    }).then((res) => getResponseData(res, 'При регистрации произошла ошибка. Попробуйте еще раз.'));
};

const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => getResponseData(res, 'При авторизации произошла ошибка. Попробуйте еще раз.'));
};

const getUsersContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => getResponseData(res, 'Не удалось проверить авторизацию.'));
};

const getProfileInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then((res) => getResponseData(res, 'Не удалось загрузить информацию о пользователе.'));
};

const patchProfileInfo = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
        }),
    }).then((res) => getResponseData(res, 'Не удалось обновить информацию о пользователе.'));
};

const getSavedMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then((res) => getResponseData(res, 'Не удалось загрузить список фильмов.'));
};

const saveMovie = (data) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: `https://api.nomoreparties.co/${data.image.url}`,
            trailerLink: data.trailerLink,
            thumbnail: `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`,
            movieId: data.id,
            nameRU: data.nameRU || data.nameEN,
            nameEN: data.nameEN || data.nameRU,
        }),
    }).then((res) =>
        getResponseData(res, 'При добавлении фильма в избанное произошла ошибка. Попробуйте еще раз.')
    );
};

const removeMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then((res) =>
        getResponseData(res, 'При удалении фильма из избранного произошла ошибка. Попробуйте еще раз.')
    );
};

export {
    getResponseData,
    register,
    authorize,
    getUsersContent,
    getProfileInfo,
    patchProfileInfo,
    getSavedMovies,
    saveMovie,
    removeMovie
};
