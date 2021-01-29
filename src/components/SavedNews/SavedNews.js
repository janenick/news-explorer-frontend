import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';


const SavedNews = (props) => {
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <SavedNewsHeader />
      <NewsCardList pathname={props.pathname} articles={props.articles}
        screenWidth={props.screenWidth} handleError={props.handleError}/>
    </main>
  );

};

export default SavedNews;