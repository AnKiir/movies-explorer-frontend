import { useResize } from '../../hooks/useResize';
import { Hartya } from '../../utils/const';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesCardList.css';

export default function MoviesCardList({ type }) {
    const { isMediumScreen, isSmallScreen } = useResize();
    const limit = isSmallScreen ? 5 : isMediumScreen ? 8 : 16;
    const copyMovies = Hartya.slice(0, limit);
  
    return (
      <section className="movies-card-list" aria-label="Картотека фильмов">
          <ul className="movies-card-list__list list">
            {copyMovies.map((film, id) => {
              return type !== 'save' ? (
                <li key={id}>
                  <MovieCard film={film} />
                </li>
              ) : (
                film.isLike && (
                  <li key={id}>
                    <MovieCard film={film} type={type} />
                  </li>
                )
              );
            })}
          </ul>
          {type !== 'save' && (
            <button type="button" className="movies-card-list__button button">
              Ещё
            </button>
          )}
      </section>
    );
  }
  