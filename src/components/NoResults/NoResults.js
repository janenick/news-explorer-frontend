import React from 'react';

import './NoResults.css';

function NoResults({ notFound, searchError}) {
  const title = searchError ? 'Во время запроса произошла ошибка. ' : 'Ничего не найдено.';
  const subtitle = searchError ? 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    : 'К сожалению по вашему запросу ничего не найдено.';
    return (
      <section className='no-results'>
        <div className='no-results__container'>
        <div className='no-results__img'></div>
          <h3 className='no-results__title'>{title}</h3>
          <p className='no-results__subtitle'>{subtitle}</p>
        </div>
      </section>
  );
}

export default NoResults;
