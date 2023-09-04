import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import Main from '../../pages/Main/Main';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Error404 from '../../pages/Error404/Error404';

export default function App() {

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [serverError, setServerError] = useState('');

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="movies" element={<ProtectedRoute isLogin={isLogin} element={Movies} />} />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signin" element={<Auth type="signin" />} />
          <Route path="signup" element={<Auth type="signup" />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}
