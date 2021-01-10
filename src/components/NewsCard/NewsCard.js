import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';

import './NewsCard.css';

const NewsCard = ({ card, tooltip, iconSave }) => {
  // const currentUser = React.useContext(CurrentUserContext);
  const [isSavedMark, setIsSavedMark] = React.useState(false);

  function handleSavedMark() {
    isSavedMark ? setIsSavedMark(false) : setIsSavedMark(true)
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
      <div className='news-card__keyword-container'>
        <p className='news-card__keyword'>{card.keyword}</p>
      </div>
      <div className='news-card__tooltip'>{tooltip}</div>
      <a className='news-card__link' href={card.link} target='_blank' rel='noopener noreferrer'>

        <img className='news-card__img' src={card.image} alt={card.title} />
        <div className='news-card__info'>
          <p className='news-card__date'>{card.date}</p>
          <h3 className='news-card__title'>{card.title}</h3>
          <p className='news-card__text'>{card.text}</p>
        </div>
        <p className='news-card__source'>{card.source}</p>

      </a>
    </li>
  );

};

export default NewsCard;
