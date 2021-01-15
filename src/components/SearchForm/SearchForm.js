import React from 'react';
import Button from '../Buttons/Button/Button';


import './SearchForm.css';

function SearchForm(props) {
  const [value, setValue] = React.useState('');

  function handleValueInputSearchChange(evt) {
    setValue(evt.target.value);

  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSearchArticles(value);
    setValue('');

  }

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <h1 className='search-form__title'>Что творится в мире?</h1>
        <p className='search-form__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <div className='search-form__input-container'>
          <input className='search-form__input' placeholder='Введите тему новости'
            required={true}
            value={value}
            onChange={handleValueInputSearchChange}
          >
          </input>
          <Button
            classNameBtn='search-form'
            className='button_type_search-form button_type_link'
            image={false}
            title='Искать'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}

export default SearchForm;