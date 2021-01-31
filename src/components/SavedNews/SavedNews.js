import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';


const SavedNews = (props) => {
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <SavedNewsHeader userName={props.userName} articles={props.articles}/>
      <NewsCardList pathname={props.pathname} articles={props.articles}
        screenWidth={props.screenWidth} onHandleError={props.onHandleError}
        onArticleDelete={props.onArticleDelete}
        handleBookmarkUnsavedClick={props.handleBookmarkUnsavedClick}/>
    </main>
  );

};

export default SavedNews;