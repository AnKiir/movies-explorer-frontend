import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from '../../pages/Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../../pages/Profile/Profile';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Error404 from '../../pages/Error404/Error404';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import './App.css';
import * as mainApi from '../../utils/MainApi';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preLoader, setPreLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  // регистрация
  function handleRegistration({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipOpen(true);
      });
  }

  // авторизация
  function handleAuthorization({ email, password }) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          navigate('/movies', { replace: true });
          setIsLogin(true);
          setIsSuccess(true);
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipOpen(true)
      })
      .finally(() => {
        setPreLoader(false);
      });
  }

  // обновление профиля
  function handlePatchProfile(newProfileInfo) {
    mainApi
      .patchProfileInfo(newProfileInfo)
      .then((data) => {
        setCurrentUser(data);
        setIsSuccess(true);
        setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleAuthorizationError(err) {
    if (err === 'Error: 401') {
      handleLogOut();
    }
  }

  function closeInfoTooltip() {
    setIsInfoToolTipOpen(false);
  }

  // лайк фильма
  function handleLikeMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  // убираем лайк с фильма
  function handleRemoveMovie(movie) {
    mainApi
      .removeMovie(movie._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
        setIsSuccess(false);
        setIsInfoToolTipOpen(true)
      });
  }

  // псевдо логаут
  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.clear();
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('movieSearch');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('isLogin');
    navigate('/');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUsersContent(jwt)
        .then((res) => {
          localStorage.removeItem('allMovies');
          setIsLogin(true);
          navigate(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('shortMovies');
    const jwt = localStorage.getItem('jwt');
    if (isLogin && jwt) {
      Promise.all([mainApi.getProfileInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser({ name: user.name, email: user.email });
          setSavedMovies(movies.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogin]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/">
          <Route index element={<Main isLogin={isLogin} />} />
          <Route
            path="movies"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                element={Movies}
                handleLikeMovie={handleLikeMovie}
                onRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
              />}
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                element={SavedMovies}
                handleLikeMovie={handleLikeMovie}
                onRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
              />}
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                element={Profile}
                logOut={handleLogOut}
                onUpdateProfile={handlePatchProfile} />} />
          <Route
            path="signin"
            element={
              isLogin ? (<Navigate to='/movies' replace />) : <Login preLoader={preLoader} onAuthorization={handleAuthorization} />
            } />
          <Route
            path="signup"
            element={
              isLogin ? (<Navigate to='/movies' replace />) : <Register preLoader={preLoader} onRegister={handleRegistration} />
            } />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

      <InfoTooltip
        textIsSuccessTrue={"Успешно"}
        textIsSuccessFalse={"Что-то пошло не так! Попробуйте ещё раз."}
        isSuccess={isSuccess}
        isOpen={isInfoToolTipOpen}
        onClose={closeInfoTooltip}
      />

    </CurrentUserContext.Provider>
  );
}
