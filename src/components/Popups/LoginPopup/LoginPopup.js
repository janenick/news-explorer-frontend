import React, { useEffect, useState }  from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupLabel from '../PopupLabel/PopupLabel';
import Overlay from '../Overlay/Overlay';
import Modal from '../Modal/Modal';
import { CloseButton } from '../../Buttons/index';
import validate from '../../../utils/validate';

import './LoginPopup.css'

function LoginPopup({ handleLogin, isOpen, onClose, handleLinkClick}) {

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [anyInputInvalid, setAnyInputInvalid] = useState(true);
  const [showError, setShowError] = useState({});

  const checkFormValidity = () => {
    const any = Object
      .values(errors)
      .some((i) => i !== false);
    setAnyInputInvalid(any);
  };

 useEffect(() => {
    setErrors(validate(values, errors));
  }, [values]);

  useEffect(() => {
    checkFormValidity();
  }, [errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };


  /* return (
    <Overlay isOpen={isOpen}>
      <Modal isOpen={isOpen}>
        <CloseButton title="Закрыть" onClick={onClose} />

        <PopupWithForm
          title="Вход"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleFormSubmit}
          anyInputInvalid={anyInputInvalid}
          authStatus={authStatus}
          handleLinkClick={handleLinkClick}
          formButtonText="Войти"
        >
          <PopupLabel
            labelName='E-mail'
            id='email' required
            error={!!errors.email}
            value={values.email}
            name="email"
            type="email"
            placeholder="Введите почту"
            onChange={handleInputChange}
            noValidate
            >
            </PopupLabel>
        </PopupWithForm>
      </Modal>
    </Overlay>
  );
  */
  /* return (

        <PopupWithForm
          title="Вход"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleFormSubmit}
      anyInputInvalid={anyInputInvalid}
      authStatus={true }
          handleLinkClick={handleLinkClick}
          formButtonText="Войти"
        />
  );
  */
  return (

    <Overlay isOpen={isOpen}>
      <Modal isOpen={isOpen}>
        <CloseButton title="Закрыть" onClick={onClose} />
      </Modal>
    </Overlay>
  );

}

export default LoginPopup;

