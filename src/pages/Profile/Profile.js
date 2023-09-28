import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../../components/Header/Header';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import Page from '../../components/Page/Page';
import useForm from '../../hooks/useForm';
import './Profile.css';
import '../Auth/Auth.css';

export default function Profile({ logOut, onUpdateProfile }) {
    const currentUser = useContext(CurrentUserContext);
    const { enteredValues, isError, isFormValid, handleChangeInput, resetForm } = useForm();
    const [lastDetails, setLastDetails] = useState(false);


    function onSubmitUserForm(e) {
        e.preventDefault();
        onUpdateProfile({
            name: enteredValues.name,
            email: enteredValues.email,
        });
    };

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

                            <div className="profile__label">
                                <label className="profile__label-text">Имя</label>
                                <input
                                    type="text"
                                    className="profile__input"
                                    name="name"
                                    minLength="3"
                                    maxLength="15"
                                    autoComplete="off"
                                    required
                                    placeholder={currentUser.name}
                                    value={enteredValues.name || ''}
                                    onChange={handleChangeInput} />
                            </div>
                            <span className="auth__error">{isError.name}</span>

                            <div className="profile__label">
                                <label className="profile__label-text">E-mail</label>
                                <input
                                    type="text"
                                    className="profile__input"
                                    name="email"
                                    pattern="\w+@\w+\.\w+"
                                    autoComplete="off"
                                    required
                                    placeholder={currentUser.email}
                                    value={enteredValues.email || ''}
                                    onChange={handleChangeInput} />
                            </div>
                            <span className="auth__error">{isError.email}</span>

                            <div className="profile__button-wrapper">
                                <button
                                    onClick={onSubmitUserForm}
                                    type="submit"
                                    className={
                                        isFormValid && !lastDetails
                                            ? 'profile__button profile__button_type_edit-save buttonprofile__edit'
                                            : 'profile__button_type_edit-save_off'
                                    }>
                                    Редактировать
                                </button>
                                <button
                                    onClick={logOut}
                                    type="button"
                                    className="profile__button profile__button_type_logout button">
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
