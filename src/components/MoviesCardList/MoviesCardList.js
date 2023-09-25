import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import ErrorField from '../ErrorField/ErrorField';
import './MoviesCardList.css';
// import Preloader from '../../components/Preloader/Preloader';

export default function MoviesCardList({
  movies,
  getMoviesHandler,
  moviesSavedSearch,
  moviesSaved,
  count,
  handleSetCount,
  limit,
  isNotFound,
  serverError
}) {
  const { pathname } = useLocation();
  const [moviesLimit, setMoviesLimit] = useState([]);
  const [isLastCardsRow, setIsLastCardsRow] = useState(false);

  const findLastCardsRow = () => {
    if (count >= movies.length) {
      setIsLastCardsRow(true);
    } else {
      setIsLastCardsRow(false);
    }
  };

  const renderCards = () => {
    setMoviesLimit(movies.slice(0, count));
    findLastCardsRow();
  };

  // то самое ещё
  const getMoreMovies = () => {
    handleSetCount(count + limit);
  };

  useEffect(() => {
    renderCards();
  }, [count]);

  useEffect(() => {
    renderCards();
  }, [movies]);

  return (
    <section className="movies-card-list" aria-label="Картотека фильмов">
      {serverError && <ErrorField isActive>{serverError}</ErrorField>}
      {pathname === '/movies' && !!moviesLimit.length && (
        <>
          <ul className="movies-card-list__list list">
            {moviesLimit.map((movie) => (
              <li key={movie.id}>
                <MoviesCard movie={movie} getMoviesHandler={getMoviesHandler} />
              </li>
            ))}
          </ul>

          {pathname === '/movies' && !isLastCardsRow && (
            <button
              type="button"
              className="movies-card-list__button button"
              onClick={getMoreMovies}>
              Ещё
            </button>
          )}
        </>

      )}
      {pathname === '/movies' && !moviesLimit.length && isNotFound && (
        <p className="movies-card-list__text-nothing">По запросу ничего не найдено</p>
      )}

      {pathname === '/saved-movies' && (
        <ul className="movies-card-list__list list">
          {!!moviesSavedSearch.length
            ? moviesSavedSearch.map((movie) => (
              <li key={movie.movieId}>
                <MoviesCard movie={movie} isLike getMoviesHandler={getMoviesHandler} />
              </li>
            ))
            : !isNotFound &&
            moviesSaved.map((movie) => (
              <li key={movie.movieId}>
                <MoviesCard movie={movie} isLike getMoviesHandler={getMoviesHandler} />
              </li>
            ))}
        </ul>
      )}

      {pathname === '/saved-movies' && !moviesSavedSearch.length && isNotFound && (
        <p className="movies-card-list__text-nothing">По запросу ничего не найдено</p>
      )}

    </section>
  );
}
