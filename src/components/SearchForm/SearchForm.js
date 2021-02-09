import React from 'react';
import Button from '../Buttons/Button/Button';


import './SearchForm.css';

function SearchForm(props) {
  const [values, setValues] = React.useState({
    keyword: '',
  });

  function handleValueInputSearchChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });

  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleSearchArticles(values);
  }

  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <h1 className='search-form__title'>Что творится в мире?</h1>
        <p className='search-form__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className='search-form__input-container' onSubmit={handleSubmit}>
          <input className='search-form__input' placeholder='Введите тему новости'
            type='text'
            name='keyword'
            required={true}
            value={values.keyword}
            onChange={handleValueInputSearchChange}
            autoComplete='off'
          >
          </input>
          <Button
            classNameBtn='search-form'
            className='button_type_search-form button_type_link'
            type='submit'
            image={false}
            title='Искать'

          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;