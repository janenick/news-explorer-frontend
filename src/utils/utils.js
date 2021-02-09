import defaultImg from '../images/navigation-bg.jpg';

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5)
      ? number % 10
      : 5]];
}

function convertDate(date) {
  const newDate = new Date(date);
  const fullDate = `${newDate.toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
  })}, ${newDate.getFullYear()}`;
  return fullDate;
};

function convertArticle(article, keyword = '') {
  const { title, description, publishedAt, source, url, urlToImage } = article;
  const articleConverted = {
    _id: `${url}/${publishedAt}`,
    isSaved: false,
    keyword,
    title,
    text: description || '',
    date: convertDate(publishedAt) || '',
    source: source.name || '',
    link: url,
    image: urlToImage || defaultImg,
  };
  return articleConverted;
}

export function converter(array, keyword) {
  const newArray = array.map(article => convertArticle(article, keyword));
  return newArray;
}