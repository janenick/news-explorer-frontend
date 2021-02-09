import {
  NEWS_API_URL,
  NEWS_API_KEY,
  DATA_FROM,
  DATA_TO,
  PAGESIZE,
} from './config';


const checkResponce = (res) => new Promise((resolve, reject) => {
  const func = res.status < 400 ? resolve : reject;
  res.json().then(func);
});

export const searchArticles = (keyword) => {
  const url = NEWS_API_URL
    + '?q=' + keyword
    + '&apiKey=' + NEWS_API_KEY
    + '&from=' + DATA_FROM
    + '&to=' + DATA_TO
    + '&pageSize=' + PAGESIZE
    + '&sortBy=publishedAt';

  return fetch(url, {
    method: 'GET',
  })
    .then(checkResponce);
};