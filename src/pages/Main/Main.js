import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import NavTab from '../../components/NavTab/NavTab';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';
import Portfolio from '../../components/Portfolio/Portfolio';
import Footer from '../../components/Footer/Footer';
import MainStyleFlex from '../../components/MainStyleFlex/MainStyleFlex';

export default function Main() {
    return (
        <>
            <Header />
            <MainStyleFlex>
                <Hero />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </MainStyleFlex>
            <Footer />
        </>
    );
}
