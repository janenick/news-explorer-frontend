import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  // const currentUser = React.useContext(CurrentUserContext);

  let tooltip = 'Войдите, чтобы сохранять статьи';
  let iconSave = true;
  if (props.pathname === '/saved-news') {
    tooltip = 'Убрать из сохраненных';
    iconSave = false;
  }

  return (
    <section className='news-cards page__news-cards section'>
      <ul className='news-cards__container'>
        {props.articles.map((card, i) => <NewsCard key={i} card={card} tooltip={tooltip} iconSave={iconSave} />)}
      </ul>
    </section>
  );
}

export default NewsCardList;