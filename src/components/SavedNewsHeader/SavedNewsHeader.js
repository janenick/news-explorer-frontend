import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';

import './SavedNewsHeader.css';

const SavedNewsHeader = () => {
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className='saved-news-header section'>
      <h1 className='saved-news-header__title'>Сохранённые статьи</h1>
      <p className='saved-news-header__subtitle'>Грета, у вас 5 сохранённых статей</p>
      <p className='saved-news-header__text'>По ключевым словам: <span className='saved-news-header__text-span'>Природа, Тайга и 2-м другим</span></p>
    </section>
  );

};

export default SavedNewsHeader;