import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import NewsCard from '../NewsCard/NewsCard';
import Button from '../Buttons/Button/Button';

import './NewsCardList.css';

function NewsCardList(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  let main = true;
  let tooltip = 'Войдите, чтобы сохранять статьи';
  let iconSave = true;
  if (props.pathname === '/saved-news') {
    tooltip = 'Убрать из сохраненных';
    iconSave = false;
    main = false;
  }


  return (
    <section className='news-cards page__news-cards section'>
      {main ? <>
        <p className='news-cards__title'>Результаты поиска</p>
        <ul className='news-cards__container'>
          {props.articles.slice(0, props.rowArticles).map((card, i) => <NewsCard key={i} card={card} tooltip={tooltip} iconSave={iconSave} />)}
        </ul>

        <div className='news-cards__btn-position'>
          {(props.articles.length - props.rowArticles > 0) && <Button
            classNameBtn='more-results'
            className='button_type_more-results'
            image={false}
            title='Показать еще'
            onClick={props.handleShowMoreArticles}
          />
          }
        </div>


      </> :
        <ul className='news-cards__container'>
          {props.articles.map((card, i) => <NewsCard key={i} card={card} tooltip={tooltip} iconSave={iconSave} />)}
        </ul>
      }
    </section>
  );
}

export default NewsCardList;