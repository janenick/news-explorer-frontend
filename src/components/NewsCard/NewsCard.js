import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';

import './NewsCard.css';

const NewsCard = ({ card, tooltip, iconSave, loggedIn, onAddArticle, handleArticleRequest, onHandleError, onArticleDelete, handleBookmarkUnsavedClick, screenWidth }) => {
  // const currentUser = React.useContext(CurrentUserContext);
  const [isSavedMark, setIsSavedMark] = React.useState(false);

  function toggleSavedMark() {
    setIsSavedMark(!isSavedMark);
  }

/*  function handleSavedMark() {
    // isSavedMark ? setIsSavedMark(false) : setIsSavedMark(true)
    console.log('card.isSavedMark', isSavedMark);
    if (isSavedMark) {
      setIsSavedMark(false);
    } else {
      handleArticleRequest({
        keyword: card.keyword,
        title: card.title,
        text: card.text,
        date: card.date,
        source: card.source,
        link: card.link,
        image: card.image,
      }).then((newArticle) => {
        console.log('newArticle:', newArticle);
        card._id = newArticle._id;
        console.log('card:', card);
        setIsSavedMark(true);
      })
        .catch(err => onHandleError(`Статья не сохранилась. Ошибка: ${err}`));
    }
  }
  */

  function handleSavedMark() {
    // isSavedMark ? setIsSavedMark(false) : setIsSavedMark(true)
    if (!loggedIn) {
      handleBookmarkUnsavedClick();
    }
    if (card.isSaved) {
      // setIsSavedMark(false);
      console.log('убираем флажок');
    } else {
      onAddArticle(card);
    }
  }

  function handleDeleteClick() {
    onArticleDelete(card);
    console.log('handleDeleteClick.card', card);
  }

  function makeTitle(str, title = true) {
    let strLength = 146;
    if (title) {
      if (screenWidth > 800) {
        strLength = 60;
      } else if (screenWidth <= 800 && screenWidth > 500) {
        strLength = 40;
      } else {
        strLength = 30;
      }
    } else {
      if (screenWidth <= 800 && screenWidth > 500) {
        strLength = 70;
      } else if (screenWidth <= 500) {
        strLength = 75;
      }
    }
    return (str.length <= strLength ? str : `${str.slice(0, strLength)}...`);
  }

  return (
    < li className='news-card'>
      { iconSave
        ? (
          <button type='button' className={`news-card__btn ${card.isSaved ? 'news-card__btn_type_save-marked' : 'news-card__btn_type_save'}`} onClick={handleSavedMark}></button>
        )
        : (
          <button type='button' className='news-card__btn news-card__btn_type_trash' onClick={handleDeleteClick}></button>
        )
      }
      <div className={`news-card__tooltip ${loggedIn ? '' : 'news-card__tooltip_not-loggedin'}`}>{tooltip}</div>
      {!iconSave && <div className='news-card__keyword-container'>{card.keyword}</div>}
      <a className='news-card__link' href={card.link} target='_blank' rel='noopener noreferrer'>
        <img className='news-card__img' src={card.image} alt={card.title} />
        <div className='news-card__info'>
          <p className='news-card__date'>{card.date}</p>
          <h3 className='news-card__title'>{makeTitle(card.title)}</h3>
          <p className='news-card__text'>{makeTitle(card.text, false)}</p>
        </div>
        <p className='news-card__source'>{card.source}</p>

      </a>
    </li>
  );

};

export default NewsCard;
