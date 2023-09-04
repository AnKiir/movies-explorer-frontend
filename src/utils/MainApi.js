import { URL } from "./const";

const getResponseData = (res, errorMessage) => {
    return res.ok ? res.json() : Promise.reject(errorMessage);
};

const register = async (data) => {
    return fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) => getResponseData(res, 'При регистрации произошла ошибка. Попробуйте еще раз.'));
};

const login = async (data) => {
    return fetch(`${URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) => getResponseData(res, 'При авторизации произошла ошибка. Попробуйте еще раз.'));
};

const checkToken = async () => {
    return fetch(`${URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => getResponseData(res, 'Не удалось проверить авторизацию.'));
};

const logout = async () => {
    return fetch(`${URL}/signout`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => getResponseData(res, 'Не удалось выйти из аккаунта.'));
};

const getUserInfo = async () => {
    return fetch(`${URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => getResponseData(res, 'Не удалось загрузить информацию о пользователе.'));
};

const updateUserInfo = async (data) => {
    return fetch(`${URL}/users/me`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) => getResponseData(res, 'Не удалось обновить информацию о пользователе.'));
};

const getFilms = async () => {
    return fetch(`${URL}/movies`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => getResponseData(res, 'Не удалось загрузить список фильмов.'));
};

const addFilmFaved = async (data) => {
    return fetch(`${URL}/movies`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    }).then((res) =>
        getResponseData(res, 'При добавлении фильма в избанное произошла ошибка. Попробуйте еще раз.')
    );
};

const removeFilmFaved = async (id) => {
    return fetch(`${URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) =>
        getResponseData(res, 'При удалении фильма из избранного произошла ошибка. Попробуйте еще раз.')
    );
};

export {
    getResponseData,
    register,
    login,
    checkToken,
    logout,
    getUserInfo,
    updateUserInfo,
    getFilms,
    addFilmFaved,
    removeFilmFaved
};
