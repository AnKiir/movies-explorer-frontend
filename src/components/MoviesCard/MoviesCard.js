import React from 'react';
import { durationMovieConverter } from '../../utils/utils';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import './MoviesCard.css';

export default function MoviesCard({
  movie,
  isSavedMovies,
  savedMovies,
  saved,
  handleLikeMovie,
  onRemoveMovie,
}) {

  function onRemove() {
    onRemoveMovie(movie);
  }

  function onMovieClick() {
    if (saved) {
      onRemoveMovie(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      handleLikeMovie(movie);
    }
  }

  return (
    <article className="movies-card">
      <Link className="movies-card__link link">
        <img
          onClick={(e) => window.open(`${movie.trailerLink}`, '_blank')}
          className='movies-card__image'
          src={
            isSavedMovies
              ? movie.image
              : `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={`Обложка фильма: ${movie.nameRU}`}
        />
      </Link>
      <div className="movies-card__container-info">
        <div className="movies-card__flex-wrapper">

          <h2 className="movies-card__name">{movie.nameRU}</h2>
          {isSavedMovies ? (
            <button
              className="movies-card__delete-button button"
              onClick={onRemove}
              type='button'></button>
          ) : (
            <button
              className="movies-card__like-button button"
              onClick={onMovieClick}
              type="button"
            ><span
              className={clsx(
                'movies-card__like-button-icon',
                saved && 'movies-card__like-button-icon_active'
              )}
            ></span></button>
          )}
        </div>

        <p className="movies-card__duration">
          {durationMovieConverter(movie.duration)}
        </p>

      </div>
    </article>
  );
};
