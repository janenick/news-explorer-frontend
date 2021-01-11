import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className='main'>

      <NewsCardList pathname={props.pathname} articles={props.articles} rowArticles={props.rowArticles} handleShowMoreArticles={props.handleShowMoreArticles}/>
      <About />
      </main>
  );
}

export default Main;
