import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <NewsCardList pathname={props.pathname} cardList={props.allNews }/>
      </main>
  );
}

export default Main;
