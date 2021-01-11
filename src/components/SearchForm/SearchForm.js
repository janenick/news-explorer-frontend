import React from 'react';
// import CurrentUserContext from '../contexts/currentUserContext';
import Button from '../Button/Button';


import './SearchForm.css';

function SearchForm(props) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <section className='search-form'>
      <h1 className='search-form__title'>Что творится в мире?</h1>
      <p className='search-form__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <Button
        classNameBtn='search-form'
        image={false}
        title='Искать'
        onClick={props.handleSearchArticles}
      />
    </section>
  );
}

export default SearchForm;