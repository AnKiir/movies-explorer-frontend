import { Link } from 'react-router-dom';
import Page from '../Page/Page';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio" aria-label="Портфолио">
      <Page>
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list list">
          <li className="portfolio__item">
            <Link
              className="portfolio__link link"
              to="https://github.com/AnKiir/how-to-learn"
              target="_blank"
            >
              <h3 className="portfolio__title-work">Статичный сайт</h3>
              <span className="portfolio__icon" />
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              className="portfolio__link link"
              to="https://ankiir.github.io/russian-travel/"
              target="_blank"
            >
              <h3 className="portfolio__title-work">Адаптивный сайт</h3>
              <span className="portfolio__icon" />
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              className="portfolio__link link"
              to="https://github.com/AnKiir/react-mesto-api-full-gha"
              target="_blank">
              <h3 className="portfolio__title-work">Одностраничное приложение</h3>
              <span className="portfolio__icon" />
            </Link>
          </li>
        </ul>
      </Page>
    </section>
  );
}
