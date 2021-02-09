import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';


const SavedNews = (props) => {
  return (
    <main>
      <SavedNewsHeader articles={props.articles}/>
      <NewsCardList pathname={props.pathname} articles={props.articles}
        screenWidth={props.screenWidth} onHandleError={props.onHandleError}
        onArticleDelete={props.onArticleDelete}
        handleBookmarkUnsavedClick={props.handleBookmarkUnsavedClick}/>
    </main>
  );
};

export default SavedNews;