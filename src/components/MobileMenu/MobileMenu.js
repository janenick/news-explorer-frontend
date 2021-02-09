import React from 'react';
import CurrentUserContext from '../../contexts/currentUserContext';
import Navigation from '../Navigation/Navigation';
import Button from '../Buttons/Button/Button';
import logoutImgMain from '../../images/icons/logout-main.svg';
import './MobileMenu.css';

const MobileMenu = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (

    <div className='mobile-menu mobile-menu_opened'>
      <div className='mobile-menu__container'>
        <Navigation loggedIn={props.loggedIn} main={props.main} isMenuMobile={true} />

        {props.loggedIn ? (
          <Button
            classNameBtn='mobile'
            className={`button_type_mobile`}
            image={true}
            title={currentUser.name || 'Пользователь'}
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
    </div>
  );

};

export default MobileMenu;