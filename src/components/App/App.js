import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfo, checkToken, logout } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from '../../pages/Main/Main';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import Movies from '../../pages/Movies/Movies';
import Error404 from '../../pages/Error404/Error404';
import './App.css';

export default function App() {

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [serverError, setServerError] = useState('');

  const getUserInfoHandler = () => {
    if (isLogin) {
      getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          setServerError(err);
        });
    }
  };

  const clearData = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('films');
    localStorage.removeItem('isLogin');
    setIsLogin(false);
    navigate('/');
  };

  const closeProfile = () => {
    if (pathname === '/profile') {
      logout()
        .then(() => {
          clearData();
        })
        .catch((err) => {
          setServerError(err);
        });
    } else {
      clearData();
    }
  };

  // объединить?
  useEffect(() => {
    getUserInfoHandler();
  }, [isLogin]);


  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      checkToken()
        .then(() => {
          setIsLogin(true);
        })
        .catch((err) => {
          setServerError(err);
          closeProfile();
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/">
          <Route
            index element={<Main isLogin={isLogin} />} />
          <Route path="movies" element={
            <ProtectedRoute
              isLogin={isLogin}
              element={Movies} />} />
          <Route path="saved-movies" element={
            <ProtectedRoute
              isLogin={isLogin}
              element={Movies} />} />
          <Route path="profile" element={
            <ProtectedRoute
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              getUserInfoHandler={getUserInfoHandler}
              exitProfile={closeProfile}
              element={Profile} />} />
          <Route path="signin" element={
            isLogin && pathname === '/signin' ? navigate(-1) : <Auth setIsLogin={setIsLogin} />} />
          <Route path="signup" element={
            isLogin && pathname === '/signup' ? navigate(-1) : <Auth setIsLogin={setIsLogin} />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
      {serverError}
    </CurrentUserContext.Provider>
  );
}
