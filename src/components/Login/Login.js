import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Logo from '../../components/Logo/Logo';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import ErrorField from '../../components/ErrorField/ErrorField';
import useForm from '../../hooks/useForm';
import '../../pages/Auth/Auth.css';

export default function Login({ onAuthorization }) {
    const { enteredValues, isError, isFormValid, handleChangeInput } = useForm();
    const { pathname } = useLocation();

    function onSubmitLoginForm(e) {
        e.preventDefault();

        onAuthorization({
            email: enteredValues.email,
            password: enteredValues.password,
        });
    }

    return (
        <>
            <MainStyleFlex>
                <Page>
                    <section className="auth" aria-label="Вход">
                        <Logo />
                        <h1 className="auth__title">Рады видеть!</h1>
                        <form className="auth__form"
                            onSubmit={onSubmitLoginForm}>

                            <label className="auth__label">
                                E-mail
                                <input
                                    type="email"
                                    name="email"
                                    required="required"
                                    placeholder="JhonDoe@yandex.ru"
                                    className="auth__input"
                                    pattern="\w+@\w+\.\w+"
                                    autoComplete="on"
                                    value={enteredValues.email || ''}
                                    onChange={handleChangeInput} />
                            </label>
                            <ErrorField isActive={isError.email}></ErrorField>

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
                                    autoComplete="on"
                                    value={enteredValues.password || ''}
                                    onChange={handleChangeInput} />
                            </label>
                            <ErrorField isActive={isError.password}></ErrorField>

                            <div className="auth__buttons-wrapper">
                                <button type="submit"
                                    disabled={!isFormValid}
                                    className="auth__button button">
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
