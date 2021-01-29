import React from 'react';
import {
  Route, Switch, useLocation, useHistory,
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
import mainApi from '../../utils/mainApi';
import * as auth from '../../utils/auth';
import { searchArticles } from '../../utils/newsApi';

function App() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState('');
  const [tooltipCanAuth, setTooltipCanAuth] = React.useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [searchArticlesArray, setSearchArticlesArray] = React.useState([]);
  const [savedArticlesArray, setSavedArticlesArray] = React.useState([]);
  const [rowArticles, setRowArticles] = React.useState(3);
  const [notFound, setNotFound] = React.useState(false);
  const { pathname } = useLocation();

  // --> авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userName, setUserName] = React.useState('');
  const [isActionSuccess, setIsActionSuccess] = React.useState(true);
  const [actionError, setActionError] = React.useState('');


  const history = useHistory();
  // <-- авторизация

  function handleError(err) {
    // renderError(`Ошибка: ${err}`);
    handleInfoTooltipOpen(`Что-то пошло не так: \n ${err}`);
  }

  const handleArticleRequest = ({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }) => {
    return mainApi.addNewArticle({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    })
  }

  // function handleAddArticle({ name, link }) {
  function handleAddArticle(article) {
    console.log('handleAddArticle', article);
    if (!loggedIn) {
      handleLoginPopupOpen();
      return false;
    } else {
      setIsPreloaderOpen(true);
      let isSuccess = false;
      mainApi.addNewArticle(article).then((newArticle) => {
        // Обновляем стейт карточек
        // setCards([newCard.card, ...cards]);
        console.log('newArticle:', newArticle);
        article._id = newArticle._id;
        isSuccess =  true;
      })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setIsPreloaderOpen(false);
          return isSuccess;
        });
    }
  }

  function convertArticlesArray(articlesArray, keyword) {
    const newArray = articlesArray.map(article => ({
      _id: '',
      keyword: keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
    }));
    return newArray;
  }

  function handleShowMoreArticles() {
    setRowArticles(rowArticles + 3);
  }

  function getArticlesFromAPI(keyword) {
    const searchWord = '' + keyword.trim();
    if (searchWord.length === 0) {
      handleInfoTooltipOpen('Введите непустое слово.');
      setIsPreloaderOpen(false);
      return;
      //      setSearchArticlesArray([]);
    }
    // setIsPreloaderOpen(true);
    console.log('Ищем статьи по ключу: ', searchWord);
    searchArticles(searchWord)
      .then((data) => {
        if (data.articles.length !== 0) {
          const convertArticles = convertArticlesArray(data.articles, searchWord);
          setSearchArticlesArray(convertArticles);
          } else {
          setNotFound(true);
        }
      })
      .catch(err => console.log(err))
      .finally(() => { setIsPreloaderOpen(false) });
  }
  function handleSearchArticles(keyword) {
    setSearchArticlesArray([]);
    setNotFound(false);
    // setValueSearchInputError(false);
    setIsPreloaderOpen(true);
    setRowArticles(3);
    getArticlesFromAPI(keyword);
  }

  function handleArticleDelete(article) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    mainApi.removeArticle(article._id).then(() => {
      // Создаем копию массива, исключив из него удалённую карточку
      const newArticles = savedArticlesArray.filter((art) => art._id !== article._id);
      // Обновляем стейт
      setSavedArticlesArray(newArticles);
    })
      .catch((err) => {
        handleError(err);
      });
  }

  function onSetErrorStatus(status, message) {
    setIsActionSuccess(status);
    setActionError(message);
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

  function deleteActionError() {
    setIsActionSuccess(true);
    setActionError(true);
  }

  function handleLoginPopupOpen() {
    deleteActionError();
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsLoginPopupOpen(true);
  }

  function handleRegisterPopupOpen() {
    deleteActionError();
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(true);
  }
  const handleRegister = (userData) => {
    auth.register(userData.email, userData.password, userData.name)
      .then((res) => {
        if (res.data.email) {
          setIsRegisterPopupOpen(false);
          handleInfoTooltipOpen('Пользователь успешно зарегистрирован!', true);

        } else {
          return new Promise().reject();
        }
      })
      .catch((err) => {
        let errMessage = 'Что-то пошло не так';
        if (err.data) {

          if (err.data.message) {
            errMessage = err.data.message;
          } else {
            errMessage = err.data.error;
          }
        }
        onSetErrorStatus(false, errMessage);
      });
  }

  // --> авторизация
  const handleLogin = (userData) => {
    auth.authorize(userData.email, userData.password)
      .then((res) => {
        auth.getContent(res.data.token).then((user) => {
          if (user.data) {
            setCurrentUser(user.data);

            localStorage.setItem('token', res.data.token);
            setUserName(user.data.name);
            setLoggedIn(true);
            setIsLoginPopupOpen(false);
            handleInfoTooltipOpen('Вы успешно вошли на сайт!');
          } else {
            return new Promise().reject();
          }
        });
      })
      .catch((err) => {
        let errMessage = 'Что-то пошло не так';
        if (err.data) {
          errMessage = err.data.message;
        }
        onSetErrorStatus(false, errMessage);
      });
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line consistent-return
      auth.getContent(token).then((res) => {
        if (res.data.email) {
          setUserName(res.data.name);
          setLoggedIn(true);
        } else {
          return new Promise().reject();
        }
      })
        .catch(() => handleInfoTooltipOpen('Что-то пошло не так! Проблемы с токеном.'));
    }
  };

  React.useEffect(() => {
    mainApi.getUserInfo().then((initialUserInfo) => {
      setCurrentUser(initialUserInfo);
    })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getArticlesFromServer().then((initialArticleList) => {
        const articleList = initialArticleList.reverse().map((article) => article);
        setSavedArticlesArray(articleList);
      })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  const handleSignOut = () => {
    // выход из профиля
    localStorage.removeItem('token');
    setUserName('');

    setLoggedIn(false);
    history.push('/');
  };
  // <-- авторизация

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
          userName={userName}
        />
        <Switch>
          <Route exact path='/'> {/* Главная */}
            <Main
              loggedIn={loggedIn}
              pathname={pathname}
              articles={searchArticlesArray}
              rowArticles={rowArticles}
              screenWidth={screenWidth}
              handleShowMoreArticles={handleShowMoreArticles}
              handleSearchArticles={handleSearchArticles}
              notFound={notFound}
              onAddArticle={handleAddArticle}
              handleArticleRequest={handleArticleRequest}
              handleError={handleError }
            />
          </Route>
          <Route path='/saved-news'> {/* Сохраненные новости */}
            <SavedNews
              loggedIn={loggedIn}
              pathname={pathname}
              articles={savedArticlesArray}
              screenWidth={screenWidth}
              onHandleError={handleError}
              onArticleDelete={handleArticleDelete}
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
          actionError={actionError}
          isActionSuccess={isActionSuccess}
        />

        <RegisterPopup
          name='register'
          handleRegister={handleRegister}
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onChangeForm={handleLoginPopupOpen}
          actionError={actionError}
          isActionSuccess={isActionSuccess}
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
