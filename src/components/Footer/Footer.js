import { Link } from 'react-router-dom';
import Page from '../Page/Page';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <Page>
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__flex-wrapper">
          <p className="footer__copyright">&copy; 2023</p>
          <nav className="footer__nav">
            <Link
              className="footer__link link"
              to="https://practicum.yandex.ru/"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
            <Link
              className="footer__link link"
              to="https://github.com/AnKiir"
              target="_blank"
            >
              Github
            </Link>
          </nav>
        </div>
      </Page>
    </footer>
  );
}
