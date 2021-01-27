export const news_api_url = 'https://newsapi.org/v2/everything';
export const news_api_key = '918e8c3927a1487bb4a57725910cbd78';
export const pageSize = 4; // макс. допустимое кол-во статей
export const news_search_error = 'Не удалось получить доступ к серверу новостей. Попробуйте еще раз.';

// дата (запросы к newsapi за 7 дней от текущей даты)
const locales = 'sv'; // 2021-01-31
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const week = 7 * 24 * 60 * 60 * 1000; // 7 дней

export const data_to = new Intl.DateTimeFormat(locales, options)
  .format(Date.now());

export const data_from = new Intl.DateTimeFormat(locales, options)
  .format(Date.now() - week);


export const main_url = '//localhost:3000';
