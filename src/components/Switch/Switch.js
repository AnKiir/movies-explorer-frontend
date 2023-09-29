import React from 'react';
import '../SearchForm/SearchForm.css';

export default function Switch({ onFilterMovies, shortMovies }) {
    return (
        <label className='search-form__label-tumbler'>
            <input
                type='checkbox'
                name='checkbox'
                id='checkbox'
                className='search-form__tumbler'
                required
                onChange={onFilterMovies}
                checked={shortMovies}
            />
            <label className='search-form__text-tumbler'>Короткометражки</label>
        </label>
    );
}
