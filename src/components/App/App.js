import React from 'react';
import {
  Route, Switch, useLocation,
} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';

import './App.css';
import articles from '../../utils/allNews';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [rowArticles, setRowArticles] = React.useState(3);

  function handleShowMoreArticles() {
    setRowArticles(rowArticles + 3);
  }

  function handleSearchArticles(keyword) {
    console.log('Ищем статьи по ключу: ', keyword);
  }
  const { pathname } = useLocation();


  return (
    <>
      <div className='page'>
        <Header
          loggedIn={loggedIn}
          pathname={pathname}
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
      </div>
    </>
  );
}

export default App;
