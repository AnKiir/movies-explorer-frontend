import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../../components/Page/Page';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import './Error404.css';

export default function PageNotFoud() {

    return (
            <MainStyleFlex>
                <section className="error404" aria-label="Страница 404">
                    <Page>
                        <h1 className="error404__title">404</h1>
                        <p className="error404__text">Страница не найдена</p>
                        <Link
                            to={'/'}
                            className="error404__button button">
                            Назад
                        </Link>
                    </Page>
                </section>
            </MainStyleFlex>
    );
}
