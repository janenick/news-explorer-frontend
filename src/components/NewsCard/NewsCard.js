import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';

import './NewsCard.css';

const NewsCard = ({ card, tooltip, iconSave }) => {
  // const currentUser = React.useContext(CurrentUserContext);
  const date = new Date(card.date);
  const fullDate = `${date.toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
  })}, ${date.getFullYear()}`;

  const [isSavedMark, setIsSavedMark] = React.useState(false);

  function handleSavedMark() {
    isSavedMark ? setIsSavedMark(false) : setIsSavedMark(true)
  }

  function makeTitle(str) {
    return (str.length < 65 ? str : `${str.slice(0, 60)}...`);
  }

  return (
    < li className='news-card'>
      { iconSave
        ? (
          <button type='button' className={`news-card__btn ${isSavedMark ? 'news-card__btn_type_save-marked' : 'news-card__btn_type_save'}`} onClick={handleSavedMark}></button>
        )
        : (
          <button type='button' className='news-card__btn news-card__btn_type_trash'></button>
        )
      }
      <div className='news-card__tooltip'>{tooltip}</div>
      {!iconSave && <div className='news-card__keyword-container'>{card.keyword}</div>}
      <a className='news-card__link' href={card.link} target='_blank' rel='noopener noreferrer'>
        <img className='news-card__img' src={card.image} alt={card.title} />
        <div className='news-card__info'>
          <p className='news-card__date'>{fullDate}</p>
          <h3 className='news-card__title'>{makeTitle(card.title)}</h3>
          <p className='news-card__text'>{card.text}</p>
        </div>
        <p className='news-card__source'>{card.source}</p>

      </a>
    </li>
  );

};

export default NewsCard;
