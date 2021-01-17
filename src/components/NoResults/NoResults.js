import React from 'react';

import './NoResults.css';

function NoResults() {
    return (
      <section className='no-results'>
        <div className='no-results__container'>
        <div className='no-results__img'></div>
        <h3 className='no-results__title'>Ничего не найдено</h3>
          <p className='no-results__subtitle'>К сожалению по вашему запросу ничего не найдено.</p>
        </div>
      </section>
  );
}

export default NoResults;
