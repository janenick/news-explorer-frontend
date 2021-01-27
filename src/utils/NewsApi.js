import {
  news_api_url,
  news_api_key,
  data_from,
  data_to,
  pageSize,
  news_search_error,
} from './config';

export const searchArticles = (keyword) => {
  const url = news_api_url
    + '?q=' + keyword
    + '&apiKey=' + news_api_key
    + '&from=' + data_from
    + '&to=' + data_to
    + '&pageSize=' + pageSize
    + '&sortBy=publishedAt';

  return fetch(url, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return new Promise().reject(new Error(`${news_search_error} (Ошибка: ${res.status})`));
    });
};