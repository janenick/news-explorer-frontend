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
        className='popup__input'
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}/>
      <span className={!props.isValid ? 'popup__input-error' : ''}> {props.error || ''}</span>
    </label>
  );
}

export default PopupLabel;