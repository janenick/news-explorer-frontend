import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import allNews from '../../utils/allNews';

function Main() {
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <NewsCardList cardList={allNews }/>
      </>
  );
}

export default Main;
