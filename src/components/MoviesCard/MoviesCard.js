import { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { saveMovie, removeMovie } from '../../utils/MainApi';
import Modal from '../Modal/Modal';
import clsx from 'clsx';
import './MoviesCard.css';

export const MoviesCard = memo(({ movie, getMoviesHandler }) => {
  const { pathname } = useLocation();

  const { image, nameRU, duration, trailerLink, country, director, year, description, nameEN, id, movieId } = movie;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const [isLike, setIsLike] = useState(movie.isLike);
  const [serverError, setServerError] = useState('');

  const like = () => {
    if (!isLike) {
      saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: id,
      })
        .then(() => {
          setIsLike(true);
          getMoviesHandler();
        })
        .catch((err) => {
          setServerError(err);
        });
    } else {
      removeMovie(pathname === '/saved-movies' ? movieId : id)
        .then(() => {
          setIsLike(false);
          getMoviesHandler();
        })
        .catch((err) => {
          setServerError(err);
        });
    }
  };

  return (
    <article className="movies-card">
      <Link className="movies-card__link link" to={trailerLink} target="_blank">
        <img
          className="movies-card__image"
          src={pathname === '/saved-movies' ? image : `https://api.nomoreparties.co${image.url}`}
          alt={nameRU}
        />
      </Link>
      <div className="movies-card__container-info">
        <div className="movies-card__flex-wrapper">
          <h2 className="movies-card__name">{nameRU}</h2>
          {pathname === '/saved-movies' ? (
            <button onClick={like}
              className="movies-card__delete-button button"
              type="button"></button>
          ) : (
            <button onClick={like}
              className="movies-card__like-button button"
              type="button">
              <span
                className={clsx(
                  'movies-card__like-button-icon',
                  isLike && 'movies-card__like-button-icon_active'
                )}
              ></span>
            </button>
          )}
        </div>
        <p className="movies-card__duration">
          {!!hours && `${hours}ч`} {`${minutes}м`}
        </p>
      </div>
      {serverError && <Modal>{serverError}</Modal>}
    </article>
  );
});
