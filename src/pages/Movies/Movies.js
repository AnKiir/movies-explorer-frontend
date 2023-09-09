import { useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import { useLocation } from 'react-router-dom';
import { getFilms } from '../../utils/MainApi';
import { searchFilms } from '../../utils/search';

import Header from '../../components/Header/Header';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import SearchForm from '../../components/SearchForm/SearchForm';
// резерв под ожидание во время поиска, Modal
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

export default function Movies() {
    return (
        <>
            <Header isLogin />
            <MainStyleFlex>
                <SearchForm />
                <MoviesCardList />
            </MainStyleFlex>
            <Footer />
        </>
    );
}
