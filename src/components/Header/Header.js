import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
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

// export default function Header({ isLogin }) {
//   const location = useLocation();
//   const headerClass = `header ${location.pathname === '/' ? 'header_white' : ''} ${location.pathname === '/signin' || location.pathname === '/signup'}`

//   return (
//     <header className={headerClass}>
//       <Navigation isLogin={isLogin} />
//     </header>
//   )
// }
