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

import CurrentUserContext from '../../contexts/currentUserContext';
import * as auth from '../../utils/auth';

function App() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipCanAuth, setTooltipCanAuth] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [rowArticles, setRowArticles] = React.useState(3);
  const { pathname } = useLocation();

  // --> авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userName, setUserName] = React.useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(true);
  const [registerError, setRegisterError] = React.useState('');

  const history = useHistory();
  // <-- авторизация

  function handleError(err) {
    // renderError(`Ошибка: ${err}`);
    handleInfoTooltipOpen(false, `Что-то пошло не так: \n ${err}`);
  }

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
    // setTooltipCanAuth(false);
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
  const handleRegister = (userData) => {
    console.log('handleRegister.userData', userData);
    auth.register(userData.email, userData.password, userData.name)
      .then((res) => {
        console.log('handleRegister.res: ', res);
        if (res.data.email) {
          /* setIsRegisterSuccess(true);
          setRegisterError('');
          */
          setIsRegisterPopupOpen(false);
          handleInfoTooltipOpen('Пользователь успешно зарегистрирован!', true);

        } else {
          return new Promise().reject();
        }

      })
      .catch((err) => {
        console.log('handleRegister.err', err);
        setIsRegisterSuccess(false);
        if (err.data) {

          if (err.data.message) {
            setRegisterError(err.data.message);
          } else {
            setRegisterError(err.data.error);
          }
        } else {
          setRegisterError('Что-то пошло не так');
        }

      });
    // setIsRegisterPopupOpen(false);
    // handleInfoTooltipOpen('Пользователь успешно зарегистрирован!', true);
  }

  const handleLogin = (data) => {
    /* setLoggedIn(true);
   setIsLoginPopupOpen(false);
   handleInfoTooltipOpen('Пользователь выполнил вход!');*/

    // авторизация
    auth.authorize(email, password)
      .then((res) => {
        auth.getContent(res.data.token).then((user) => {
          if (user.data) {
            setCurrentUser(user.data);

            localStorage.setItem('token', res.data.token);
            // setUserName(emailUser);
            setLoggedIn(true);
          } else {
            return new Promise().reject();
          }
        });
      })
      .catch((err) => {
        if (err.data) {
          onOpenPopupInfoTooltip(false, err.data.message);
        } else {
          onOpenPopupInfoTooltip(false, 'Что-то пошло не так');
        }
      });
  }


  /* React.useEffect(() => {
    api.getUserInfo().then((initialUserInfo) => {
      setCurrentUser(initialUserInfo);
    })
      .catch((err) => console.error(err));
  }, []);
  */


  const handleSignOut = () => {
    // выход из профиля
    localStorage.removeItem('token');
    setUserName('');

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

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          pathname={pathname}
          handleLogin={handleLoginPopupOpen}
          handleSignOut={handleSignOut}
          hasOpenPopup={isLoginPopupOpen || isRegisterPopupOpen}
          screenWidth={screenWidth}
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
        <Footer screenWidth={screenWidth} />

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
          registerError={registerError}
          isRegisterSuccess={isRegisterSuccess}
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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
