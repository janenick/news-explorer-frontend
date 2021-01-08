import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <section className='news-cards page__news-cards section'>
    <ul className='news-cards__container'>
      {props.cardList.map((card, i) => <NewsCard key={i} card={card} />)}
    </ul>
    </section>
  );
}

export default NewsCardList;