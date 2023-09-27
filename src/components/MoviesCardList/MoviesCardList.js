import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../../components/Preloader/Preloader';
import {
  PC_DISPLAY,
  TABLET_DISPLAY,
  PC_SCREEN,
  TABLET_SCREEN,
  MOBILE_SCREEN,
  NEXT_PC_SCREEN_MOVIES,
  NEXT_TABLET_SCREEN_MOVIES,
  NEXT_MOBILE_SCREEN_MOVIES,
} from '../../utils/const';


export default function MoviesCardList({
  movies,
  isSavedMovies,
  savedMovies,
  handleLikeMovie,
  onRemoveMovie,
  preLoader,
}) {

  const { pathname } = useLocation();
  const [displayedMovies, setDisplayedMovies] = useState(0);

  // список сохранённых
  function getMovieFromSaved(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.id === movie.id);
  }

  function setDisplayedMoviesCount() {
    const display = window.innerWidth;
    if (display > PC_DISPLAY) {
      setDisplayedMovies(PC_SCREEN);
    } else if (display > TABLET_DISPLAY) {
      setDisplayedMovies(TABLET_SCREEN);
    } else {
      setDisplayedMovies(MOBILE_SCREEN);
    }
  }

  function expandMoviesDisplay() {
    const display = window.innerWidth;
    if (display > PC_DISPLAY) {
      setDisplayedMovies(displayedMovies + NEXT_PC_SCREEN_MOVIES);
    } else if (display > TABLET_DISPLAY) {
      setDisplayedMovies(displayedMovies + NEXT_TABLET_SCREEN_MOVIES);
    } else {
      setDisplayedMovies(displayedMovies + NEXT_MOBILE_SCREEN_MOVIES);
    }
  }

  useEffect(() => {
    let resizeTimeout;

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDisplayedMoviesCount();
      }, 100);
    }
    setDisplayedMoviesCount();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setDisplayedMoviesCount();
  }, [movies]);

return (
    <section className='movies-card-list'>
      {preLoader && <Preloader />}
      {!preLoader && (
        <>
          {pathname === '/saved-movies' ? (
            <ul className='movies-card-list__list list'>
              {movies.map((movie) => {
                return (
                  <MoviesCard
                    key={isSavedMovies ? movie._id : movie.id}
                    saved={getMovieFromSaved(savedMovies, movie)}
                    movies={movies}
                    movie={movie}
                    handleLikeMovie={handleLikeMovie}
                    isSavedMovies={isSavedMovies}
                    onRemoveMovie={onRemoveMovie}
                    savedMovies={savedMovies}
                  />
                );
              })}
            </ul>
          ) : (
            <>
              <ul className='movies-card-list__list list'>
                {movies.slice(0, displayedMovies).map((movie) => {
                  return (
                    <MoviesCard
                      key={isSavedMovies ? movie._id : movie.id}
                      saved={getMovieFromSaved(savedMovies, movie)}
                      movies={movies}
                      movie={movie}
                      handleLikeMovie={handleLikeMovie}
                      isSavedMovies={isSavedMovies}
                      onRemoveMovie={onRemoveMovie}
                      savedMovies={savedMovies}
                    />
                  );
                })}
              </ul>
              {movies.length > displayedMovies ? (
                <button
                  onClick={expandMoviesDisplay}
                  className={`movies-card-list__button${
                    pathname === '/saved-movies' ? '_hidden' : ''
                  }`}
                  type='button'
                >
                  Ещё
                </button>
              ) : (
                ''
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
