import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { getMovies } from '../../utils/MoviesApi';
import ErrorField from '../ErrorField/ErrorField';
import Preloader from '../Preloader/Preloader';
import clsx from 'clsx';
import './SearchForm.css';

export default function SearchForm({
    handleSetMovies,
    handleCheckShortMovies,
    checkShortMovies,
    checkShortMoviesSaved,
    setNotFound,
    setServerError,
    handleSetCount,
    limit,
}) {
    const { pathname } = useLocation();
    
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
        if (pathname === '/movies') {
            setIsLoading(true);
            getMovies()
                .then((res) => {
                    const movies = res.filter((movie) => {
                       return movie.nameRU.includes(inputValue)});
                    localStorage.setItem('movies', JSON.stringify(movies));

                    localStorage.setItem('queryMovies', inputValue);
                    localStorage.setItem('isShortMovies', checkShortMovies);
                })
                .then(() => {
                    // handleSetMovies(data.queryMovies);
                    setNotFound(true);
                    setIsLoading(false);
                    handleSetCount(limit);
                })
                .catch((err) => {
                    setServerError(err);
                    setIsLoading(false);
                });
        } else {
            // handleSetMovies(data.queryMovies);
            setNotFound(true);
        }
    };

    // useEffect(() => {
    //     setValue('queryMovies', pathname === '/movies' ? localStorage.getItem('queryMovies') : '');
    // }, [pathname]);

    return (
        <>
            <section className="search-form" aria-label="Поиск по картотеке фильмов">
                <form
                    className="search-form__form"
                    onSubmit={onSubmit}
                >
                    <div className="search-form__search-wrapper">
                        <input
                            value={inputValue}
                            onChange={handleInputChange}
                            type="text"
                            // className="search-form__input"
                            className={clsx('search-form__input')}
                            name="movie-name"
                            required="required"
                            placeholder="Фильм" />
                        <button type="submit"
                            className="search-form__button button"
                        // onSubmit={handleSubmit(onSubmit)}
                        />
                        {/* <ErrorField isActive={errors.queryMovies}>
                            {errors.queryMovies ? errors.queryMovies.message : 'ОК'}
                        </ErrorField> */}
                    </div>
                    <label className="search-form__label-tumbler">
                        <input
                            type="checkbox"
                            name="checkbox"
                            className="search-form__tumbler"
                            onChange={() => handleCheckShortMovies(('queryMovies'))}
                            checked={pathname === '/movies' ? checkShortMovies : checkShortMoviesSaved} />
                        <span className="search-form__text-tumbler">Короткометражки</span>
                    </label>
                </form>
            </section>
            {isLoading && createPortal(<Preloader />, document.body)}
        </>
    );
}
