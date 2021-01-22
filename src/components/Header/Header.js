import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from '../Link/Link';
import Navigation from '../Navigation/Navigation';
import Button from '../Buttons/Button/Button';
import ButtonMobileMenu from '../Buttons/ButtonMobileMenu/ButtonMobileMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import logoutImgMain from '../../images/icons/logout-main.svg';
import logoutImgSavedNews from '../../images/icons/logout-saved-news.svg';

import './Header.css';

function Header(props) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [useMobileMenu, setUseMobileMenu] = React.useState(false);
  const main = (props.pathname === '/' || isMobileMenuOpened);
  const mobilePopupOpened = isMobileMenuOpened && props.hasOpenPopup && main;
  const classNameLogo = `header__logo ${main ? '' : 'header__logo_saved-news'}`;

  // изменяем background в зависимости от состояния страницы и попапов
  let classNameHeader = 'header page__header';
  if (isMobileMenuOpened) {
    if (props.hasOpenPopup) {
      classNameHeader += `${main ? ' header_type_bg' : ' header_type_saved-news'}`;

    } else {
      classNameHeader += `${main ? ' header_type_one-colour' : ' header_type_saved-news'}`;
    }
  } else {
    classNameHeader += `${main ? ' header_type_bg' : ' header_type_saved-news'}`;
  }
  const logout = main ? 'logout-main' : 'logout-saves-news';
  const logoutImg = main ? logoutImgMain : logoutImgSavedNews

  function toggleMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  //изменяем статус меню в зависимости от размеров экрана
  React.useEffect(() => {
    if (props.screenWidth <= 620) {
      setUseMobileMenu(true);
    }
    else {
      setUseMobileMenu(false);
      setIsMobileMenuOpened(false);
    }
  }, [props.screenWidth]);


  //закрытие моб. меню щелчком вне формы
  React.useEffect(() => {
    const handleOverlayClose = (evt) => {
      if (evt.target.classList.contains('mobile-menu_opened')) {
        setIsMobileMenuOpened(false);
      }
    }
    document.addEventListener('mousedown', handleOverlayClose);
    return () => document.removeEventListener('mousedown', handleOverlayClose);
  }, []);

  //закрытие моб. меню по клавише 'Escape'
  React.useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.key === 'Escape') {
        setIsMobileMenuOpened(false);
      }
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <header className={classNameHeader}>
      <div className='header__container'>
        <span className={`header__border ${main ? '' : 'header__border_saved-news'}`} />
        <Link navLink={true} title='Перейти на страницу с поиском' to='/'
          className={classNameLogo}
          value={`${mobilePopupOpened ? '' : 'NewsExplorer'}`} />

        <div className='header__menu'>
          <Navigation loggedIn={props.loggedIn} main={main} />

          {props.loggedIn ? (
            <Button
              classNameBtn={logout}
              className={`button_type_${logout}`}
              image={true}
              title='Грета'
              src={logoutImg}
              alt='Выход'
              onClick={props.handleSignOut}
            />
          ) : (
              <Button
                classNameBtn='auth'
                className='button_type_auth'
                image={false}
                title='Авторизоваться'
                onClick={props.handleLogin}
              />
            )
          }
        </div>
        <ButtonMobileMenu
          main={main}
          isOpen={isMobileMenuOpened}
          useMobileMenu={useMobileMenu}
          onClick={toggleMenu}
        />
      </div>
      {isMobileMenuOpened && <MobileMenu
        isOpen={isMobileMenuOpened}
        loggedIn={props.loggedIn}
        main={main}
        handleLogin={props.handleLogin}
        handleSignOut={props.handleSignOut}
      />}
    </header>
  );
}

export default Header;
