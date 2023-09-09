import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login, registerIn } from '../../utils/MainApi';
import { registerSchema, loginSchema } from '../../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Page from '../../components/Page/Page';
import Logo from '../../components/Logo/Logo';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import ErrorField from '../../components/ErrorField/ErrorField';
import './Auth.css';

export default function Auth({ setIsLogin }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ resolver: yupResolver(pathname === '/signin' ? loginSchema : registerSchema) });

    const onSubmit = (data) => {
        if (pathname === '/signin') {
            if (data.name) {
                delete data.name;
            }

            login(data)
                .then(() => {
                    setIsLogin(true);
                    localStorage.setItem('isLogin', true);
                    navigate('/movies');
                })
                .catch((err) => setServerError(err));
        } else {
            registerIn(data)
                .then(() =>
                    login({ email: data.email, password: data.password })
                        .then(() => {
                            setIsLogin(true);
                            localStorage.setItem('isLogin', true);
                            navigate('/movies');
                        })
                        .catch((err) => setServerError(err))
                )
                .catch((err) => setServerError(err));
        }
    };

    return (
        <>
            <MainStyleFlex>
                <Page>
                    <section className="auth" aria-label="Вход">
                        <Logo />
                        <h1 className="auth__title">{pathname === '/signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
                        <form className="auth__form"
                            onSubmit={handleSubmit(onSubmit)}>
                            {pathname === '/signup' && (
                                <>
                                    <label className="auth__label">
                                        Имя
                                        <input {...register('name')}
                                            type="text"
                                            min="3"
                                            max="15"
                                            name="name"
                                            required="required"
                                            placeholder="Самое_лучшее_имя"
                                            className="auth__input"
                                            autoComplete="on" />
                                    </label>
                                    <ErrorField isActive={errors.name}>
                                        {errors.name ? errors.name.message : 'Ошибок нет'}
                                    </ErrorField>
                                </>
                            )}

                            <label className="auth__label">
                                E-mail
                                <input {...register('email')}
                                    type="email"
                                    name="email"
                                    required="required"
                                    placeholder="JhonDoe@yandex.ru"
                                    className="auth__input"
                                    autoComplete="on" />
                            </label>
                            <ErrorField isActive={errors.email}>
                                {errors.email ? errors.email.message : 'Ошибок нет'}
                            </ErrorField>

                            <label className="auth__label">
                                Пароль
                                <input {...register('password')}
                                    type="password"
                                    min="6"
                                    max="20"
                                    name="password"
                                    required="required"
                                    // placeholder="***********"
                                    className="auth__input"
                                    autoComplete="on" />
                            </label>
                            <ErrorField isActive={errors.password}>
                                {errors.password ? errors.password.message : 'Ошибок нет'}
                            </ErrorField>

                            <div className="auth__buttons-wrapper">
                                {serverError && <ErrorField isActive>{serverError}</ErrorField>}
                                <button type="submit"
                                    disabled={!isValid}
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