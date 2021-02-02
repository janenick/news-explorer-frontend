import {
  news_api_url,
  news_api_key,
  data_from,
  data_to,
  pageSize,
} from './config';


const checkResponce = (res) => new Promise((resolve, reject) => {
  const func = res.status < 400 ? resolve : reject;
  res.json().then(func);
});

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
    .then(checkResponce);
};