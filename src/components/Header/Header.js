import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';

function Header(props) {
  // const main = (props.pathname === '/' || isMenuMobile);
  const main = true;
  const classNameLogo = `header__logo ${main ? '' : 'header__logo_saved-news'}`;

  return (
    <header className='header page__header section'>
      <Link navLink={true} title='Перейти на страницу с поиском' className={classNameLogo} to='/' 
        value='NewsExplorer'>NewsExplorer</Link>
      <div className='header__button-group'>
        {props.loggedIn
          ? <p>Грета</p>
          : <p>Авторизоваться</p>
        }

      </div>
      </header>
  );
}

export default Header;
