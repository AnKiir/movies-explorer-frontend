import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Switch from '../Switch/Switch';
import './SearchForm.css';

export default function SearchForm({
    shortMovies,
    searchAndFilterMovies,
    onFilterMovies,
    notFound,
}) {
    const location = useLocation();
    const [searchRequest, setSearchRequest] = useState('');
    const [searchError, setSearchError] = useState(false);

    function onSubmitForm(e) {
        e.preventDefault();
        if (searchRequest.trim().length === 0) {
            setSearchError(true);
        } else {
            setSearchError(false);
            searchAndFilterMovies(searchRequest);
        }
    }

    function handleChangeInput(e) {
        setSearchRequest(e.target.value);
    }

    useEffect(() => {
        if (
            localStorage.getItem('movieSearch') &&
            location.pathname === '/movies'
        ) {
            const localSearchRequest = localStorage.getItem('movieSearch');
            setSearchRequest(localSearchRequest);
        }
    }, [location]);

    return (
        <>
            <section className="search-form" aria-label="Поиск по картотеке фильмов">
                <form
                    className="search-form__form"
                    onSubmit={onSubmitForm}
                    noValidate>

                    <div className="search-form__search-wrapper">
                        <input
                            value={searchRequest || ''}
                            onChange={handleChangeInput}
                            type="text"
                            className="search-form__input"
                            name="movie-name"
                            required
                            placeholder="Фильм" />
                        <button type="submit"
                            className="search-form__button button" />

                        {searchError ? (
                            <span className='search__error'>Нужно ввести ключевое слово!</span>
                        ) : notFound ? (
                            <span className='search__error'>Ничего не найдено!</span>
                        ) : (
                            ''
                        )}
                    </div>
                    
                    <Switch
                        shortMovies={shortMovies}
                        onFilterMovies={onFilterMovies} />

                </form>
            </section>
        </>
    );
}
