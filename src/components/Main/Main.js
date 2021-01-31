import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NoResults from '../NoResults/NoResults';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
      return (
      <main className='main'>
        <SearchForm handleSearchArticles={props.handleSearchArticles} />
        {props.notFound && <NoResults />}
          {props.articles.length !== 0 && <NewsCardList
            loggedIn={props.loggedIn}
            pathname={props.pathname}
            articles={props.articles}
            rowArticles={props.rowArticles}
            screenWidth={props.screenWidth}
            handleShowMoreArticles={props.handleShowMoreArticles}
            onAddArticle={props.onAddArticle}
            handleArticleRequest={props.handleArticleRequest}
            onHandleError={props.onHandleError}
            handleBookmarkUnsavedClick={props.handleBookmarkUnsavedClick}
        />}
        <About />
      </main>
    );
  }

  export default Main;
