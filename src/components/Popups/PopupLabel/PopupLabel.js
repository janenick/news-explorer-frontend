import React from 'react';
import './PopupLabel.css';

function PopupLabel(props) {

  return (
    <label className='popup__label'>{props.labelName}
      <input id={props.id} required name={props.name} type={props.type} value={props.value|| ''} onChange={handleChange} placeholder={props.placeholder} className='popup__input' />
      <span id={`${props.id}-error`} className='popup__input-error'></span>
    </label>
  );

}

export default PopupLabel;