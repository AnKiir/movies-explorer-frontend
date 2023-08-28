import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';
import Footer from '../../components/Footer/Footer';
import './Error404.css';

export default function Error404() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <MainStyleFlex>
                <section className="error404" aria-label="Страница 404">
                    <Page>
                        <h1 className="error404__title">404</h1>
                        <p className="error404__text">Страница не найдена</p>
                        <button onClick={goBack} className="error404__button button" type="button">
                            Назад
                        </button>
                    </Page>
                </section>
            </MainStyleFlex>
            <Footer />
        </>
    );
}
