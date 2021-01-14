import React from 'react';
import Overlay from '../Overlay/Overlay';
import PopupForm from '../PopupForm/PopupForm';
import Modal from '../Modal/Modal';
import { CloseButton, Button } from '../../Buttons/index';

import './PopupWithForm.css';

function PopupWithForm(props) {

  return (
    <Overlay isOpen={props.isOpen}>
      <Modal isOpen={props.isOpen}>
        <CloseButton title="Закрыть" onClick={props.onClose} />
        <PopupForm
          name={props.name}
          title={props.title}
          onSubmit={props.onSubmit}
        >
          {props.children}

          {props.register && <span className='popup__error'>Такой пользователь уже есть</span>}
            <Button
            disabled={props.anyInputInvalid}
            type='submit'
            classNameBtn={props.isDisabled ? 'disabled' : 'popup'}
            title={props.formButtonText} />

          <p className='popup__action-text'>или <span className='popup__link popup__action-text' onClick={props.onChangeForm}>{props.login ? 'Зарегистрироваться' : 'Войти'}</span></p>
        </PopupForm>
      </Modal>
    </Overlay>

  );

}

export default PopupWithForm;

// {props.register && <span className={`'popup__error' ${props.register ? 'popup__error_opened' : ''}`}>Такой пользователь уже есть</span>}
