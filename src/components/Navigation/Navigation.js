import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from '../Link/Link';

import './Navigation.css';

function Navigation(props) {
  // const main = (props.pathname === '/' || props.isMenuMobile);
  const main = props.main;
  const classNameTextMain = `nav__text ${main ? 'nav__text_selected' : 'nav__text_saved-news'}`;
  const classNameTextSavedNews = `nav__text ${main ? '' : 'nav__text_saved-news nav__text_selected-saved-news'}`;

  return (
    <nav className='nav'>
    <ul className='nav__list'>
        <li className='nav__item'>
          <Link navLink={true} title='Перейти на страницу с поиском' to='/'
            className={classNameTextMain}
            value='Главная' />
        </li>
        <li className='nav__item'>
          <Link navLink={true} title='Перейти на страницу с сохраненными статьями' to='/saved-news'
            className={classNameTextSavedNews}
            value='Сохраненные статьи' />
        </li>
    </ul>
      </nav>
  );
}

export default Navigation;