import React from 'react';
import { declOfNum } from '../../utils/utils.js';
import './SavedNewsHeader.css';

const SavedNewsHeader = (props) => {
  console.log('SavedNewsHeader.props:', props);

  const keywords = props.articles.map(art => art.keyword).reduce((acc, key) => {
    acc[key] = acc[key] === undefined ? 1 : acc[key] += 1;
    return acc;
  }, {});

  const sortedKey = Object.keys(keywords).reverse()
    .map((key) => [key, keywords[key]])
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  const savedText = declOfNum(props.articles.length,
    ['сохранённая статья', 'сохранённые статьи', 'сохранённых статей']);

  function showKeywords() {
    let result = '';
    result = <>
      <span className='saved-news-header__text-span'>Природа, Тайга</span>&nbsp;и&nbsp;<span span className='saved-news-header__text-span' > 2 - м другим</span >
      </>
    return result;
  }

  return (
    <section className='saved-news-header'>
      <h2 className='saved-news-header__title'>Сохранённые статьи</h2>
      <p className='saved-news-header__subtitle'>{`${props.userName}, у Вас ${props.articles.length === 0 ? 'ещё нет' : props.articles.length} ${savedText}`}</p>
      <p className='saved-news-header__text'>По ключевым словам:&nbsp;{showKeywords()}</p>
    </section>
  );

};

export default SavedNewsHeader;