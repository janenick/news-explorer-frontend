import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <NewsCardList pathname={props.pathname} articles={props.articles} />
      <About />
      </main>
  );
}

export default Main;
