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

            <Button
            disabled={props.anyInputInvalid}
            type='submit'
            classNameBtn={props.anyInputInvalid ? 'disabled' : 'popup'}
            title={props.formButtonText} />

          <p className='popup__action-text'>или <span className='popup__link popup__action-text popup__action-span' onClick={props.onChangeForm}>{props.login ? 'Зарегистрироваться' : 'Войти'}</span></p>
        </PopupForm>
      </Modal>
    </Overlay>

  );

}

export default PopupWithForm;