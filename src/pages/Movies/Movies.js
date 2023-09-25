import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';
import { searchMovies } from '../../utils/search';
import { getMovies } from '../../utils/MainApi';
import Header from '../../components/Header/Header';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
// import * as movies from '../../utils/MoviesApi';

export default function Movies() {
    const { pathname } = useLocation();
    const [movies, setMovies] = useState([]);
    const [checkShortMovies, setCheckShortMovies] = useState(
        JSON.parse(localStorage.getItem('isShortMovies')) || false);
    const [checkShortMoviesSaved, setCheckShortMoviesSaved] = useState(false);
    const [queryMoviesSaved, setQueryMoviesSaved] = useState('');
    const [moviesWithMoviesSaved, setMoviesWithMoviesSaved] = useState([]);
    const [moviesSaved, setMoviesSaved] = useState([]);
    const [moviesSavedSearch, setMoviesSavedSearch] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [serverError, setServerError] = useState('');
    const [serverErrorModal, setServerErrorModal] = useState('');
    const { isMediumScreen, isLargeScreen } = useResize();
    const limit = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;
    const [count, setCount] = useState(limit);

    const handleSetCount = (count) => {
        setCount(count);
    };

    const getMoviesHandler = () => {
        getMovies()
            .then((moviesSaved) => {
                if (movies) {
                    setMoviesWithMoviesSaved(
                        movies.map((movie) => ({
                            ...movie,
                            isLike: moviesSaved.some((savedMovie) => savedMovie.movieId === movie.id),
                        }))
                    );
                    setMoviesSaved(moviesSaved.map((movie) => ({ ...movie, isLike: true })));
                }
            })
            .catch((err) => {
                setServerErrorModal(err);
            });
    };

    const handleSetMovies = (query) => {
        let moviesData;
        if (pathname === '/movies') {
            moviesData = JSON.parse(localStorage.getItem('movies'));
            const searchMoviesData = searchMovies(moviesData, query, checkShortMovies, false);
            setMovies(searchMoviesData);
        } else {
            moviesData = JSON.parse(localStorage.getItem('moviesSaved'));
            const searchMoviesData = searchMovies(moviesData, query, false, checkShortMoviesSaved);
            setMoviesSavedSearch(searchMoviesData);
        }
    };

    const handleCheckShortMovies = (query) => {
        if (pathname === '/movies') {
            localStorage.setItem('queryMovies', query);
            localStorage.setItem('isShortMovies', !checkShortMovies);
            setCheckShortMovies(!checkShortMovies);
        } else {
            handleSetMovies(query);
            setQueryMoviesSaved(query);
            setCheckShortMoviesSaved(!checkShortMoviesSaved);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('queryMovies')) {
            handleSetMovies(localStorage.getItem('queryMovies') || null);
            setNotFound(true);
        }
    }, [checkShortMovies]);

    useEffect(() => {
        handleSetMovies(queryMoviesSaved);
    }, [checkShortMoviesSaved]);

    useEffect(() => {
        getMoviesHandler();
    }, [movies]);

    useEffect(() => {
        localStorage.setItem('moviesSaved', JSON.stringify(moviesSaved));
        if (pathname === '/saved-movies') {
            handleSetMovies(queryMoviesSaved);
        }
    }, [moviesSaved]);

    useEffect(() => {
        if (pathname === '/movies') {
            handleSetMovies(localStorage.getItem('queryMovies'));
        }
        if (pathname === '/saved-movies') {
            handleSetMovies('');
        }
    }, [pathname]);

    useEffect(() => {
        if (!localStorage.getItem('movies')) {
            localStorage.setItem('movies', JSON.stringify([]));
        }
        if (!localStorage.getItem('moviesSaved')) {
            localStorage.setItem('moviesSaved', JSON.stringify([]));
        }
    }, []);


    return (
        <>
            <Header isLogin />

            <MainStyleFlex>

                <SearchForm
                    handleSetMovies={handleSetMovies}
                    handleCheckShortMovies={handleCheckShortMovies}
                    checkShortMovies={checkShortMovies}
                    checkShortMoviesSaved={checkShortMoviesSaved}
                    setServerError={setServerError}
                    handleSetCount={handleSetCount}
                    limit={limit}
                    setNotFound={setNotFound} />

                <MoviesCardList
                    moviesSavedSearch={moviesSavedSearch}
                    moviesSaved={moviesSaved}
                    movies={moviesWithMoviesSaved}
                    getMoviesHandler={getMoviesHandler}
                    handleSetCount={handleSetCount}
                    serverError={serverError}
                    limit={limit}
                    count={count}
                    notFound={notFound} />

            </MainStyleFlex>
            <Footer />
            {serverErrorModal && <Modal>{serverErrorModal}</Modal>}
        </>
    );
}

