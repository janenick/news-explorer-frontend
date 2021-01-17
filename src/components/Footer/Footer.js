import React from 'react';

import Link from '../Link/Link';
import iconGithub from '../../images/icons/github.svg';
import iconFacebookSquare from '../../images/icons/fb_square.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer page__footer'>
      <p className='footer__copyright'>&copy; 2020 Supersite, Powered by News API</p>
      <div className='footer__menu'>
        <ul className='footer__list'>
          <li className='footer__item'>
           <Link navLink={true} title='Перейти на Главную' className='footer__link' to='/' value='Главная' />
          </li>
          <li className='footer__item'>
            <Link
              title='Открыть сайт Яндекс.Практикума в новом окне'
              href='https://praktikum.yandex.ru'
              className='footer__link' to='/' value='Яндекс.Практикум' />
          </li>
        </ul>

        <ul className='footer__list'>
          <li className='footer__item'>
            <Link linkImage={true}
              title='Открыть сайт Github в новом окне'
              href='https://github.com/janenick'
              className='footer__link' to='/'
              src={iconGithub} alt='Github'/>
          </li>
          <li className='footer__item'>
            <Link linkImage={true}
              title='Открыть сайт Facebook в новом окне'
              href='https://www.facebook.com'
              className='footer__link' to='/'
              src={iconFacebookSquare} alt='Facebook' />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
