import React from 'react';
import './Button.css';

const Button = (props) => {

  return (

    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`button button_type_${props.classNameBtn}`}>
      <span className={`button__text button__text_type_${props.classNameBtn}`}>{props.title}</span>
      {props.image && <img className={`button__img button__img_type_${props.classNameBtn}`} src={props.src} alt={props.alt}/>}
      </button>

  );

};

export default Button;