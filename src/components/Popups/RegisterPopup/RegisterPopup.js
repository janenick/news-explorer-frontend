import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupLabel from '../PopupLabel/PopupLabel';
import validate from '../../../utils/validate';

function RegisterPopup({ handleRegister, isOpen, onClose, onChangeForm }) {

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
    handleRegister(values);
  };

  return (

    <PopupWithForm
      name='register'
      title="Регистрация"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChangeForm={onChangeForm}
      anyInputInvalid={true}
      formButtonText="Зарегистрироваться"
    >
      <PopupLabel
        label='E-mail'
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
      <PopupLabel
        label='Пароль'
        id='email' required
        error={!!errors.password}
        value={values.password}
        name="password"
        type="password"
        placeholder="Введите пароль"
        onChange={handleInputChange}
        noValidate
      >
      </PopupLabel>
    </PopupWithForm>

  );

}

export default RegisterPopup;