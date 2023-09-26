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
import Error404 from '../../pages/Error404/Error404';
import './App.css';
import * as mainApi from '../../utils/MainApi';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);
  // const [savedMovies, setSavedMovies] = useState([]);

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
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // обновление профиля
  function handlePatchProfile(newProfileInfo) {
    mainApi
      .patchProfileInfo(newProfileInfo)
      .then((data) => {
        setCurrentUser(data);
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

  // лайк фильма
  // function handleLikeMovie(movie) {
  //   mainApi
  //     .saveMovie(movie)
  //     .then((newMovie) => {
  //       setSavedMovies([newMovie, ...savedMovies]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       handleAuthorizationError(err);
  //     });
  // }

  // убираем лайк с фильма
  // function handleRemoveMovie(movie) {
  //   mainApi
  //     .removeMovie(movie._id)
  //     .then(() => {
  //       setSavedMovies((state) =>
  //         state.filter((item) => item._id !== movie._id)
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       handleAuthorizationError(err);
  //     });
  // }

  // псевдо логаут
  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.clear();
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('queryMovies');
    localStorage.removeItem('moviesSaved');
    localStorage.removeItem('isShortMovies');
    navigate('/');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUsersContent(jwt)
        .then((res) => {
          localStorage.removeItem('queryMovies');
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
      Promise.all([mainApi.getProfileInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser({ name: user.name, email: user.email });
          // setSavedMovies(movies.reverse());
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
                // handleLikeMovie={handleLikeMovie}
                // onRemoveMovie={handleRemoveMovie}
                // savedMovies={savedMovies} 
                />} 
                />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute
                isLogin={isLogin}
                element={Movies}
                // handleLikeMovie={handleLikeMovie}
                // onRemoveMovie={handleRemoveMovie}
                // savedMovies={savedMovies} 
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
              isLogin ? (<Navigate to='/movies' replace />) : <Login onAuthorization={handleAuthorization} />
            } />
          <Route
            path="signup"
            element={
              isLogin ? (<Navigate to='/movies' replace />) : <Register onRegister={handleRegistration} />
            } />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}
