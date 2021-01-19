import React from 'react';
import {
  Route, Switch, useLocation, useHistory
} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../Popups/LoginPopup/LoginPopup';
import RegisterPopup from '../Popups/RegisterPopup/RegisterPopup';
import InfoTooltip from '../Popups/InfoTooltip/InfoTooltip';
import Preloader from '../Preloader/Preloader';

import articles from '../../utils/allNews';

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipCanAuth, setTooltipCanAuth] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [rowArticles, setRowArticles] = React.useState(3);
  const { pathname } = useLocation();
  const history = useHistory();

  function handleShowMoreArticles() {
    setRowArticles(rowArticles + 3);
  }

  function handleSearchArticles(keyword) {
    setIsPreloaderOpen(true);
    console.log('Ищем статьи по ключу: ', keyword);
    setTimeout(() => setIsPreloaderOpen(false), 1000);
  }


  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleInfoTooltipOpen(message, canAuth = false) {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setTooltipMessage(message);
    setTooltipCanAuth(canAuth);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleLoginPopupOpen() {
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsLoginPopupOpen(true);
  }

  function handleRegisterPopupOpen() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  }
  const handleRegister = () => {
    setIsRegisterPopupOpen(false);
    handleInfoTooltipOpen('Пользователь успешно зарегистрирован!', true);
  }

  const handleLogin = (data) => {
    console.log('handleLogin.data', data);
    setLoggedIn(true);
    setIsLoginPopupOpen(false);
    handleInfoTooltipOpen('Пользователь выполнил вход!');
  }

  const handleSignOut = () => {
    // выход из профиля
    /* localStorage.removeItem('token');
    setEmail('');
    */
    setLoggedIn(false);
    history.push('/');
  };

  function handleEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  return (
    <>
        <Header
          loggedIn={loggedIn}
          pathname={pathname}
          handleLogin={handleLoginPopupOpen}
          handleSignOut={handleSignOut}
        />
        <Switch>
          <Route exact path='/'> {/* Главная */}
            <Main
             loggedIn={loggedIn}
              pathname={pathname}
              articles={articles}
              rowArticles={rowArticles}
              handleShowMoreArticles={handleShowMoreArticles}
              handleSearchArticles={handleSearchArticles}
            />
          </Route>
          <Route path='/saved-news'> {/* Сохраненные новости */}
         <SavedNews
              loggedIn={loggedIn}
              pathname={pathname}
              articles={articles}
            />
          </Route>
        </Switch>
        <Footer />

        <LoginPopup
          name='login'
          handleLogin={handleLogin}
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onChangeForm={handleRegisterPopupOpen}
        />

        <RegisterPopup
          name='register'
          handleRegister={handleRegister}
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onChangeForm={handleLoginPopupOpen}
        />

        <InfoTooltip
          name='infoToolLip'
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          message={tooltipMessage}
          canAuth={tooltipCanAuth}
          onChangeForm={handleLoginPopupOpen}
        />

        <Preloader
          isOpen={isPreloaderOpen}
        />
    </>
  );
}

export default App;
