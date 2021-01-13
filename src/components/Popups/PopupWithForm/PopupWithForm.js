import React from 'react';
import Overlay from '../Overlay/Overlay';
import PopupForm from '../PopupForm/PopupForm';
import Modal from '../Modal/Modal';
import { CloseButton, Button } from '../../Buttons/index';

function PopupWithForm(name, title,
  children,
  isOpen,
  onClose,
  onSubmit,
  anyInputInvalid,
  authStatus,
  handleLinkClick,
  formButtonText,) {

  return (
    <Overlay isOpen={isOpen}>
      <Modal isOpen={isOpen}>
        <CloseButton title="Закрыть" onClick={onClose} />
        <PopupForm
          name={name}
          title={title}
          onSubmit={onSubmit}
        >
          {children}
          <div>
            <Button
              disabled={anyInputInvalid}
              type='submit'
              classNameBtn='popup'
              title={formButtonText} />
            {authStatus && (<p>Здесь будет ссылка перехода войти/регистрация</p>)}
          </div>
        </PopupForm>

      </Modal>
    </Overlay>

  );

}

export default PopupWithForm;