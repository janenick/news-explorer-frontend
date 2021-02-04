import { MAIN_URL } from './config';

const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || MAIN_URL}`;

const checkResponce = (res) => new Promise((resolve, reject) => {
  const func = res.status < 400 ? resolve : reject;
  res.json().then((data) => {
    func({ status: res.status, data });
  });
});


const getArticlesFromServer = () => fetch(`${baseUrl}/articles`, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  method: 'GET',
})
  .then(checkResponce);

const addNewArticle = ({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
}) => fetch(`${baseUrl}/articles`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  }),
})
  .then(checkResponce);

const removeArticle = (id) => fetch(`${baseUrl}/articles/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(checkResponce);

const register = (email, password, name) => fetch(`${baseUrl}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password, name }),
})
  .then(checkResponce);


const authorize = (email, password) => fetch(`${baseUrl}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(checkResponce);

const getContent = (token) => fetch(`${baseUrl}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(checkResponce);


export {
 // getUserInfo,
  getArticlesFromServer,
  addNewArticle,
  removeArticle,
  register,
  authorize,
  getContent,
}
