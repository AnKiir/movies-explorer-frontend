import { Link } from 'react-router-dom';
import Page from '../Page/Page';
import Title from '../Title/Title';
import photo from '../../img/about.png';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <section id="about-me" className="about-me" aria-label="Обо мне">
      <Page>
        <Title>Студент</Title>
        <div className="about-me__wrapper">
          <div className="about-me__info">
            <h3 className="about-me__name">Анна</h3>
            <p className="about-me__intro">Фронтенд-разработчик, 32 года</p>
            <p className="about-me__text">
              Я – геймер-верстальщик и сливаю воедино две мои страсти: игры и веб-верстку.
              Кроме того, я не ограничиваюсь только веб-версткой. Также владею различными языками программирования,
              что позволяет мне создавать интерактивные и захватывающие игровые элементы на сайтах. Динамические анимации,
              драг-эффекты, поддержка мобильных устройств – знаю, как реализовать все это для создания незабываемых
              игровых впечатлений. Lizards are love, lizarding 4 life.
            </p>
            <Link
              className="about-me__link link"
              to="https://github.com/AnKiir"
              target="_blank"
            >
              Github
            </Link>
          </div>
          <img src={photo} alt="Фотограция в профиле" className="about-me__photo" />
        </div>
      </Page>
    </section>
  );
}
