import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Page from '../../components/Page/Page';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import { filterMovies, filterShortMovies } from '../../utils/utils';

export default function SavedMovies({
    savedMovies,
    onRemoveMovie,
}) {
    const [searchRequest, setSearchRequest] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [shortMovies, setShortMovies] = useState(false);

    function searchAndFilterMovies(request) {
        setSearchRequest(request);
    }

    function handleShortMovieToggle() {
        setShortMovies(!shortMovies);
    }

    useEffect(() => {
        if (filteredMovies.length === 0) {
            setNotFound(true);
        } else {
            setNotFound(false);
        }
    }, [filteredMovies]);

    useEffect(() => {
        const movieList = filterMovies(savedMovies, searchRequest);
        setFilteredMovies(shortMovies ? filterShortMovies(movieList) : movieList);
    }, [savedMovies, shortMovies, searchRequest]);

    return (
        <>
            <Header isLogin />

            <MainStyleFlex>
                <Page>
                    <SearchForm
                        onFilterMovies={handleShortMovieToggle}
                        searchAndFilterMovies={searchAndFilterMovies}
                        filteredMovies={filteredMovies}
                        notFound={notFound} />

                    <MoviesCardList
                        movies={filteredMovies}
                        isSavedMovies={true}
                        savedMovies={savedMovies}
                        onRemoveMovie={onRemoveMovie}
                        notFound={notFound} />

                </Page>
            </MainStyleFlex>
            <Footer />
        </>
    );
}
