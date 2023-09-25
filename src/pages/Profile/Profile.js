import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../../components/Header/Header';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import Page from '../../components/Page/Page';
import useForm from '../../hooks/useForm';
import clsx from 'clsx';
import './Profile.css';

export default function Profile({ isLoggedIn, logOut, onUpdateProfile }) {
    const { enteredValues, isError, isFormValid, handleChangeInput, resetForm } = useForm();
    const currentUser = useContext(CurrentUserContext);
    const [lastDetails, setLastDetails] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    function onSubmitUserForm(e) {
        e.preventDefault();
        onUpdateProfile({
            name: enteredValues.name,
            email: enteredValues.email,
        });
    }

    useEffect(() => {
        if (
            currentUser.name === enteredValues.name &&
            currentUser.email === enteredValues.email
        ) {
            setLastDetails(true);
        } else {
            setLastDetails(false);
        }
    }, [enteredValues]);

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm]);

    return (
        <>
            <Header isLogin />
            <MainStyleFlex>
                <section className="profile" aria-label="Профиль">
                    <Page>
                        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                        <form className="profile__form" onSubmit={onSubmitUserForm} noValidate>
                            <div>
                                <label className={clsx('profile__label', isDisabled && 'profile__label_disabled')}>
                                    <span className="profile__label-text">Имя</span>
                                    <input
                                        type="text"
                                        className="profile__input"
                                        name="name"
                                        autoComplete="off"
                                        placeholder={currentUser.name}
                                        value={enteredValues.name || ''}
                                        onChange={handleChangeInput} />
                                </label>
                                <label className={clsx('profile__label', isDisabled && 'profile__label_disabled')}>
                                    <span className="profile__label-text">E-mail</span>
                                    <input
                                        type="text"
                                        className="profile__input"
                                        name="email"
                                        autoComplete="off"
                                        placeholder={currentUser.email}
                                        value={enteredValues.email || ''}
                                        onChange={handleChangeInput}
                                    />
                                </label>
                            </div>
                            <div className="profile__button-wrapper">
                                <button type="submit" className="profile__button profile__button_type_edit-save button">
                                    {isDisabled ? 'Редактировать' : 'Сохранить'}
                                </button>
                                <button
                                    onClick={logOut}
                                    type="button"
                                    className="profile__button profile__button_type_logout button"
                                >
                                    Выйти из аккаунта
                                </button>
                            </div>
                        </form>
                    </Page>
                </section>
            </MainStyleFlex>
        </>
    );
}
