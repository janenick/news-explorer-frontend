import React from 'react';
import './PopupLabel.css';

function PopupLabel(props) {
  return (
    <label className='popup__label'>{props.label}
      <input name={props.name}
        value={props.value || ''}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className='popup__input'/>
      <span className='popup__input-error'></span>
    </label>
  );
}

export default PopupLabel;