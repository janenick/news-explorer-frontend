import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NoResults from '../NoResults/NoResults';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  // чтобы увидеть секцию NoResults, надо удалить статьи из utils/allNews.js
  function showArticles() {
    if (props.articles.length) {
      return (
        <NewsCardList
          pathname={props.pathname}
          articles={props.articles}
          rowArticles={props.rowArticles}
          handleShowMoreArticles={props.handleShowMoreArticles}
        />
      )
    }
      return (
        <NoResults />
      )
    }

    return (
      <main className='main section'>
        <SearchForm handleSearchArticles={props.handleSearchArticles} />
        {showArticles()}
        <About />
      </main>
    );
  }

  export default Main;
