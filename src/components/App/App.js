import React from 'react';
import {
  Route, Switch, useLocation,
} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import LoginPopup from '../Popups/LoginPopup/LoginPopup';
import InfoTooltip from '../Popups/InfoTooltip/InfoTooltip';

import './App.css';
import articles from '../../utils/allNews';

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipCanAuth, setTooltipCanAuth] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [rowArticles, setRowArticles] = React.useState(3);
  const { pathname } = useLocation();

  function handleShowMoreArticles() {
    setRowArticles(rowArticles + 3);
  }

  function handleSearchArticles(keyword) {
    console.log('Ищем статьи по ключу: ', keyword);
  }


  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function onOpenPopupInfoTooltip(message, canAuth=false) {
    setTooltipMessage(message);
    setIsInfoTooltipPopupOpen(true);
    setTooltipCanAuth(canAuth);
  }

  function onOpenPopupLogin() {
    setIsLoginPopupOpen(true);
  }
  const onRegister = () => {
    onOpenPopupInfoTooltip('Пользователь успешно зарегистрирован!', true);
  }

  const handleLogin = () => {
    setLoggedIn(true);
    onOpenPopupInfoTooltip('Пользователь выполнил вход!');
  }

  return (
    <>
      <div className='page'>
        <Header
          loggedIn={loggedIn}
          pathname={pathname}
          handleLogin={onOpenPopupLogin}
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
          <Route path="/saved-news"> {/* Сохраненные новости */}
            <SavedNews
              loggedIn={loggedIn}
              pathname={pathname}
              articles={articles}
            />
          </Route>
        </Switch>
        <Footer />

        {isLoginPopupOpen && <LoginPopup
          name='login'
          handleLogin={handleLogin}
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          handleLinkClick={onRegister}
            />
        }
        {isInfoTooltipPopupOpen && <InfoTooltip
          name='infoToolLip'
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          message={tooltipMessage}
          canAuth={tooltipCanAuth}
          />
          }
      </div>
    </>
  );
}

export default App;
