import { Link } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import './Auth.css';

export default function Auth({ type }) {
    return (
        <>
            <MainStyleFlex>
                <Page>
                    <section className="auth" aria-label="Вход">
                        <Logo />
                        <h1 className="auth__title">{type === 'signin' ? 'Рады видеть!' : 'Добро пожаловать!'}</h1>
                        <form className="auth__form">
                            {type !== 'signin' && (
                                <label className="auth__label">
                                    Имя
                                    <input
                                        type="text"
                                        name="name"
                                        className="auth__input" />
                                </label>
                            )}
                            <label className="auth__label">
                                E-mail
                                <input
                                    type="email"
                                    name="email"
                                    className="auth__input" />
                            </label>
                            <label className="auth__label">
                                Пароль
                                <input
                                    type="password"
                                    name="password"
                                    className="auth__input" />
                                {type !== 'signin' && <span className="auth__error">Что-то пошло не так...</span>}
                            </label>
                            <div className="auth__buttons-wrapper">
                                <button type="submit" className="auth__button button">
                                    {type === 'signin' ? 'Войти' : 'Зарегистрироваться'}
                                </button>
                                <div className="auth__link-wrapper">
                                    <span className="auth__question">
                                        {type === 'signin' ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?'}
                                    </span>
                                    <Link className="auth__link link" to={type === 'signin' ? '/signup' : '/signin'}>
                                        {type === 'signin' ? 'Регистрация' : 'Войти'}
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </section>
                </Page>
            </MainStyleFlex>
            <Footer />
        </>
    );
}