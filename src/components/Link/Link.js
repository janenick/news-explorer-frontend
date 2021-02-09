import React from 'react';
import { NavLink } from 'react-router-dom';
import './Link.css';

function Link(props) {
  function linkFunction() {
    if (props.navLink) { // если навигация
      return (
        <NavLink
          title={props.title}
          className={`link ${props.className}`}
          to={props.to}
        >
          {props.value}
        </NavLink>
      );
    }
    if (props.linkImage) { // --> если ссылка с картинкой и просто ссылка
      return (
        <a
          title={props.title}
          className={`link ${props.classNameLink}`}
          href={props.href}
          target='_blank'
          rel='noopener noreferrer'

        >
          <img
            src={props.src}
            alt={props.alt}
            className={props.classNameImage}
          />
        </a>);
    } // <-- если ссылка с картинкой и просто ссылка
    return (
      <a
        title={props.title}
        className={`link ${props.className}`}
        href={props.href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {props.value}
      </a>);
  }

  return (
    <>
      {linkFunction()}
    </>
  );
}

export default Link;
