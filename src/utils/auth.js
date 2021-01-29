import { main_url } from './config';

const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || main_url}`;

const checkResponce = (res) => new Promise((resolve, reject) => {
  const func = res.status < 400 ? resolve : reject;
  res.json().then((data) => {
        func({ status: res.status, data });
  });
});

export const register = (email, password, name) => fetch(`${baseUrl}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password, name }),
})
  .then(checkResponce);


export const authorize = (email, password) => fetch(`${baseUrl}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(checkResponce);

export const getContent = (token) => fetch(`${baseUrl}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(checkResponce);
