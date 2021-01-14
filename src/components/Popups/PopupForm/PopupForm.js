import React from 'react';
import './PopupForm.css';

function PopupForm({ name, title, onSubmit, children }) {

  return (
      <form name={`popup__form-${name}`} onSubmit={onSubmit} className='popup__form' noValidate>
        <h2 className='popup__title'>{title}</h2>
      {children}

      </form>
  );
}

export default PopupForm;