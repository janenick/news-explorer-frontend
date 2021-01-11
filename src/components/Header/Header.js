import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import logoutImgMain from '../../images/icons/logout-main.svg';
import logoutImgSavedNews from '../../images/icons/logout-saved-news.svg';

import './Header.css';

function Header(props) {
  // const main = (props.pathname === '/' || isMenuMobile);
  const main = (props.pathname === '/') ? true : false;
  const classNameLogo = `header__logo ${main ? '' : 'header__logo_saved-news'}`;
  const logout = main ? 'logout-main' : 'logout-saves-news';
  const logoutImg = main ? logoutImgMain : logoutImgSavedNews


  return (
    <header className={`header ${main ? 'header__bg' : 'header__bg_saved-news'} page__header section`}>
      <Link navLink={true} title='Перейти на страницу с поиском' className={classNameLogo} to='/'
        value='NewsExplorer'>NewsExplorer</Link>

      <div className='header__container'>
        <Navigation loggedIn={props.loggedIn} main={main}/>

      {props.loggedIn ? (
        <Button
        classNameBtn={logout}
        image={true}
        title='Грета'
        src={logoutImg}
        alt='Выход'
        />
      ) : (
          <Button
            classNameBtn='auth'
            image={false}
            title='Авторизоваться'
          />
      )
        }
      </div>
      </header>
  );
}

export default Header;
