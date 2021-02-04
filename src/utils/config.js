export const NEWS_API_URL = 'https://nomoreparties.co/news/v2/everything';
export const NEWS_API_KEY = '918e8c3927a1487bb4a57725910cbd78';
export const PAGESIZE = 100; // макс. допустимое кол-во статей

// дата (запросы к newsapi за 7 дней от текущей даты)
const locales = 'sv'; // 2021-01-31
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const week = 7 * 24 * 60 * 60 * 1000; // 7 дней

export const DATA_TO = new Intl.DateTimeFormat(locales, options)
  .format(Date.now());

export const DATA_FROM = new Intl.DateTimeFormat(locales, options)
  .format(Date.now() - week);


export const MAIN_URL = '//localhost:3000';
