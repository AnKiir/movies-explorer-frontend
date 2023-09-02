import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Main from '../../pages/Main/Main';
import Auth from '../../pages/Auth/Auth';
import Profile from '../../pages/Profile/Profile';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Error404 from '../../pages/Error404/Error404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="movies" element={<Movies />} />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signin" element={<Auth type="signin" />} />
          <Route path="signup" element={<Auth type="signup" />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
