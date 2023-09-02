import Page from '../Page/Page';
import Navigation from '../Navigation/Navigation';
import clsx from 'clsx';
import './Header.css';

export default function Header({ isLogin }) {
    return (
      <header className={clsx('header', isLogin && 'header_white')}>
        <Page>
          <Navigation isLogin={isLogin} />
        </Page>
      </header>
    );
  }
  