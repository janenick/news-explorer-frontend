import React from 'react';
import { declOfNum } from '../../utils/utils.js';
import './SavedNewsHeader.css';

const SavedNewsHeader = (props) => {
    const savedText = declOfNum(props.articles.length,
    ['сохранённая статья', 'сохранённые статьи', 'сохранённых статей']);

  function showKeywords() {
    let result = '';

    const keywords = props.articles.map(art => art.keyword).reduce((acc, key) => {
      acc[key] = acc[key] === undefined ? 1 : acc[key] += 1;
      return acc;
    }, {});

    const sortedKey = Object.keys(keywords).reverse()
      .map((key) => [key, keywords[key]])
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0]);

    if (sortedKey.length === 1) {
      result = <span className='saved-news-header__text-span'>{sortedKey[0]}</span>;
    } else if (sortedKey.length === 2) {
      result = <>
        <span className='saved-news-header__text-span'>{sortedKey[0]}</span>
        &nbsp;и&nbsp;
        <span className='saved-news-header__text-span'>{sortedKey[1]}</span>
      </>;
    } else if (sortedKey.length === 3) {
      result = <>
        <span className='saved-news-header__text-span'>{sortedKey[0]}</span>
        &nbsp;,&nbsp;
        <span className='saved-news-header__text-span'>{sortedKey[1]}</span>
        &nbsp;и&nbsp;
        <span className='saved-news-header__text-span'>{sortedKey[2]}</span>
      </>;
    } else {
      result = <>
        <span className='saved-news-header__text-span'>{sortedKey[0]}, {sortedKey[1]}</span>
        &nbsp;и&nbsp;
        <span span className='saved-news-header__text-span' > {sortedKey.length - 2}-м другим</span>
      </>;
    }
    return result;
  }

  return (
    <section className='saved-news-header'>
      <h2 className='saved-news-header__title'>Сохранённые статьи</h2>
      <p className='saved-news-header__subtitle'>{`${props.userName}, у Вас ${props.articles.length === 0 ? 'ещё нет' : props.articles.length} ${savedText}`}</p>
      {props.articles.length !== 0
        && <p className='saved-news-header__text'>
        По ключевым словам:&nbsp;{showKeywords()}
      </p>
      }
    </section>
  );

};

export default SavedNewsHeader;