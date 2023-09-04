import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../../utils/MainApi';
import { useState } from 'react';
// import { _, _ } from ''../../utils/shemas;
import Page from '../../components/Page/Page';
import Logo from '../../components/Logo/Logo';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import './Auth.css';

export default function Auth({ setIsLogin }) {
    const { pathname } = useLocation();

    return (
        <>
            <MainStyleFlex>
                <Page>
                    <section className="auth" aria-label="Вход">
                        <Logo />
                        <h1 className="auth__title">{pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
                        <form className="auth__form">
                            {pathname === '/signup' && (
                                <label className="auth__label">
                                    Имя
                                    <input
                                        type="text"
                                        min="3"
                                        max="15"
                                        name="name"
                                        required="required"
                                        placeholder="Самое_лучшее_имя"
                                        className="auth__input"
                                        autoComplete="on" />
                                </label>
                            )}
                            <label className="auth__label">
                                E-mail
                                <input
                                    type="email"
                                    name="email"
                                    required="required"
                                    placeholder="JhonDoe@yandex.ru"
                                    className="auth__input"
                                    autoComplete="on" />
                            </label>
                            <label className="auth__label">
                                Пароль
                                <input
                                    type="password"
                                    min="6"
                                    max="20"
                                    name="password"
                                    required="required"
                                    placeholder="***********"
                                    className="auth__input"
                                    autoComplete="on" />
                                {pathname === '/signin' && <span className="auth__error">Что-то пошло не так...</span>}
                            </label>

                            <div className="auth__buttons-wrapper">
                                <button type="submit" className="auth__button button">
                                    {pathname === '/signin' ? 'Войти' : 'Зарегистрироваться'}
                                </button>
                                <div className="auth__link-wrapper">
                                    <span className="auth__question">
                                        {pathname === '/signin' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                                    </span>
                                    <Link className="auth__link link" to={pathname === '/signin' ? '/signup' : '/signin'}>
                                        {pathname === '/signin' ? 'Регистрация' : 'Войти'}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </section>
                </Page>
            </MainStyleFlex>
        </>
    );
}