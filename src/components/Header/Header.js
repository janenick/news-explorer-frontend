import React from 'react';
import { useLocation } from 'react-router-dom';
import Link from '../Link/Link';
import Navigation from '../Navigation/Navigation';
import Button from '../Buttons/Button/Button';
import ButtonMobileMenu from '../Buttons/ButtonMobileMenu/ButtonMobileMenu';
import MobileMenu from '../MobileMenu/MobileMenu';
import Overlay from '../Popups/Overlay/Overlay';
import logoutImgMain from '../../images/icons/logout-main.svg';
import logoutImgSavedNews from '../../images/icons/logout-saved-news.svg';

import './Header.css';

function Header(props) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [useMobileMenu, setUseMobileMenu] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const main = (props.pathname === '/' || isMobileMenuOpened);

  //const main = (props.pathname === '/') ? true : false;
  const classNameLogo = `header__logo ${main ? '' : 'header__logo_saved-news'}`;
  const logout = main ? 'logout-main' : 'logout-saves-news';
  const logoutImg = main ? logoutImgMain : logoutImgSavedNews

  function toggleMenu() {
    console.log(`Меню было ${isMobileMenuOpened}`);
    setIsMobileMenuOpened(!isMobileMenuOpened);

  }

  //отслеживаем размеры экрана для изменения меню
  React.useEffect(() => {
    function changeScreenSize(e) {
      setScreenWidth(e.target.innerWidth);
    }
    window.addEventListener('resize', changeScreenSize);
    return () => {
      window.removeEventListener('resize', changeScreenSize);
    }
  }, [])

  //изменяем статус меню в зависимости от размеров экрана
  React.useEffect(() => {
    if (screenWidth <= 620) {
      setUseMobileMenu(true);
    }
    else {
      setUseMobileMenu(false);
      setIsMobileMenuOpened(false);
    }
  }, [screenWidth]);


  //закрытие моб. меню щелчком вне формы
  React.useEffect(() => {
    const handleOverlayClose = (evt) => {
      console.log(evt)
      if (evt.target.classList.contains('mobile-menu_opened')) {
        setIsMobileMenuOpened(false);
      }
    }
    document.addEventListener('mousedown', handleOverlayClose);
    return () => document.removeEventListener('mousedown', handleOverlayClose);
  }, []);

  return (
    <header className={`header ${main ? 'header__bg' : 'header_saved-news header__bg_saved-news'} page__header`}>
      <div className={`header__container ${(isMobileMenuOpened && !props.hasOpenPopup) ? 'header__container_mobile' : ''}`}>
        <span className={`header__border ${main ? '' : 'header__border_saved-news'}`} />
        <Link navLink={true} title='Перейти на страницу с поиском' to='/'
          className={classNameLogo}
          value='NewsExplorer' />

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

  /* return (
    <header className={`header ${main ? 'header__bg' : 'header_saved-news header__bg_saved-news'} page__header`}>
      <div className={`header__container ${isMobileMenuOpened ? 'header__container_mobile' : ''}`}>
        <span className={`header__border ${main ? '' : 'header__border_saved-news'}`} />
        <Link navLink={true} title='Перейти на страницу с поиском' to='/'
          className={classNameLogo}
          value='NewsExplorer' />

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
          onClick={toggleMenu}
        />
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpened}
        loggedIn={props.loggedIn}
        main={main}
        handleLogin={props.handleLogin}
        handleSignOut={props.handleSignOut}
      />
    </header>
  );
  */
}

export default Header;
