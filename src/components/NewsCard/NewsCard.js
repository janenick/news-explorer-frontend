import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';

import './NewsCard.css';

const NewsCard = (props) => {
  // const currentUser = React.useContext(CurrentUserContext);
  const { card } = props;

  /* // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = String(card.owner) === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `news-card__btn-trash ${isOwn ? 'news-card__btn-trash_active' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `news-card__btn-like ${isLiked ? 'news-card__btn-like_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick(evt) {
    props.onCardDelete(evt, card);
  }
*/
  return (
    < li className='news-card'>
      <button type='button' className='news-card__btn news-card__btn_type_trash'></button>
      <div className='news-card__keyword-container'>
        <p className='news-card__keyword'>{card.keyword}</p>
      </div>
      <p className='news-card__tooltip-text'>Убрать из сохраненных</p>
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
