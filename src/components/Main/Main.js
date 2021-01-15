import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NoResults from '../NoResults/NoResults';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='main section'>
      <SearchForm handleSearchArticles={props.handleSearchArticles} />
      <NoResults />
      <NewsCardList pathname={props.pathname} articles={props.articles} rowArticles={props.rowArticles} handleShowMoreArticles={props.handleShowMoreArticles}/>
      <About />
      </main>
  );
}

export default Main;
