import React from 'react';

import './ButtonMobileMenu.css';

const ButtonMobileMenu = (props) => {
  const classNameBtnContainer = props.main ? 'btn-mobile-menu__container' : 'btn-mobile-menu__container_saved-news';
  const classNameBtn = `btn-mobile-menu__button ${props.isOpen ? 'btn-mobile-menu__button_type_close' : props.main ? 'btn-mobile-menu__button_type_main' : 'btn-mobile-menu__button_type_saved-news'}`;

  return (
    <div className={classNameBtnContainer}>
    <button
      onClick={props.onClick}
      className={classNameBtn}>

      </button>
     </div>

  );

};

export default ButtonMobileMenu;