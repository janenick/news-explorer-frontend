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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import articles from '../../utils/allNews';

import CurrentUserContext from '../../contexts/currentUserContext';
import {
  getArticlesFromServer,
  addNewArticle,
  removeArticle,
  getUserInfo,
  register,
  authorize,
  getContent,
} from '../../utils/mainApi';
import { searchArticles } from '../../utils/newsApi';
import { converter } from '../../utils/utils.js';

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
  const [searchMarker, setSearchMarker] = React.useState(true);
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
    handleInfoTooltipOpen(`Что-то пошло не так: \n ${err.data.message || err}`);

    console.log('Ошибка: ', err);
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
    return addNewArticle({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    })
  }

  function handleAddArticle(article) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const saved = savedArticlesArray
      .find((i) => i.title === article.title
        && i.date === article.date
        && i.source === article.source);

    if (saved && article._id.indexOf(article.title) === -1) {
      handleArticleDelete(saved);
    } else {
      setIsPreloaderOpen(true);
      addNewArticle(article).then((newArticle) => {
        article._id = newArticle.data._id;
        article.isSaved = true;
        // Обновляем стейт карточек
        setSavedArticlesArray([newArticle.data, ...savedArticlesArray]);
      })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setIsPreloaderOpen(false);
        });
    }
  }

  function handleShowMoreArticles() {
    setRowArticles(rowArticles + 3);
  }

  function getArticlesFromAPI(values) {
    const { keyword } = values;
    const searchWord = '' + keyword.trim().toLowerCase();
    if (searchWord.length === 0) {
      handleInfoTooltipOpen('Введите непустое слово.');
      setIsPreloaderOpen(false);
      return;
      //      setSearchArticlesArray([]);
    }
    searchArticles(searchWord)
      .then((data) => {
        if (data.articles.length !== 0) {
          const convertArticles = converter(data.articles, searchWord);
          setSearchArticlesArray(convertArticles);
          setSearchMarker(!searchMarker);
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
    setIsPreloaderOpen(true);
    setRowArticles(3);
    getArticlesFromAPI(keyword);
  }


  function handleArticleDelete(article) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    setIsPreloaderOpen(true);
    removeArticle(article._id).then(() => {
      // Создаем копию массива, исключив из него удалённую карточку
      const newArticles = savedArticlesArray.filter((art) => art._id !== article._id);
      // Обновляем стейт
      setSavedArticlesArray(newArticles);
    })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => { setIsPreloaderOpen(false) });
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
    register(userData.email, userData.password, userData.name)
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
    authorize(userData.email, userData.password)
      .then((res) => {
        getContent(res.data.token).then((user) => {
          if (user.data) {
            setCurrentUser(user.data);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('searchedArticles', savedArticlesArray);
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


  // проверка сохранена ли уже найденная статья
  const checkSavedArticles = () => {
    if (searchArticlesArray.length) {
      const savedLinks = savedArticlesArray.map(({ link }) => link);
      const markedArticles = searchArticlesArray.map((article) => {
        const isSaved = savedLinks.includes(article.link);
        const saved = isSaved
          ? savedArticlesArray.find((item) => item.link === article.link)
          : article;
        return { ...saved, isSaved };
      });
      setSearchArticlesArray(markedArticles);
    }
  };

  // при выходе найденным статьям установить 'isSaved: false'
  const clearIsSavedOnLogout = () => {
    if (searchArticlesArray.length) {
      const markedArticles = searchArticlesArray.map((article) => ({ ...article, isSaved: false }));
      setSearchArticlesArray(markedArticles);
    }
  };

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line consistent-return
      getContent(token).then((res) => {
        if (res.data.email) {
          setCurrentUser(res.data);
          setLoggedIn(true);
        } else {
          return new Promise().reject();
        }
      })
        .catch(() => handleInfoTooltipOpen('Что-то пошло не так! Проблемы с токеном.'));
    } else {
      setSearchArticlesArray(articles);
      setLoggedIn(false);
      setCurrentUser({});
    }
  };

  React.useEffect(() => {
    getUserInfo().then((initialUserInfo) => {
      setCurrentUser(initialUserInfo);
    })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const articles = JSON.parse(localStorage.getItem('searchedArticles')) || [];
    if (articles.length) {
      setSearchArticlesArray(articles);
    }
  }, []);

  // сохраняем найденные статьи для повторного открытия страницы
  React.useEffect(() => {
    localStorage.setItem('searchedArticles', JSON.stringify(searchArticlesArray));
  }, [searchArticlesArray]);


  React.useEffect(() => {
    if (loggedIn) {
      setIsPreloaderOpen(false);
      getArticlesFromServer().then((initialArticleList) => {
        const articleList = initialArticleList.data.reverse().map((article) => ({ isSaved: true, ...article }));
        setSavedArticlesArray(articleList);
      })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsPreloaderOpen(false);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  // синхронизируем найденные и сохраненные статьи
  React.useEffect(() => {
    if (savedArticlesArray.length && loggedIn) {
      checkSavedArticles();
    } else {
      clearIsSavedOnLogout();
    }
  }, [savedArticlesArray, loggedIn, searchMarker]);

  // выход из профиля
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('searchedArticles');
    setUserName('');

    setLoggedIn(false);
    setSearchArticlesArray([]);
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
              onArticleDelete={handleArticleDelete}
              handleArticleRequest={handleArticleRequest}
              onHandleError={handleError}
              handleBookmarkUnsavedClick={() => handleLoginPopupOpen()}
            />
          </Route>
          <ProtectedRoute exact path='/saved-news'
            component={SavedNews}
            loggedIn={loggedIn}
            pathname={pathname}
            userName={userName}
            articles={savedArticlesArray}
            screenWidth={screenWidth}
            onHandleError={handleError}
            onArticleDelete={handleArticleDelete}
          />
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
