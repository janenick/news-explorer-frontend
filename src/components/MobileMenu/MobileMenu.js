import React from 'react';

import Navigation from '../Navigation/Navigation';
import Button from '../Buttons/Button/Button';
import logoutImgMain from '../../images/icons/logout-main.svg';
import './MobileMenu.css';

const MobileMenu = (props) => {
  console.log('this is MobileMenu');
  return (

    <section className={`mobile-menu ${props.isOpen} 'mobile-menu_opened' : ''`}>
        <div className='mobile-menu__container'>
          <Navigation loggedIn={props.loggedIn} main={props.main} isMenuMobile={true}/>

        {props.loggedIn ? (
          <Button
            classNameBtn='mobile'
            className={`button_type_mobile`}
            image={true}
            title='Грета'
            src={logoutImgMain}
            alt='Выход'
            onClick={props.handleSignOut}
          />
        ) : (
            <Button
              classNameBtn='mobile'
              className='button_type_mobile'
              image={false}
              title='Авторизоваться'
              onClick={props.handleLogin}
            />
          )
          }
        </div>
      </section>


  );

};

export default MobileMenu;