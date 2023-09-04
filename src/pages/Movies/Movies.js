import { useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';

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
